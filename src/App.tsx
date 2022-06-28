import React from "react";
import "./App.css";
import MathPyramid from "./components/MathPyramid/MathPyramid";
import Header from "./components/Header/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <MathPyramid size={3} maxValue={100} />
    </React.Fragment>
  );
}

export default App;
