import { fetchData, postData } from '../services/ajaxService';

const AjaxScripts = {
  GetUsers: function ({ onSuccess, onError }: { onSuccess: (res: any) => any, onError: (err: any) => any }) {
    fetchData("user/published", onSuccess, onError);
  },
  Register: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) {
    postData("user/register", data, onSuccess, onError);
  },
  Login: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) {
    postData("user/login", data, onSuccess, onError);
  },
  VerifyEmail: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) {
    postData("user/verify-email", data, onSuccess, onError);
  },
  VerifyToken: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) {
    postData("user/verify-user", data, onSuccess, onError);
  },
  Logout: function ({ data, onSuccess, onError }: { data: any, onSuccess: (res: any) => any, onError: (err: any) => any }) {
    postData(`user/logout`, data, onSuccess, onError);
  },
};

export default AjaxScripts;