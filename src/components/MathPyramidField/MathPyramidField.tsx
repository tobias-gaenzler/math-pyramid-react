import React, { useState } from "react";
import "./MathPyramidField.css";
import TextField from "@mui/material/TextField";
import { Model } from "../../common/Model";
import { useModelContext } from "../../common/ModelContext";

export interface MathPyramidInputFieldHandler {
  (index: number, inputValue: string, model: Model): boolean;
}

type Props = {
  index: number;
  inputHandler: MathPyramidInputFieldHandler;
};

const MathPyramidField: React.FC<Props> = ({ index, inputHandler }: Props) => {
  const { contextModel } = useModelContext();
  let startValue: string = "";
  if (contextModel.startValues[index]) {
    startValue = contextModel.startValues[index]!.toString();
  }
  const [fieldValue, setFieldValue] = useState<string>(startValue);
  const [disabled, setDisabled] = useState<boolean>(
    fieldValue === "" ? false : true
  );
  const [className, setClassName] = useState<string>(
    `pyramid-field ${disabled ? "disabled" : ""}`
  );
  console.dir(contextModel);
  console.log(`Field: ${fieldValue}, ${disabled}, ${className}`);

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
        const inputCorrect = inputHandler(
          index,
          currentInputValue,
          contextModel
        );
        console.log(`correct: ${inputCorrect}`);
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
