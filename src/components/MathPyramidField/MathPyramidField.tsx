import React, { useCallback, useEffect, useState } from "react"
import "./MathPyramidField.css"
import TextField from "@mui/material/TextField"
import { Model } from "../../common"

export interface MathPyramidFieldHandler {
  (index: number, inputValue: string): boolean
}

type Props = {
  index: number
  model: Model
  inputHandler: MathPyramidFieldHandler
}

const MathPyramidField: React.FC<Props> = ({
  index,
  model,
  inputHandler,
}: Props) => {

  const getStartValue = useCallback(() => {
    if (model.startValues[index]) {
      return model.startValues[index]!.toString()
    } else {
      return ""
    }
  }, [model, index]);

  const [value, setValue] = useState<string>(getStartValue())
  const [disabled, setDisabled] = useState<boolean>(
    value === "" ? false : true
  )
  const [className, setClassName] = useState<string>("pyramid-field")

  // initialize field when model changes
  useEffect(() => {
    let startValue = getStartValue()
    setValue(startValue)
    setDisabled(startValue === "" ? false : true)

  }, [model, index, getStartValue])

  // set field color when input changes
  useEffect(() => {
    if (value === "") {
      setClassName("pyramid-field")
    } else if (model.solution[index].toString() === value) {
      setClassName("pyramid-field correct")
      setDisabled(true)
    } else {
      setClassName("pyramid-field incorrect")
    }
  }, [model, index, value])

  return (
    <TextField
      className={className}
      inputProps={{ type: "number" }}
      onKeyPress={(event) => {
        // allow only numbers
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault()
        }
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.target.value
        setValue(currentInputValue)
        const hasInput = ("" !== currentInputValue)
        if (hasInput) {
          inputHandler(index, currentInputValue)
        }
      }}
      value={value}
      disabled={disabled}
    />
  )
}

export default MathPyramidField
