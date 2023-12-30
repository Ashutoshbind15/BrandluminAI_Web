import { FundFilled, FundOutlined } from "@ant-design/icons";

const AnalyticsCardSm = ({ val, type = "fund" }) => {
  return (
    <div className="flex flex-col mx-2 my-4 items-center">
      {type === "fund" && <FundFilled className="text-3xl" />}
      <div className="text-sm font-light">{val}</div>
    </div>
  );
};

export default AnalyticsCardSm;
