import AjaxScripts from "../scripts/ajaxScript";
import { NavigateFunction } from "react-router-dom";

const isAuthenticated = async (): Promise<boolean> => {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        return new Promise((resolve) => {
            let data = null;
            let onSuccess = function() {
                resolve(true);
            };
            let onError = function() {
                resolve(false);
            };
            AjaxScripts.VerifyToken({ data, onSuccess, onError });
        });
    } else {
        return false;
    }
};

const getToken = (): string | null => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const logout = (navigate: NavigateFunction): void => {
    let data = null;
    let onSuccess = function() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
    };
    let onError = function(err: any) {
        console.warn(err.message || err);
        // show error toast?
    };
    AjaxScripts.Logout({ data, onSuccess, onError });
};

export { isAuthenticated, getToken, logout };