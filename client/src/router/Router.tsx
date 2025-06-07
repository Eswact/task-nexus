import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/tasks",
    element: <ProtectedRoute element={<Tasks />} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const validPaths = routes.map(route => route.path);
export default routes;
