"use client";

import React, { useEffect } from "react";
import { Stage, Layer, Rect, Text, Line } from "react-konva";

const Node = ({ x, y, radius, nodeId }) => (
  <>
    <Rect
      x={x - radius}
      y={y - radius}
      width={radius * 2}
      height={radius * 2}
      fill="lightblue"
    />
    <Text
      x={x}
      y={y}
      text={nodeId}
      fontSize={12}
      fill="black"
      align="center"
      verticalAlign="middle"
    />
  </>
);

const Digraph = ({ nodes, edges }) => {
  useEffect(() => {
    // Your edge drawing logic here
  }, [nodes, edges]);

  return (
    <Stage width={300} height={300}>
      <Layer>
        {/* Render nodes */}
        {Object.values(nodes).map(({ x, y, radius, nodeId }) => (
          <Node key={nodeId} x={x} y={y} radius={radius} nodeId={nodeId} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Digraph;
