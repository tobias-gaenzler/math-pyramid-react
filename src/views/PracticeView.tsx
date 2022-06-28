import React from "react";
import MathPyramid from "../components/MathPyramid/MathPyramid";

type Props = {};

const PracticeView: React.FC<Props> = () => {
  return <MathPyramid size={3} maxValue={100} />;
};

export default PracticeView;
