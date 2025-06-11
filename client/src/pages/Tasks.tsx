import React, { useEffect, useState } from "react";
import AjaxScripts from "../scripts/ajaxScript";
import { showError, showSplash, hideSplash, formatDateOnly } from "../scripts/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [statuses, setStatuses] = useState<any[]>([]);
  const [priorities, setPriorities] = useState<any[]>([]);

  const getUserTasks = (): void => {
    showSplash();
    AjaxScripts.GetUserTasks({
      data: {
        page: 1,
        pageSize: 10,
      },
      onSuccess: (res: any): void => {
        hideSplash();
        setTasks(res);
      },
      onError: (err: any): void => {
        showError(err.response?.data.message || err.message);
        hideSplash();
      },
    });
  };

  const getUserStatuses = (): void => {
    AjaxScripts.GetUserStatuses({
      onSuccess: (res: any): void => {
        console.log(res);
        setStatuses(res[0].list);
      },
      onError: (err: any): void => {
        showError(err.response?.data.message || err.message);
      },
    });
  };
  const getUserPriorities = (): void => {
    AjaxScripts.GetUserPriorities({
      onSuccess: (res: any): void => {
        console.log(res);
        setPriorities(res[0].list);
      },
      onError: (err: any): void => {
        showError(err.response?.data.message || err.message);
      },
    });
  };

  useEffect(() => {
    getUserTasks();
    getUserStatuses();
    getUserPriorities();
  }, []);

  return (
    <div className="w-full flex flex-col px-6">
      <div className="w-full flex flex-col gap-2">
        <ul className="w-full flex flex-col gap-2">
          <li className="w-full flex justify-between items-center px-4 py-2 bg-fourth text-bg text-sm border border-fourth rounded-md mb-1">
              <div className="w-[calc(100%-60px)] flex gap-8">
                <span className="font-bold w-12">No</span>
                <span className="font-bold w-20">Status</span>
                <span className="font-bold w-[calc(100%-20rem)] ">Title</span>
                <span className="font-bold w-20">Priority</span>
                <span className="font-bold w-28">Created Date</span>
              </div>
          </li>
          {tasks.map((item, index) => (
            <li key={index} className="w-full flex justify-between items-center px-4 py-2 border border-fourth rounded-md">
              <div className="w-[calc(100%-60px)] flex gap-8">
                <span className="text-fourth font-semibold w-12">#{index}</span>
                <span className="text-third font-semibold w-20">{statuses.find((status: any) => status.value === item.status)?.name}</span>
                <span className="w-[calc(100%-20rem)] ">{item.title}</span>
                <span className="w-20">{priorities.find((priority: any) => priority.value === item.priority)?.name}</span>
                <span className="w-28">{formatDateOnly(item.createdAt)}</span>
              </div> 
              <button className="text-2xl text-main"><FontAwesomeIcon icon={["fas", "ellipsis"]} /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
