"use client";

import { UploadButton } from "@uploadthing/react";

export default function UploaderButton() {
  return (
    <UploadButton
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
