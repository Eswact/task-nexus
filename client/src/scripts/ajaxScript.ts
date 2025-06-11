import { fetchData, postData } from '../services/ajaxService';

const AjaxScripts = {
  GetUsers: function ({ onSuccess, onError }: { onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    fetchData("user/published", onSuccess, onError);
  },
  Register: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    postData("user/register", data, onSuccess, onError);
  },
  Login: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    postData("user/login", data, onSuccess, onError);
  },
  VerifyEmail: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    postData("user/verify-email", data, onSuccess, onError);
  },
  VerifyToken: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    postData("user/verify-user", data, onSuccess, onError);
  },
  Logout: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    postData(`user/logout`, data, onSuccess, onError);
  },
  GetUserTasks: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    postData(`task/user-tasks`, data, onSuccess, onError);
  },
  GetUserStatuses: function ({ onSuccess, onError }: { onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    fetchData(`status/user-statuses`, onSuccess, onError);
  },
  GetUserPriorities: function ({ onSuccess, onError }: { onSuccess: (res: any) => any, onError: (err: any) => any }) :void {
    fetchData(`priority/user-priorities`, onSuccess, onError);
  },
};

export default AjaxScripts;