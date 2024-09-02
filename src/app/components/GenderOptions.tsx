/* eslint-disable @next/next/no-img-element */
import React from "react";

interface Props {
  register: any;
}

const GenderOptions = ({ register }: Props) => {
  return (
    <>
      {/* male-btn */}
      <button
        type="button"
        className="inline-flex flex-col justify-center items-center bg-slate-200 hover:outline hover:outline-yellow-400 focus:ring focus:ring-yellow-400 rounded-2xl cursor-pointer"
      >
        <label htmlFor="gender-option-male" className="px-5 py-2">
          <input
            value="male"
            type="radio"
            id="gender-option-male"
            hidden
            {...register("gender")}
          />
          <img src="/imgs/male.png" alt="male-pic" className="w-[40px]" />
          <p>مرد</p>
        </label>
      </button>
      {/* female-btn */}
      <button
        type="button"
        className="inline-flex flex-col justify-center items-center bg-slate-200 hover:outline hover:outline-yellow-400 focus:ring focus:ring-yellow-400 rounded-2xl cursor-pointer  "
      >
        <label htmlFor="gender-option-female" className="px-5 py-2">
          <input
            value="female"
            type="radio"
            id="gender-option-female"
            hidden
            {...register("gender")}
          />
          <img src="/imgs/female.png" alt="male-pic" className="w-[40px]" />
          <p>زن</p>
        </label>
      </button>
    </>
  );
};

export default GenderOptions;
