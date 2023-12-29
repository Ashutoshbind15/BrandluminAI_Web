import { SmileOutlined } from "@ant-design/icons";
import React from "react";

const IconGenerator = ({ color, size }) => {
  return (
    <div>
      <SmileOutlined style={{ color: color, fontSize: size }} size={size} />
    </div>
  );
};

export default IconGenerator;
