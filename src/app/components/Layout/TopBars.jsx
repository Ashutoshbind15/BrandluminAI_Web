import React from "react";

const TopBars = ({
  state,
  setState,
  listItems = [1, 2, 3, 4, 5],
  parentStyles,
  itemStyles,
  selectedItemStyles,
  keyedItems,
}) => {
  return (
    <div className={`${parentStyles} flex items-center justify-around`}>
      {listItems.map((item, index) => (
        <button
          key={index}
          onClick={() => setState(item)}
          className={`${itemStyles} bg-black py-2 flex-1 px-2 ${
            state === item ? selectedItemStyles : "text-white"
          } ${index > 0 ? `mx-2` : "mr-2"}`}
        >
          {keyedItems ? keyedItems[index].element : item}
        </button>
      ))}
    </div>
  );
};

export default TopBars;
