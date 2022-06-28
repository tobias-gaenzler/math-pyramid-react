import React, { useEffect, useState } from "react";
import "./MathPyramid.css";
import MathPyramidField, {
  MathPyramidInputFieldHandler,
} from "../MathPyramidField/MathPyramidField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { MathPyramidCalculator } from "../../service/MathPyramidCalculator";
import * as _ from "underscore";

const inputHandler: MathPyramidInputFieldHandler = (
  inputValue: string,
  solutionValue: number
): boolean => {
  const inputCorrect = solutionValue.toString() === inputValue;
  return inputCorrect;
};

type Props = {
  size: number;
  maxValue: number;
};

const MathPyramid: React.FC<Props> = ({ size, maxValue }: Props) => {
  const [calculator] = useState<MathPyramidCalculator>(
    new MathPyramidCalculator()
  );
  const [solution] = useState<number[]>(
    calculator.createRandomSolution(size, maxValue)
  );
  const [startValues] = useState<(number | undefined)[]>(
    calculator.getRandomStartValues(solution, size)
  );
  const [userInput, setUserInput] = useState<(number | undefined)[]>(
    Object.assign([], startValues)
  );
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  let rows: React.ReactElement[] = getRows(
    size,
    calculator,
    solution,
    startValues,
    userInput,
    setUserInput
  );

  useEffect(() => {
    if (_.isEqual(userInput, solution)) {
      console.log("Game won!!");
      setPopupVisible(true);
    }
  }, [userInput, solution]);

  function closePopup(): void {
    setPopupVisible(false);
  }

  return (
    <React.Fragment>
      <Stack
        spacing={4}
        justifyContent="center"
        alignItems="center"
        className="math-pyramid"
      >
        {rows}
      </Stack>
      {popupVisible ? (
        <div className="popup">
          <div className="popup_inner">
            <h1>Congratulations, you solved the math pyramid!</h1>
            <button onClick={closePopup}>close me</button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};
function getRows(
  size: number,
  calculator: MathPyramidCalculator,
  solution: number[],
  startValues: (undefined | number)[],
  userInput: (undefined | number)[],
  setUserInput: React.Dispatch<React.SetStateAction<(number | undefined)[]>>
): React.ReactElement[] {
  const rows: React.ReactElement[] = [];
  for (let row = size - 1; row >= 0; row--) {
    const fields = getFieldsForRow(
      size,
      row,
      calculator,
      solution,
      startValues,
      userInput,
      setUserInput
    );
    rows.push(
      <Box key={row} className="row">
        {fields}
      </Box>
    );
  }
  return rows;
}

function getFieldsForRow(
  size: number,
  row: number,
  calculator: MathPyramidCalculator,
  solution: number[],
  startValues: (undefined | number)[],
  userInput: (undefined | number)[],
  setUserInput: React.Dispatch<React.SetStateAction<(number | undefined)[]>>
): React.ReactElement[] {
  const fields: React.ReactElement[] = [];
  for (let column = 0; column < size - row; column++) {
    const fieldIndex = calculator.getIndex(row, column, size);
    const fieldKey = "field_".concat(fieldIndex.toString());
    fields.push(
      <MathPyramidField
        key={fieldKey}
        startValue={startValues[fieldIndex]}
        solutionValue={solution[fieldIndex]}
        index={fieldIndex}
        inputHandler={inputHandler}
        userInput={userInput}
        setUserInput={setUserInput}
      />
    );
  }

  return fields;
}

export default MathPyramid;
