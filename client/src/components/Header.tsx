import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showNavbar } from "../scripts/common";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const exit = () => {
    logout(navigate);
  };

  const handleDarkModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  useEffect(() => {
    const darkModeEnabled = document.body.classList.contains('dark');
    (document.querySelector('.theme-controller') as HTMLInputElement).checked = darkModeEnabled;
  }, []);

  return (
    <header className="w-[calc(100%-80px)] md:w-full fixed top-0 left-[80px] md:left-0 h-[68px] bg-bg dark:bg-dark justify-center items-center px-[50px] pt-[10px] md:px-[16px]">
      <nav className="w-full h-full px-[40px] md:px-[20px] py-[4px] flex items-center justify-between border-[1px] border-main/20 bg-main/10 rounded-md dark:border-main/60 dark:bg-fourth/60">
        <div className="flex items-center">
          <button onClick={showNavbar} className="hidden md:block text-main hover:text-second dark:text-white dark:hover:text-second text-xl px-[4px]"><FontAwesomeIcon icon={["fas", "bars"]}/></button>
        </div>
        <div className="flex gap-6 md:gap-[20px] items-center justify-end">
          {/* darkmode toggle */}
          <label className="swap swap-rotate cursor-pointer px-[2px]">
            <input type="checkbox" onChange={handleDarkModeToggle} className="theme-controller" />
            <FontAwesomeIcon className="swap-off text-xl px-[4px] text-main hover:text-second dark:text-white dark:hover:text-second" icon={["fas", "moon"]}/>
            <FontAwesomeIcon className="swap-on text-xl px-[4px] text-main hover:text-second dark:text-white dark:hover:text-second" icon={["fas", "sun"]} />
          </label>
          {/* settings button */}
          <button className="text-main hover:text-second dark:text-white dark:hover:text-second text-xl px-[4px]"><FontAwesomeIcon icon={["fas", "gear"]}/></button>
          {/* logout button */}
          <button onClick={exit} className="text-main hover:text-second dark:text-white dark:hover:text-second text-xl px-[4px]"><FontAwesomeIcon icon={["fas", "arrow-right-from-bracket"]}/></button>
        </div>
      </nav>
    </header>
  );
};
                                                                                            
export default Header;
