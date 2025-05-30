import React from "react";
import { assets } from "../assets/assets";
import "tailwindcss";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer caret-transparent"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer caret-transparent"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15-px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Khám phá Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Tải xuống App
          </p>
          <p className="bg-purple-500 text-black w-7 rounded-full flex items-center justify-center cursor-pointer">
            D
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer caret-transparent">
          Tất cả
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer caret-transparent" >Âm nhạc</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer caret-transparent" >
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
