import React, { useState, Context } from "react";
import "./App.css";
import Grid from "../Grid/Grid";
import NavBar from "../NavBar/NavBar";

function App() {
  const [resetAlgo, setResetAlgo] = useState(false);
  const [visualizeAlgo, setVisualizeAlgo] = useState(false);
  const [isFinishedAlgo, setFinishedAlgo] = useState(true);
  const [isClearGrid, setIsClearGrid] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <NavBar
        setResetAlgo={setResetAlgo}
        setVisualizeAlgo={setVisualizeAlgo}
        isFinishedAlgo={isFinishedAlgo}
        isClearGrid={isClearGrid}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      <Grid
        resetAlgo={resetAlgo}
        setResetAlgo={setResetAlgo}
        visualizeAlgo={visualizeAlgo}
        setVisualizeAlgo={setVisualizeAlgo}
        setFinishedAlgo={setFinishedAlgo}
        isFinishedAlgo={isFinishedAlgo}
        selectedOption={selectedOption}
        setIsClearGrid={setIsClearGrid}
      />
    </>
  );
}

export default App;
