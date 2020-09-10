import React from "react";
import "./Description.scss";

export default function Description(prop) {
  return (
    <>
      <div
        className={
          prop.title.includes("Shortest")
            ? "search-node"
            : prop.title.includes("Visited")
            ? "visited-node"
            : prop.title.includes("Wall")
            ? "wall-node"
            : prop.title.includes("Start")
            ? "start-node"
            : prop.title.includes("Target")
            ? "target-node"
            : "unvisited-node"
        }></div>
      <div>{prop.title}</div>
    </>
  );
}
