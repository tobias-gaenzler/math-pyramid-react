import React from "react";
import { WebsocketContextProvider } from "../common";
import { MathPyramidMultiplayer } from "../components";

type Props = {};

const PlayView: React.FC<Props> = () => {
  return (
    <WebsocketContextProvider>
      <MathPyramidMultiplayer size={3} maxValue={100} />
    </WebsocketContextProvider>
  );
};

export default PlayView;
