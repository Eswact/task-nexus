import React from "react";
import { Link, useLocation, Location } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeNavbar } from "../scripts/common";

const Navbar: React.FC = () => {
  const location: Location = useLocation();
  return (
    <aside id="asideBar" className="z-20 fixed flex flex-col gap-[28px] overflow-hidden left-0 top-0 h-full py-[34px] w-[80px] md:w-0 hover:w-[248px] md:hover:w-0 transition-all bg-main shadow-[0_2px_3px_3px] shadow-main/20  md:shadow-none dark:bg-fourth">
      {/* logo */}
      <div className="flex items-center gap-[12px] p-[18px]">
        <img className="rounded-lg bg-white h-[44px] w-[44px]" src="/logo.png" alt="logo" />
        <h1 className="text-2xl font-bold p-[6px] text-white">TaskNexus</h1>
      </div>
      {/* navigation links */}
      <ul className="flex flex-col items-start justify-start gap-[2px] py-[20px] font-semibold">
        <li className="flex justify-start items-center w-full">
          <Link title="Home" className={`w-full h-full flex items-center gap-[20px] px-[18px] py-[12px] cursor-pointer text-white transition-all hover:bg-second/80 dark:hover:bg-second/60`} to="/" onClick={closeNavbar}>
            <span className={`p-[8px] w-[42px] aspect-square flex justify-center items-center ${location.pathname === "/" ? "bg-second rounded-lg" : ""}`}>
              <FontAwesomeIcon className="min-w-[26px] flex justify-center items-center text-xl" icon={["fas", "home"]}/>
            </span>
            <span className="text-lg threeDots max-w-full">Home</span>
          </Link>
        </li>
        <li className="flex justify-start items-center w-full">
          <Link title="Tasks" className={`w-full h-full flex items-center gap-[20px] px-[18px] py-[12px] cursor-pointer text-white transition-all hover:bg-second/80 dark:hover:bg-second/60`} to="/tasks" onClick={closeNavbar}>
            <span className={`p-[8px] w-[42px] aspect-square flex justify-center items-center ${location.pathname === "/tasks" ? "bg-second rounded-lg" : ""}`}>
              <FontAwesomeIcon className="min-w-[26px] flex justify-center items-center text-xl" icon={["fas", "calendar-check"]}/>
            </span>
            <span className="text-lg threeDots max-w-full">Tasks</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
                                                                                            
export default Navbar;