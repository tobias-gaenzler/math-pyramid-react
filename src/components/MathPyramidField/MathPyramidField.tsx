import React, { useState } from "react";
import "./MathPyramidField.css";
import TextField from "@mui/material/TextField";
import { Model } from "../../common/Model";

export interface MathPyramidInputFieldHandler {
  (index: number, inputValue: string, model: Model): boolean;
}

type Props = {
  index: number;
  value: unknown;
  model: Model;
  inputHandler: MathPyramidInputFieldHandler;
};

const MathPyramidField: React.FC<Props> = ({
  index,
  value,
  model,
  inputHandler,
}: Props) => {
  const startValue = model.startValues[index];
  const [disabled, setDisabled] = useState<boolean>(
    startValue === undefined ? false : true
  );
  const [className, setClassName] = useState<string>(
    `pyramid-field ${disabled ? "disabled" : ""}`
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
        const inputCorrect = inputHandler(index, currentInputValue, model);
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
