import React from "react";

const SideBars = ({
  sideBarState,
  setSideBarState,
  className,
  elements,
  elementStyleString,
  selectedElementStyleString,
  keyedElements,
}) => {
  console.log("sideBarState", sideBarState);
  console.log("elements", elements);
  console.log(setSideBarState);

  if (keyedElements) {
    return (
      <div className={`${className}`}>
        {keyedElements.map((element, index) => {
          return (
            <button
              className={`${elementStyleString} ${
                sideBarState === element.key ? selectedElementStyleString : null
              }`}
              onClick={() => setSideBarState(element.key)}
              key={index}
            >
              {element.element}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {elements.map((element, index) => {
        return (
          <button
            className={`${elementStyleString} ${
              sideBarState === element ? selectedElementStyleString : null
            }`}
            onClick={() => setSideBarState(element)}
            key={index}
          >
            {element}
          </button>
        );
      })}
    </div>
  );
};

export default SideBars;
