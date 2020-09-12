import React, { useState } from "react";
import Select from "react-select";
import "./Dropdown.scss";
export default function Dropdown({ setSelectedOption }) {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      marginRight: "30vh",
      marginLeft: "30vh",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      color: "black",
      width: "30rem",

      background: "#fff",

      "&:hover": {
        background: "rgb(255, 64, 129);",
      },
    }),
    control: (state) => ({
      ...state,

      width: "30rem",
    }),
  };
  const options = [
    { value: "Dijkstra's algorithm", label: "Dijkstra's algorithm" },
    { value: "Breadth-first search", label: "Breadth-first search" },
    { value: "Depth-first search", label: "Depth-first search" },
    { value: "A* search algorithm", label: "A* search algorithm" },
    { value: "Generate maze", label: "Generate maze" },
  ];
  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={(e) => setSelectedOption(e.value)}
    />
  );
}
