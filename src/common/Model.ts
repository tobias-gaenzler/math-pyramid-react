import { MathPyramidCalculator } from "../service/MathPyramidCalculator";

class Model {
  solution: number[];
  startValues: (undefined | number)[];
  userInput: (undefined | number)[];
  size: number;
  constructor(
    size: number,
    maxValue: number,
    calculator: MathPyramidCalculator
  ) {
    this.size = size;
    this.solution = calculator.createRandomSolution(size, maxValue);
    this.startValues = calculator.getRandomStartValues(this.solution, size);
    this.userInput = Object.assign([], this.startValues);
  }
}

export { Model };
