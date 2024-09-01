import React, { useRef, useState } from "react";

const ProfilePicture = ({ register }) => {
  const hiddenInputRef = useRef();

  const { ref: registerRef, ...rest } = register("profilePicture");

  const [preview, setPreview] = useState();

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];

    const urlImage = URL.createObjectURL(file);

    setPreview(urlImage);
  };

  const onUpload = () => {
    hiddenInputRef.current.click();
  };

  const uploadButtonLabel = preview ? "Change image" : "Upload image";

  return (
    <div>
      <label>Profile picture</label>

      <input
        type="file"
        name="profilePicture"
        {...rest}
        onChange={handleUploadedFile}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
      />

      <img src={preview} sx={{ width: 80, height: 80 }} />

      <button onClick={onUpload}>{uploadButtonLabel}</button>
    </div>
  );
};

export default ProfilePicture;
