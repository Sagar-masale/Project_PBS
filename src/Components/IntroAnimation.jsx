import React, { useEffect, useState } from "react";
import "./IntroAnimation.css";

const IntroAnimation = () => {
  const [exit, setExit] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const lastShown = localStorage.getItem("introShownAt");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > 5 * 60 * 1000) {
      // Show animation
      setHide(false);

      const timer1 = setTimeout(() => setExit(true), 3000); // start exit after 3s
      const timer2 = setTimeout(() => {
        setHide(true); // hide animation
        localStorage.setItem("introShownAt", Date.now().toString());
      }, 4000); // fully hide after 4s

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
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
