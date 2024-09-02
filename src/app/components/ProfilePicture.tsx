/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface Props {
  register: any;
}

const ProfilePicture = ({ register }: Props) => {
  //states
  const [profileSrc, setProfileSrc] = useState<string>("/imgs/Rectangle 1.svg");

  // upload-file functonality
  function handleUploadFile(file: any) {
    const urlImage = URL.createObjectURL(file);

    setProfileSrc(urlImage);
  }

  return (
    <div className="flex justify-center py-10">
      <div className="relative">
        <img src={profileSrc} className="w-24 rounded-2xl" alt="account-pic" />
        <label htmlFor="file-btn">
          <img
            className="absolute w-6 right-0 -bottom-1 hover:outline hover:outline-yellow-400 focus:ring focus:ring-yellow-400 rounded-[200px] transition-all cursor-pointer"
            src="/imgs/plus-circle.svg"
            alt="account-add-pic"
          />
          <input
            accept="image/*"
            type="file"
            id="file-btn"
            hidden
            {...register("profileImg", {
              onChange(event: any) {
                handleUploadFile(event.target.files[0]);
              },
            })}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfilePicture;
