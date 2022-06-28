import React, { useState } from "react";
import "./MathPyramidField.css";
import TextField from "@mui/material/TextField";

export interface MathPyramidInputFieldHandler {
  (inputValue: string, solutionValue: number): boolean;
}
type Props = {
  startValue?: undefined | number;
  solutionValue: number;
  index: number;
  inputHandler: MathPyramidInputFieldHandler;
  userInput: (undefined | number)[];
  setUserInput: React.Dispatch<React.SetStateAction<(number | undefined)[]>>;
};

const MathPyramidField: React.FC<Props> = ({
  startValue,
  solutionValue,
  index,
  inputHandler,
  userInput,
  setUserInput,
}: Props) => {
  const [disabled, setDisabled] = useState<boolean>(
    startValue === undefined ? false : true
  );
  const [className, setClassName] = useState<string>(
    `pyramid-field ${disabled ? "disabled" : ""}`
  );
  const [value, setValue] = useState<string>(
    startValue === undefined ? "" : startValue.toString()
  );

  return (
    <TextField
      className={className}
      inputProps={{ type: "number" }}
      onKeyPress={(event) => {
        // allow only numbers
        if (disabled || !/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.target.value;
        if ("" === currentInputValue) {
          setClassName("pyramid-field");
          return;
        }
        setValue(currentInputValue);
        userInput[index] = parseInt(currentInputValue);
        setUserInput(Object.assign([], userInput));
        const inputCorrect = inputHandler(currentInputValue, solutionValue);
        if (inputCorrect) {
          setDisabled(true);
          setClassName("pyramid-field correct");
        } else {
          setClassName("pyramid-field incorrect");
        }
      }}
      value={value}
      disabled={disabled}
    />
  );
};

export default MathPyramidField;
