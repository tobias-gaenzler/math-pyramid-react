import { MathPyramidCalculator } from "../service/MathPyramidCalculator";

class Model {
  calculator: MathPyramidCalculator = new MathPyramidCalculator();
  solution: number[];
  startValues: (undefined | number)[];
  userInput: (undefined | number)[];
  size: number;
  constructor(size: number, maxValue: number) {
    this.size = size;
    this.solution = this.calculator.createRandomSolution(size, maxValue);
    this.startValues = this.calculator.getRandomStartValues(
      this.solution,
      size
    );
    this.userInput = Object.assign([], this.startValues);
  }
}

export { Model };
