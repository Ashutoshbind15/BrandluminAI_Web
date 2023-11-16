"use client";

import { useState } from "react";
import UploaderButton from "../../Components/UploaderButton";
import IndexForm from "../../UI/Forms/Index";

const VideoClientHelper = ({ children }) => {
  const [url, setUrl] = useState("");

  return (
    <div>
      <div className="p-24 border-b-2 border-black">
        <UploaderButton
          onSuccess={(res) => {
            console.log(res);
            setUrl(res[0].url);
          }}
        />
      </div>
      <div className="py-2 px-4 border-black border-y-2 shadow-lg flex items-center justify-between bg-black text-white">
        <div>{url?.length ? url : "The uploaded url will appear here"}</div>
        <div>Copy</div>
      </div>
      <div>{children}</div>

      <IndexForm />
    </div>
  );
};

export default VideoClientHelper;
