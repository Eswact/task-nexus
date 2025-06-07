import React from "react";
import { BrowserRouter as Router, useRoutes, useLocation } from "react-router-dom";
import routes, { validPaths } from "./router/Router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isNotFoundPage = !validPaths.includes(location.pathname);

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  const routing = useRoutes(routes);

  return (
    <div className="w-full border-box flex flex-col gap-[20px] dark:text-white">
      {!isLoginPage && !isNotFoundPage && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <main className={`${!isLoginPage && !isNotFoundPage ? 'w-[calc(100%-80px)] py-[16px] px-[50px] mt-[80px] ml-[80px] md:w-full md:ml-0 md:px-[16px] md:py-[8px]' : ''}`}>
        {routing}
      </main>
    </div>
  );
};

export default AppWrapper;
