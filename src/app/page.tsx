"use client";
import { useEffect, useState } from "react";

export default function Home() {
  //states
  const [isValid, setValid] = useState<boolean>(true);
  const [personName, setPersonName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // form submit functionality
  function handleFormSubmit(formData: FormData) {
    let personName = formData.get("name");
    if (personName == "") {
      setValid(false);
      return;
    }
    // form submit code
  }

  // toggle the password-field visibility
  function handleTogglePasswordVisibility() {
    setShowPassword((showPassword) => !showPassword);
  }

  // toggle the confirm-password-field visibility
  function handleToggleConfirmPasswordVisibility() {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  }

  //
  useEffect(() => {
    if (personName == "") {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [personName]);

  return (
    <div dir="rtl" className="">
      {/* dashboard picture */}
      <div className="flex justify-center py-10">
        <div className="relative">
          <img src="/imgs/Rectangle 1.svg" className="w-24" alt="account-pic" />
          <img
            src="/imgs/plus-circle.svg"
            className="absolute w-6 right-0 -bottom-1 "
            alt="account-add-pic"
          />
        </div>
      </div>
      {/* dashboard form */}
      <div className="flex justify-center">
        <form className="space-y-20" action={handleFormSubmit}>
          {/* inputs */}
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6">
            {/* name-field */}
            <div className="relative w-[17rem]">
              <label htmlFor="name" className="block mb-1 text-sm ">
                نام و نام خانوادگی (نام مستعار)
              </label>
              <input
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                name="name"
                type="text"
                id="name"
                className=" border border-gray-300  placeholder: text-xs rounded-md focus:ring-stone-600 focus:border-stone-600 block w-full  p-2.5"
                placeholder="نام و نام خانوادگی خود را وارد کنید"
              />
              <p
                className={` left-0 mt-1 text-[10px] text-stone-600 ${
                  isValid ? "hidden" : "absolute"
                } `}
              >
                وارد کردن این فیلد اجباری است
              </p>
            </div>
            {/* email-field */}
            <div className="w-[17rem]">
              <label htmlFor="email" className="block mb-1 text-sm ">
                آدرس ایمیل
              </label>
              <input
                type="email"
                id="email"
                className=" border border-gray-300  placeholder: text-xs rounded-md focus:ring-stone-600 focus:border-stone-600 block w-full  p-2.5"
                placeholder="آدرس ایمیل خود را وارد کنید"
              />
            </div>
            {/* date-field */}
            <div className="w-[17rem] ">
              <label htmlFor="date" className="block mb-1 text-sm ">
                تاریخ تولد
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 flex items-center pe-2.5 pointer-events-none">
                  <img
                    src="/imgs/Vector.svg"
                    className="w-[18px]"
                    alt="date-icon"
                  />
                </div>
                <input
                  id="date"
                  className=" border border-gray-300  placeholder: text-xs rounded-md focus:ring-stone-600 focus:border-stone-600 block w-full  p-2.5"
                  placeholder="تاریخ تولد خود را انتخاب کنید"
                />
              </div>
            </div>
            {/* password-field */}
            <div className="w-[17rem]">
              <label htmlFor="password" className="block mb-1 text-sm ">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 end-0 flex items-center pe-2.5 cursor-pointer">
                  {showPassword ? (
                    <img
                      onClick={handleTogglePasswordVisibility}
                      src="/imgs/eye.svg"
                      className="w-[22px]"
                      alt="eye-icon"
                    />
                  ) : (
                    <img
                      onClick={handleTogglePasswordVisibility}
                      src="/imgs/View_hide.svg"
                      className="w-[22px]"
                      alt="eye-icon"
                    />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className=" border border-gray-300  placeholder: text-xs rounded-md focus:ring-stone-600 focus:border-stone-600 block w-full  p-2.5"
                  placeholder="رمز عبور خود را وارد کنید"
                />
              </div>
            </div>
            {/* gender */}
            <div className="order-1 md:order-none">
              <p className="pb-1">جنسیت</p>
              <div className="flex justify-evenly md:ps-5 ">
                {/* male-btn */}
                <button
                  type="button"
                  className="inline-flex flex-col justify-center items-center bg-slate-200 hover:outline hover:outline-yellow-400 focus:ring focus:ring-yellow-400 rounded-2xl cursor-pointer  px-5 py-2"
                >
                  <img
                    src="/imgs/male.png"
                    alt="male-pic"
                    className="w-[40px]"
                  />
                  <p>مرد</p>
                </button>
                {/* female-btn */}
                <button
                  type="button"
                  className="inline-flex flex-col justify-center items-center bg-slate-200 hover:outline hover:outline-yellow-400 focus:ring focus:ring-yellow-400 rounded-2xl cursor-pointer  px-5 py-2"
                >
                  <img
                    src="/imgs/female.png"
                    alt="male-pic"
                    className="w-[40px]"
                  />
                  <p>مرد</p>
                </button>
              </div>
            </div>
            {/* confirm-password-field */}
            <div className="w-[17rem] space-y-4">
              {/* confirm-password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-1 text-sm "
                >
                  تایید رمز عبور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 flex items-center pe-2.5 cursor-pointer">
                    {showConfirmPassword ? (
                      <img
                        onClick={handleToggleConfirmPasswordVisibility}
                        src="/imgs/eye.svg"
                        className="w-[22px]"
                        alt="eye-icon"
                      />
                    ) : (
                      <img
                        onClick={handleToggleConfirmPasswordVisibility}
                        src="/imgs/View_hide.svg"
                        className="w-[22px]"
                        alt="eye-icon"
                      />
                    )}
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className=" border border-gray-300  placeholder: text-xs rounded-md focus:ring-stone-600 focus:border-stone-600 block w-full  p-2.5"
                    placeholder="رمز عبور خود را تایید کنید"
                  />
                </div>
              </div>
              {/* checkBox */}
              <div className="flex  items-center">
                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor="checkbox"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-yellow-400 checked:before:bg-gray-900 hover:before:opacity-1"
                    id="checkbox"
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <p className="text-[13px] ps-2 pt-1">
                  مایل به دریافت پیام های تبلیغاتی هستم.
                </p>
              </div>
            </div>
          </div>
          {/* form-btn */}
          <div className="flex pb-11 justify-center">
            <button
              className="border-none bg-cyan-600 hover:bg-cyan-700 transition-all focus:ring focus:ring-cyan-900 text-white px-28 py-2 rounded-md"
              type="submit"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
