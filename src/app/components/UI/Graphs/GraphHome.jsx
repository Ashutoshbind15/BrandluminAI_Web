"use client";

// dynamic import with ssr false for Digraph

import dynamic from "next/dynamic";
const Digraph = dynamic(
  () => import("@/helpers/graphbuilders/DigraphBuilder"),
  {
    ssr: false,
  }
);

const GraphHome = () => {
  const nodes = {
    node1: { x: 50, y: 50, radius: 10 },
    node2: { x: 150, y: 50, radius: 10 },
    node3: { x: 100, y: 150, radius: 10 },
  };

  const edges = [
    { from: "node1", to: "node2" },
    { from: "node2", to: "node3", angle: 60, length: 15 },
  ];

  return <Digraph nodes={nodes} edges={edges} />;
};

export default GraphHome;
