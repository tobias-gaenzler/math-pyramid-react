import React from "react";
import { MathPyramidPractice } from "../components";

type Props = {};

const PlayView: React.FC<Props> = () => {
  return <MathPyramidPractice size={3} maxValue={100} />;
};

export default PlayView;
