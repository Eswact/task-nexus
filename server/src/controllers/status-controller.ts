import { Request, Response } from "express";
import db from "../models";
import IStatus from "../models/status/interface";

const Status = db.status;

const getUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const statusData: IStatus[] = await Status.find({ user: req.user });
    res.json(statusData);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving statuses." });
  }
};

export = {
  getUserStatus,
};