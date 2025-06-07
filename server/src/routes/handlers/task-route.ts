import Route from "../route";
import taskController from "../../controllers/task-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const endpoints: Route[] = [
  { method: "get", path: "published", func: taskController.findAll, middleware: null },
];

export default endpoints;