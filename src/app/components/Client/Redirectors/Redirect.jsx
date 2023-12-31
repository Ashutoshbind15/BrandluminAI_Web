"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";

const Redirect = ({ url, size, children }) => {
  const rtr = useRouter();

  return (
    <PrimaryButton size={size} onClick={() => rtr.push(url)}>
      {children}
    </PrimaryButton>
  );
};

export default Redirect;
