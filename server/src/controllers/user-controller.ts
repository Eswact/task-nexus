import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models";
import IUser from "../models/user/interface";
import { sendVerificationMail } from "../services/mail-service";

const User = db.users;

const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const usersData: IUser[] = await User.find();
    res.json(usersData);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    const isConfirmed = user.mailConfirmed;
    if (!isConfirmed) {
      res.status(400).json({ message: "Mail not confirmed" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" });
    
    if (req.session) {
      req.session.user = token;
    } else {
      res.status(500).json({ message: "Session not initialized." });
      return;
    }

    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  req.session = null;
  res.clearCookie('session');
  res.send('Logged out successfully');
}

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role, mail } = req.body;
  const usersData: IUser[] = await User.find();
  const mailOrUsernameExists = usersData.find(x => x.mail === mail || x.username === username);
  if (mailOrUsernameExists) {
    res.status(400).json({ message: "Username or mail already exists" });
    return;
  }
  try {
    const mailConfirmed: boolean = false;
    const newUser = new User({ username, password, role, mail, mailConfirmed });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY!);
    const verificationUrl = `${process.env.CONFIRM_URL}?verify=${token}`;
    await sendVerificationMail(newUser, verificationUrl);

    res.status(201).json({ message: "User created successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const token = req.body.token as string;

  if (!token) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    user.mailConfirmed = true;
    await user.save();

    res.status(200).json({ message: "Email successfully verified" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

const verifyToken = async (req: Request, res: Response): Promise<void> => {
  //auth middleware
  res.json({ valid: true });
}

export = {
  findAll,
  login,
  logout,
  register,
  verifyEmail,
  verifyToken
};