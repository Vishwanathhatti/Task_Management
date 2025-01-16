import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controller/task.controller.js";

const taskRouter = express.Router();

taskRouter.route('/').post(verifyToken,createTask)
taskRouter.route('/').get(verifyToken,getAllTasks)
taskRouter.route('/:id').get(verifyToken,getTaskById)
taskRouter.route('/:id').put(verifyToken,updateTask)
taskRouter.route('/:id').delete(verifyToken,deleteTask)

export default taskRouter;