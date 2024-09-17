import { useEffect, useState } from "react";
import welcomeBackground from "../assets/welcomeBackground.jpg";
import welcomeCenter from "../assets/welcomeCenter.jpg";

import "../App.css";

import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      <div
        className="flex flex-col justify-center relative bg-top bg-[length:1200px_]  overflow-hidden  bg-no-repeat"
        style={{
          backgroundImage: `url(${welcomeBackground})`,
          height: "400px",
        }}
      >
        <div className="flex mt-40 flex-col gap-5">
          <h1 className="ml-10 text-6xl mt-5 font-bold text-primarycolor">
            Believe yourself
          </h1>
          <div className="flex items-center">
            <span className="w-7 h-0 border border-gray"></span>
            <p className="ml-3 font-bold text-white">Train like a pro</p>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-end pb-10 bg-[length:580px_]  h-[380px] bg-no-repeat bg-[-8rem]  "
        style={{ backgroundImage: `url(${welcomeCenter})` }}
      >
        <Link to="/Home">
          <button className="items-center justify-center h-12 font-bold bg-primarycolor w-44 rounded-3xl">
            Start Training
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Welcome;
