"use client";

import React from "react";
import IconGenerator from "../../Wrappers/Helpers/IconGenerator";
import InfoCards from "./InfoCards";

const InfluencerListItem = ({ className }) => {
  return (
    <div
      className={`${className} flex items-center py-2 px-2 border-y-1 border-black justify-between`}
    >
      <IconGenerator color={"green"} className="text-green-600" size={32} />

      <div className="flex flex-col">
        <div className="font-semibold">Influencer 1</div>
        <div className="font-light text-sm">Instagram</div>
      </div>

      <div className="flex flex-col">
        <InfoCards color="green-600">+45%</InfoCards>
        <InfoCards color="green-600">+45%</InfoCards>
      </div>
    </div>
  );
};

const Influencer = ({ className }) => {
  return (
    <div className={`${className} flex flex-col justify-around`}>
      <InfluencerListItem />
      <InfluencerListItem />
    </div>
  );
};

export default Influencer;
