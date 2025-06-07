import express, { Router, RequestHandler } from "express";
import userRoutes from "./handlers/user-route";
import taskRoutes from './handlers/task-route';

const router: Router = express.Router();

const allRoutes = [
  { prefix: "/user", routes: userRoutes },
  { prefix: "/task", routes: taskRoutes },
];

const chooseMethod = (router: Router, method: string, path: string, func: RequestHandler, middleware?: RequestHandler): void => {
  switch (method) {
    case "get": middleware ? router.get(path, middleware, func) : router.get(path, func);
      break;
    case "post": middleware ? router.post(path, middleware, func) : router.post(path, func);
      break;
    case "put": middleware ? router.put(path, middleware, func) : router.put(path, func);
      break;
    case "delete": middleware ? router.delete(path, middleware, func) : router.delete(path, func);
      break;
    default:
      throw new Error("Invalid method");
  }
};

allRoutes.forEach(({ prefix, routes }) => {
  routes.forEach(({ method, path, func, middleware = null }) => {
    chooseMethod(router, method, `${prefix}/${path}`, func, middleware || undefined);
  });
});

export default router;