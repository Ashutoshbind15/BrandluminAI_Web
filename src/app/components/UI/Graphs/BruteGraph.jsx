import React from "react";

const BruteGraph = ({ grid }) => {
  const numrows = grid.length;
  const numcols = grid[0].length;

  const colstack = [];

  for (let i = 0; i < numcols; i++) {
    const tmp = [];

    for (let j = 0; j < numrows; j++) {
      tmp.push(grid[j][i]);
    }

    colstack.push(tmp);
  }

  const colstackComponents = [];

  for (let col of colstack) {
    const colDiv = (
      <div className="flex flex-col items-start">
        {col.map((row, index) => {
          return row[0] !== "*" ? (
            index === col.length - 1 || col[index + 1] === "*" ? (
              <div className="px-4 py-2 border-black border-2 my-4">{row}</div>
            ) : (
              <div className="flex flex-col items-center" key={index}>
                <div className="px-4 py-2 border-black border-2 my-4">
                  {row}
                </div>
                <div className="h-4 w-2 bg-gray-700 my-2"></div>
              </div>
            )
          ) : null;
        })}
      </div>
    );

    colstackComponents.push(colDiv);
  }

  return (
    <div className="flex items-start justify-around px-12">
      {colstackComponents.map((col, index) => {
        return index === colstackComponents.length - 1 ? (
          col
        ) : (
          <div className="flex flex-1" key={index}>
            {col}
            <div className="w-2 h-2 bg-gray-700 my-4 flex-1 mx-6"></div>
          </div>
        );
      })}
    </div>
  );
};

export default BruteGraph;
