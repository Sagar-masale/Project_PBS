import React, { useEffect, useState } from "react";
import "./IntroAnimation.css";

const IntroAnimation = () => {
  const [exit, setExit] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setExit(true), 3000); // trigger exit
    const timer2 = setTimeout(() => setHide(true), 4000); // remove after exit
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (hide) return null;

  return (
    <div className={`intro-container ${exit ? "exit" : ""}`}>
      <div className="hands-wrapper flex justify-center items-center">
        <img
            src="/StartingAnimation/leftHand.png"
            alt="Left Hand"
            className="hand w-[180px] sm:w-32 md:w-48 lg:w-60 left"
        />
        <img
            src="/StartingAnimation/rightHand.png"
            alt="Right Hand"
            className="hand w-[180px] sm:w-32 md:w-48 lg:w-60 right"
        />
        </div>

      <p className="welcome-text text-3xl sm:text-3xl md:text-4xl lg:text-5xl  text-center text-[#4F3267]">
        Welcome to PBS Jewellers
        </p>

    </div>
  );
};

export default IntroAnimation;
