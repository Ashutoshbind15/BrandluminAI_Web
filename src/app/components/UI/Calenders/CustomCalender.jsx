"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ selectedDate, setSelectedDate }) => {
  const tileClassName = ({ date, view }) => {
    // Add custom class for selected dates
    if (view === "month" && date.getTime() === selectedDate.getTime()) {
      return "bg-blue-200 text-white";
    }
    return null;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatMonthLabel = ({ date, view }) => {
    if (view === "month") {
      const options = { year: "numeric", month: "long" };
      return date.toLocaleDateString(undefined, options);
    }
    return "";
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={selectedDate}
      tileClassName={tileClassName}
      navigationLabel={formatMonthLabel}
      className={"w-auto border-0 shadow-xl"}
    />
  );
};

export default CustomCalendar;
