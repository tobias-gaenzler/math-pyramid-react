import React, { useEffect, useState } from "react";
import "./MathPyramidField.css";
import TextField from "@mui/material/TextField";
import { Model } from "../../common/Model";

export interface MathPyramidFieldHandler {
  (index: number, inputValue: string): boolean;
}

type Props = {
  index: number;
  model: Model;
  inputHandler: MathPyramidFieldHandler;
};

const MathPyramidField: React.FC<Props> = ({
  index,
  model,
  inputHandler,
}: Props) => {
  let startValue = "";
  if (model.userInput[index]) {
    startValue = model.userInput[index]!.toString();
  } else if (model.startValues[index]) {
    startValue = model.startValues[index]!.toString();
  }
  const [value, setValue] = useState<string>(startValue);
  const [disabled, setDisabled] = useState<boolean>(
    value === "" ? false : true
  );
  const [className, setClassName] = useState<string>("pyramid-field");

  useEffect(() => {
    const expectsUserInput = !model.startValues[index];
    if (expectsUserInput) {
      if (value === "") {
        setClassName("pyramid-field");
      } else if (model.solution[index].toString() === value) {
        setClassName("pyramid-field correct");
        setDisabled(true);
      } else {
        setClassName("pyramid-field incorrect");
      }
    } else {
      setClassName("pyramid-field disabled");
    }
  }, [index, model.solution, model.startValues, value]);

  return (
    <TextField
      className={className}
      inputProps={{ type: "number" }}
      onKeyPress={(event) => {
        // allow only numbers
        if (!/[0-9]/.test(event.key)) {
          console.log("pressed");
          event.preventDefault();
        }
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const currentInputValue = event.target.value;
        setValue(currentInputValue);
        const hasInput = "" !== currentInputValue;
        if (hasInput) {
          inputHandler(index, currentInputValue);
        }
      }}
      value={value}
      disabled={disabled}
    />
  );
};

export default MathPyramidField;
