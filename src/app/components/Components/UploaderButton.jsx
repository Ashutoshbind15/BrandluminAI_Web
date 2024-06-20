"use client";

import { UploadButton } from "@uploadthing/react";

export default function UploaderButton({
  onSuccess,
  onError,
  className,
  endpoint = "videoUploader",
}) {
  return (
    <UploadButton
      className={className}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        onSuccess(res);
      }}
      onUploadError={(error) => {
        // Do something with the error.
        console.log(error);
      }}
    />
  );
}
