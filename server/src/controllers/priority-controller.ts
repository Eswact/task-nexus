import { Request, Response } from "express";
import db from "../models";
import IPriority from "../models/priority/interface";

const Priority = db.priority;

const getUserPriority = async (req: Request, res: Response): Promise<void> => {
  try {
    const priorityData: IPriority[] = await Priority.find({ user: req.user });
    res.json(priorityData);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving priorities." });
  }
};

export = {
  getUserPriority,
};