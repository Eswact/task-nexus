import { Request, Response } from "express";
import db from "../models";
import ITask from "../models/task/interface";

const Tasks = db.tasks;

const getMyTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasksData: ITask[] = await Tasks.find({ assignedId: req.user });
    res.json(tasksData);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while retrieving tasks." });
  }
};

const createTask = async (req: Request, res: Response): Promise<void> => {
  const task: ITask = {
    createrId: req.user || "",
    assignedId: req.user || "",
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    notes: req.body.notes || [],
    checklist: req.body.checklist || [],
    priority: req.body.priority,
  };

  try {
    const createdTask = await Tasks.create(task);
    res.status(201).json(createdTask);
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while creating the task." });
  }
};


const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const taskId = req.params.id;
  
  try {
    const deletedTask = await Tasks.findByIdAndDelete(taskId);
    if (!deletedTask) {
      res.status(404).send({ message: "Task not found." });
      return;
    }
    if (deletedTask.createrId !== req.user) {
      res.status(403).send({ message: "You are not authorized to delete this task." });
      return;
    }
    res.json({ message: "Task deleted successfully." });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Some error occurred while deleting the task." });
  }
};

// const updateTask = async (req: Request, res: Response): Promise<void> => {
//   const taskId = req.params.id;
//   const updates = req.body;

//   try {
//     const updatedTask = await Tasks.findByIdAndUpdate(taskId, updates, { new: true });
//     if (!updatedTask) {
//       return res.status(404).send({ message: "Task not found." });
//     }
//     res.json(updatedTask);
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Some error occurred while updating the task." });
//   }
// };

export = {
  getMyTasks,
  createTask,
  deleteTask
};