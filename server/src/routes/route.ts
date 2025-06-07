import { RequestHandler } from "express";

interface Route {
  method: string;
  path: string;
  func: RequestHandler;
  middleware?: RequestHandler | null
}

export default Route;