import React, { useState } from "react";
import "./MathPyramidField.css";
import TextField from "@mui/material/TextField";
import { Model } from "../../common/Model";

export interface MathPyramidInputFieldHandler {
  (index: number, inputValue: string, model: Model): boolean;
}

type Props = {
  index: number;
  model: Model;
  inputHandler: MathPyramidInputFieldHandler;
};

const MathPyramidField: React.FC<Props> = ({
  index,
  model,
  inputHandler,
}: Props) => {
  let startValue: string = model.startValues[index]
    ? model.startValues[index]!.toString()
    : "";
  const [fieldValue, setFieldValue] = useState<string>(startValue);
  const [disabled, setDisabled] = useState<boolean>(
    fieldValue === "" ? false : true
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
          // setFieldValue("");
          return;
        }
        setFieldValue(currentInputValue);
        const inputCorrect = inputHandler(index, currentInputValue, model);
        if (inputCorrect) {
          setDisabled(true);
          setClassName("pyramid-field correct");
        } else {
          setClassName("pyramid-field incorrect");
        }
      }}
      value={fieldValue}
      disabled={disabled}
    />
  );
};

export default MathPyramidField;
