import React, { useState, Context } from "react";
import "./App.css";
import Grid from "../Grid/Grid";
import NavBar from "../NavBar/NavBar";

function App() {
  const [activeAlgo, setActiveAlgo] = useState("Diijkstra");
  const [resetAlgo, setResetAlgo] = useState(false);
  const [visualizeAlgo, setVisualizeAlgo] = useState(false);
  const [isFinishedAlgo, setFinishedAlgo] = useState(true);
  const [isClearGrid, setIsClearGrid] = useState(true);

  return (
    <>
      <NavBar
        setActiveAlgo={setActiveAlgo}
        setResetAlgo={setResetAlgo}
        setVisualizeAlgo={setVisualizeAlgo}
        isFinishedAlgo={isFinishedAlgo}
        isClearGrid={isClearGrid}
      />
      <Grid
        activeAlgo={activeAlgo}
        resetAlgo={resetAlgo}
        setResetAlgo={setResetAlgo}
        visualizeAlgo={visualizeAlgo}
        setVisualizeAlgo={setVisualizeAlgo}
        setFinishedAlgo={setFinishedAlgo}
        isFinishedAlgo={isFinishedAlgo}
        setIsClearGrid={setIsClearGrid}
      />
    </>
  );
}

export default App;
