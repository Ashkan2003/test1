/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfilePicture from "./components/ProfilePicture";
import FormSubmitBtn from "./components/FormSubmitBtn";
import GenderOptions from "./components/GenderOptions";
import { FormValuesType } from "@/types/formTypes";

const FORM_DATA_POST_URL = "";
const PROFILE_IMG_FILE_POST_URL = "";
const DEBOUNCING_DELAY = 1500;
// zod validation
const schema = z
  .object({
    fullName: z
      .string({ required_error: "وارد کردن این فیلد اجباری است" })
      .min(3, { message: "حداقل سه کاراکتر برای فیلد نام لازم است" }),
    email: z.string().email({ message: "فرمت ایمیل باید درست باشد." }),
    date: z
      .string()
      .regex(/^(\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01]))/, {
        message: "فرمت تاریخ تولد صحیح نمیباشد",
      }),
    password: z
      .string()
      .min(8, { message: "حداقل رمز عبور باید 8 کاراکتر باشد." }),
    confirmPassword: z
      .string()
      .min(8, { message: "حداقل رمز عبور باید 8 کاراکتر باشد." }),
    receiveMessageCheckBox: z.boolean(),
    gender: z.enum(["male", "female"]),
    profileImg: z.any(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "این فیلد با فیلد پسورد همخوانی ندارد.",
    path: ["confirmPassword"],
  });

export default function Home() {
  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    mode: "onChange",
    delayError: DEBOUNCING_DELAY,
    defaultValues: {
      receiveMessageCheckBox: false,
      gender: "male",
    },
    resolver: zodResolver(schema),
  });

  // form submit functionality
  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    // get user-profileImg-file
    const userProfileFile = data.profileImg[0];

    // remove user-profileImg-file
    delete data.profileImg;

    console.log(userProfileFile, "userProfileImg");
    console.log(JSON.stringify(data), "form-data");

    //post form-data
    await fetch(FORM_DATA_POST_URL, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          console.log(data);
        }
      });
    //post profile-img-file
    await fetch(PROFILE_IMG_FILE_POST_URL, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          console.log(data);
        }
      });
  };

  // toggle the password-field visibility
  function handleTogglePasswordVisibility() {
    setShowPassword((showPassword) => !showPassword);
  }

  // toggle the confirm-password-field visibility
  function handleToggleConfirmPasswordVisibility() {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  }

  return (
    <div dir="rtl" className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* dashboard picture */}
        <ProfilePicture register={register} />
        {/* dashboard inputs */}
        <div className="flex justify-center">
          <div className="space-y-20">
            {/* inputs */}
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6">
              {/* name-field */}
              <div className="relative w-[17rem]">
                <label htmlFor="name" className="block mb-1 text-sm ">
                  نام و نام خانوادگی (نام مستعار)
                </label>
                <input
                  type="text"
                  className=" border border-gray-300  placeholder: text-xs rounded-md focus:ring-stone-600 focus:border-stone-600 block w-full  p-2.5"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  {...register("fullName")}
                />
                {errors.fullName?.message && (
                  <p className=" left-0 mt-1 text-[10px] text-stone-600">
                    {errors.fullName.message}
                  </p>
                )}
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
                  {...register("email")}
                />
                {errors.email?.message && (
                  <p className=" left-0 mt-1 text-[10px] text-stone-600">
                    {errors.email.message}
                  </p>
                )}
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
                    {...register("date")}
                  />
                </div>
                {errors.date?.message && (
                  <p className=" left-0 mt-1 text-[10px] text-stone-600">
                    {errors.date.message}
                  </p>
                )}
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
                    {...register("password")}
                  />
                </div>
                {errors.password?.message && (
                  <p className=" left-0 mt-1 text-[10px] text-stone-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* gender */}
              <div className="order-1 md:order-none">
                <p className="pb-1">جنسیت</p>
                <div className="flex justify-evenly md:ps-5 ">
                  <GenderOptions register={register} />
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
                      {...register("confirmPassword")}
                    />
                  </div>
                  {errors.confirmPassword?.message && (
                    <p className=" left-0 mt-1 text-[10px] text-stone-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                {/* checkBox */}
                <div className="flex  items-center">
                  <label
                    className="relative flex items-center rounded-full cursor-pointer"
                    htmlFor="checkBox"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-yellow-400 checked:before:bg-gray-900 hover:before:opacity-1"
                      id="checkBox"
                      {...register("receiveMessageCheckBox")}
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
              <FormSubmitBtn />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
