import React from "react";
import InfoCards from "./InfoCards";
import { GoogleCircleFilled } from "@ant-design/icons";

const Insights = () => {
  return (
    <div className="p-2 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="flex flex-col w-4/5">
          <div className="my-1 font-semibold">Title</div>
          <div className="font-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem fuga quidem incidunt, hic ipsum magnam! Nostrum
          </div>
        </div>
        <InfoCards
          className={
            "flex items-center border-1 border-black flex-1 justify-between"
          }
          color={"red"}
        >
          <GoogleCircleFilled style={{ color: "green" }} />
          <div className="text-green-800">45%</div>
        </InfoCards>
      </div>
    </div>
  );
};

export default Insights;
