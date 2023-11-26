import {
  AdjacencyList,
  GraphNode,
} from "@/app/utils/componentBuilders/digraph";
import React from "react";

const GraphComponent = () => {
  const root = new GraphNode("root");

  const lst = new AdjacencyList([
    {
      node: root,
      ngbs: [
        new GraphNode("ngb1"),
        new GraphNode("ngb2"),
        new GraphNode("ngb3"),
      ],
    },
    {
      node: new GraphNode("ngb1"),
      ngbs: [new GraphNode("ngb4"), new GraphNode("ngb5")],
    },
    {
      node: new GraphNode("ngb2"),
      ngbs: [new GraphNode("ngb6"), new GraphNode("ngb7")],
    },
    {
      node: new GraphNode("ngb3"),
      ngbs: [new GraphNode("ngb8"), new GraphNode("ngb9")],
    },
  ]);

  const bfsres = lst.bfs();

  return (
    <div>
      <div>GraphComponent</div>
      <div className="flex">
        {bfsres.map((node) => (
          <>
            <div>{node.text}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default GraphComponent;
