"use client";

import { UploadButton } from "@uploadthing/react";

export default function UploaderButton({ onSuccess, onError }) {
  return (
    <UploadButton
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        onSuccess(res);
      }}
      onUploadError={(error) => {
        // Do something with the error.
        onError();
      }}
    />
  );
}
