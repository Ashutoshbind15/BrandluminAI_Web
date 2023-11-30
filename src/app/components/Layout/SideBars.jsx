import React from "react";

const SideBars = ({
  sideBarState,
  setSideBarState,
  className,
  elements,
  elementStyleString,
  selectedElementStyleString,
}) => {
  return (
    <div className={`${className}`}>
      {elements.map((element, index) => {
        return (
          <div
            className={`${elementStyleString} ${
              sideBarState === element ? selectedElementStyleString : null
            }`}
            onClick={() => setSideBarState(element)}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
};

export default SideBars;
