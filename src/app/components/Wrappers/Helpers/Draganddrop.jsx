import React, { useState } from "react";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";

const init = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
];

const DragAndDropContainer = ({ children }) => {
  const [listItems, setListItems] = useState(init);
  const [stackItems, setStackItems] = useState([]);

  const handleDragStart = (e, draggedItem) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(draggedItem));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Handle the drop logic, e.g., update state
    setStackItems((prevItems) => [...prevItems, droppedItem]);

    // Remove the item from the stack
    setListItems((prevItems) =>
      prevItems.filter((item) => item.id !== droppedItem.id)
    );
  };

  return (
    <div className="flex flex-col self-stretch justify-around items-center w-full">
      <div className="flex w-full justify-around">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col border-1 border-black border-dashed p-3"
        >
          {stackItems.map((item) => (
            <div
              key={item.id}
              className="cursor-move py-1 px-2 border-1 bg-black border-black mb-0.5 text-white"
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="">{children}</div>
      </div>

      <div className="flex mr-2 w-full justify-center">
        {listItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className="cursor-move border-1 bg-black border-black text-white flex items-center px-2"
          >
            {item.text}
          </div>
        ))}

        <PrimaryButton
          onClick={() => {
            setListItems(init);
            setStackItems([]);
          }}
          className="ml-4"
        >
          Reset
        </PrimaryButton>
      </div>
    </div>
  );
};

export default DragAndDropContainer;
