import { Request, Response } from "express";
import db from "../models";
import ITask from "../models/task/interface";

const Tasks = db.tasks;

const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasksData: ITask[] = await Tasks.find();
    res.json(tasksData);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving tasks." });
  }
};

export = {
  findAll,
};