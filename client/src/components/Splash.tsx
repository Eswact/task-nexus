import React from "react";

const Splash: React.FC = () => {
  return (
    <div id="splashScreen" className="hidden z-50 fixed top-0 left-0 w-full h-full items-center justify-center bg-black/65">
      <img className="w-[150px] scale-150 aspect-square object-contain" src="/images/splash.gif" alt="Splash" />
    </div>
  );
};

export default Splash;