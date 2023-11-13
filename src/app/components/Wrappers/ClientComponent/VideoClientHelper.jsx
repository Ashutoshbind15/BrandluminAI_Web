"use client";

import { useState } from "react";
import UploaderButton from "../../Components/UploaderButton";
import IndexForm from "../../UI/Forms/Index";

const VideoClientHelper = ({ children }) => {
  const [url, setUrl] = useState("");

  return (
    <div>
      <div className="py-2 px-4 border-black border-y-2 shadow-lg">{url}</div>
      <div>{children}</div>
      <UploaderButton
        onSuccess={(res) => {
          console.log(res);
          setUrl(res[0].url);
        }}
      />

      <IndexForm />
    </div>
  );
};

export default VideoClientHelper;
