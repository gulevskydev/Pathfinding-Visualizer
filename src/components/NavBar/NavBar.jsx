import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import Description from "../Description/Description";

import "./NavBar.scss";
export default function NavBar({
  setActiveAlgo,
  setResetAlgo,
  setVisualizeAlgo,
  isFinishedAlgo,
  isClearGrid,
}) {
  return (
    <>
      <div className="container-nav">
        <h1>Pathfinding Visualizer</h1>
        <Dropdown setActiveAlgo={setActiveAlgo} />
        <Button
          title="RESET"
          setResetAlgo={setResetAlgo}
          isFinishedAlgo={isFinishedAlgo}
        />
        <Button
          title="VISUALIZE"
          setVisualizeAlgo={setVisualizeAlgo}
          isFinishedAlgo={isFinishedAlgo}
          isClearGrid={isClearGrid}
        />
      </div>
      <div className="description-container">
        <Description title="Start Node" />
        <Description title="Target Node" />
        <Description title="Wall Node" />
        <Description title="Unvisited Node" />
        <Description title="Visited Node" />
        <Description title="Shortest-path Node" />
      </div>
    </>
  );
}
