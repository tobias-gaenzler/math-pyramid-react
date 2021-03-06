import React, { useState } from "react";
import "./MathPyramidMultiplayer.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import _ from "underscore";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { MathPyramidCalculator } from "../../service/MathPyramidCalculator";
import {
  MessageType,
  Model,
  useModelContext,
  useWebsocketContext,
} from "../../common";
import MathPyramidField, {
  MathPyramidFieldHandler,
} from "../MathPyramidField/MathPyramidField";

type Props = {
  size: number;
  maxValue: number;
};

const MathPyramidMultiplayer: React.FC<Props> = ({ size, maxValue }: Props) => {
  const calculator = new MathPyramidCalculator();
  const { contextModel } = useModelContext();
  const { sendMessage } = useWebsocketContext();

  const model = contextModel
    ? contextModel
    : new Model(size, maxValue, calculator);
  const [solved, setSolved] = useState<boolean>(false);

  const inputHandler: MathPyramidFieldHandler = (
    index: number,
    inputValue: string
  ): boolean => {
    const inputCorrect = model.solution[index].toString() === inputValue;
    if (inputCorrect) {
      model.userInput[index] = parseInt(inputValue);
      if (_.isEqual(model.solution, model.userInput)) {
        setSolved(true);
      }
    }
    return inputCorrect;
  };

  const restart = () => {
    sendMessage(
      JSON.stringify(new Model(size, maxValue, calculator)),
      MessageType.MODEL
    );
  };
  const closePopup = () => {
    setSolved(false);
  };

  const rows: React.ReactElement[] = getRows();

  return (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
      className="math-pyramid"
    >
      {rows}
      <Dialog open={solved} onClose={closePopup}>
        <DialogContent>
          <Alert variant="filled" severity="success">
            <AlertTitle>Solved!</AlertTitle>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>Close</Button>
        </DialogActions>
      </Dialog>
      <Button color="primary" variant="contained" onClick={restart}>
        Restart
      </Button>
    </Stack>
  );

  function getRows() {
    const rows: React.ReactElement[] = [];
    for (let row = model.size - 1; row >= 0; row--) {
      const fields: React.ReactElement[] = getFieldsForRow(row);
      rows.push(
        <Box key={row} className="row">
          {fields}
        </Box>
      );
    }
    return rows;
  }

  function getFieldsForRow(row: number) {
    const fields: React.ReactElement[] = [];
    for (let column = 0; column < model.size - row; column++) {
      const index = calculator.getIndex(row, column, model.size);
      fields.push(
        <MathPyramidField
          key={createRandomKey(index)}
          index={index}
          model={model}
          inputHandler={inputHandler}
        />
      );
    }
    return fields;
  }
};

//ensure field updates on restart by using random key for fields
function createRandomKey(index: number) {
  return "field_"
    .concat(index.toString())
    .concat("_")
    .concat(Math.random().toString());
}

export default MathPyramidMultiplayer;
