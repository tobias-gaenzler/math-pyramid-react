import React from "react";
import MathPyramidPractice from "../components/MathPyramidPractice/MathPyramidPractice";

type Props = {};

const PracticeView: React.FC<Props> = () => {
  return <MathPyramidPractice size={3} maxValue={100} />;
};

export default PracticeView;
