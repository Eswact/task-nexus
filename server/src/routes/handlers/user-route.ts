import Route from "../route";
import userController from "../../controllers/user-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const endpoints: Route[] = [
  { method: "get", path: "published", func: userController.findAll, middleware: null },
  { method: "post", path: "login", func: userController.login, middleware: null },
  { method: "post", path: "logout", func: userController.logout, middleware: null },
  { method: "post", path: "register", func: userController.register, middleware: null },
  { method: "post", path: "verify-email", func: userController.verifyEmail, middleware: null },
  { method: "post", path: "verify-user", func: userController.verifyToken, middleware: authMiddleware }
];

export default endpoints;