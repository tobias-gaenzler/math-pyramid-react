import React, { useState } from "react";
import "./MathPyramid.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import * as _ from "underscore";
import MathPyramidField, {
  MathPyramidInputFieldHandler,
} from "../MathPyramidField/MathPyramidField";
import { Model } from "../../common/Model";

type Props = {
  size: number;
  maxValue: number;
};

const MathPyramid: React.FC<Props> = ({ size, maxValue }: Props) => {
  const [model, setModel] = useState<Model>(new Model(size, maxValue));

  const inputHandler: MathPyramidInputFieldHandler = (
    index: number,
    inputValue: string,
    model: Model
  ): boolean => {
    const inputCorrect = model.solution[index].toString() === inputValue;
    if (inputCorrect) {
      model.userInput[index] = parseInt(inputValue);
      if (_.isEqual(model.solution, model.userInput)) {
        setModel(new Model(size, maxValue));
      }
    }
    return inputCorrect;
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
      const index = model.calculator.getIndex(row, column, model.size);
      fields.push(
        <MathPyramidField
          key={createRandomKey(index)}
          index={index}
          inputHandler={inputHandler}
          model={model}
          value={model.startValues[index]}
        />
      );
    }
    return fields;
  }

  // avoid changing from uncontrolled to controlled fields when
  // starting new game by using random key for fields
  function createRandomKey(index: number) {
    return "field_"
      .concat(index.toString())
      .concat("_")
      .concat(Math.random().toString());
  }
};

export default MathPyramid;
