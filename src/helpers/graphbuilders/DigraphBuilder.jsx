"use client";

import React, { useEffect } from "react";
import { Stage, Layer, Rect, Text, Line, Arrow } from "react-konva";

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

        {/* Render edges */}
        {edges.map(({ from, to, angle = 0, length = 50 }) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];

          // Calculate arrow position
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const angleRad = (angle * Math.PI) / 180; // Convert angle to radians
          const x1 = fromNode.x + Math.cos(angleRad) * fromNode.radius;
          const y1 = fromNode.y + Math.sin(angleRad) * fromNode.radius;
          const x2 = toNode.x - Math.cos(angleRad) * toNode.radius;
          const y2 = toNode.y - Math.sin(angleRad) * toNode.radius;

          return (
            <Arrow
              key={`${from}-${to}`}
              points={[x1, y1, x2, y2]}
              pointerLength={8}
              pointerWidth={8}
              fill="black"
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Digraph;
