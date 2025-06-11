import Route from "../route";
import statusController from "../../controllers/status-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const endpoints: Route[] = [
  { method: "get", path: "user-statuses", func: statusController.getUserStatus, middleware: authMiddleware },
];

export default endpoints;