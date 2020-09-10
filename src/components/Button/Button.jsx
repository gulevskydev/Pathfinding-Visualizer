import React from "react";
import "./Button.scss";
function Button(prop) {
  function handleClick(e) {
    if (prop.isFinishedAlgo) {
      if (prop.title === "RESET") {
        prop.setResetAlgo(true);
      } else {
        if (prop.isClearGrid) {
          prop.setVisualizeAlgo(true);
        }
      }
    }
  }
  return (
    <div id="container">
      <button class="learn-more" onClick={(e) => handleClick(e)}>
        {prop.title}
      </button>
    </div>
  );
}

export default Button;
