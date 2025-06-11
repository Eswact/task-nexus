import { toast, Bounce } from 'react-toastify';

function showError(msg?: string) :void {
    toast.error(msg || 'An error occurred', {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Bounce,
    });
}
function showSuccess(msg?: string) :void {
    toast.success(msg || 'Successful', {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Bounce,
    });
}

const openNavbar = () :void => {
    document.getElementById('asideBar')?.classList.add('show');
};
const closeNavbar = () :void => { 
    document.getElementById('asideBar')?.classList.remove('show');
};

const showSplash = () :void => {
    document.getElementById('splashScreen')?.classList.remove('hidden');
    document.getElementById('splashScreen')?.classList.add('flex');
};
const hideSplash = () :void => { 
    document.getElementById('splashScreen')?.classList.remove('flex');
    document.getElementById('splashScreen')?.classList.add('hidden');
};

const formatDateOnly = (isoString: string) :string => {
  return new Date(isoString).toISOString().split("T")[0];
}


export {showError, showSuccess, openNavbar, closeNavbar, showSplash, hideSplash, formatDateOnly};