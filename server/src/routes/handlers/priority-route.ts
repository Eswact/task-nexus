import Route from "../route";
import priorityController from "../../controllers/priority-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const endpoints: Route[] = [
  { method: "get", path: "user-priorities", func: priorityController.getUserPriority, middleware: authMiddleware },
];

export default endpoints;