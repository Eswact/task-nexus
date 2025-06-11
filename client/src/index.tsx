import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faArrowRightFromBracket, faGear, faBars, faHouse, faCalendarCheck, faSun, faMoon, faEllipsis, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
library.add(faEye, faEyeSlash, faArrowRightFromBracket, faGear, faBars, faHouse, faCalendarCheck, faSun, faMoon, faEllipsis, faMagnifyingGlass);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode> 
);

reportWebVitals();
