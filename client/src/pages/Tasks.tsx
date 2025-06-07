import React from "react";
import { getToken } from "../services/authService";

const Tasks: React.FC = () => {
  console.log(getToken());
  return <h2>Tasks Page</h2>;
};

export default Tasks;
