import Route from "../route";
import taskController from "../../controllers/task-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const endpoints: Route[] = [
  { method: "get", path: "my-tasks", func: taskController.getMyTasks, middleware: authMiddleware },
  { method: "post", path: "create-task", func: taskController.createTask, middleware: authMiddleware },
  { method: "post", path: "delete-task/:id", func: taskController.deleteTask, middleware: authMiddleware },
];

export default endpoints;