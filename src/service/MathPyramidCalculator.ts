import * as _ from "underscore";

class MathPyramidCalculator {
  createRandomSolution(size: number, maxValue: number): number[] {
    const maxValueInLowestRow = Math.max(
      2,
      Math.floor(maxValue / Math.pow(2, size - 1))
    );
    // start values in bottom row of pyramid
    const randomSolution: number[] = [];
    while (randomSolution.length < size) {
      const r = Math.floor(Math.random() * maxValueInLowestRow) + 1;
      if (randomSolution.indexOf(r) === -1) randomSolution.push(r);
    }
    // solve pyramid from bottom to top
    let offset = 0;
    for (let i = 1; i < size; i++) {
      for (let j = 0; j < size - i; j++) {
        randomSolution.push(
          randomSolution[offset + j] + randomSolution[offset + j + 1]
        );
      }
      offset += size - (i - 1);
    }
    return randomSolution;
  }

  getRandomStartValues(
    solution: number[],
    size: number
  ): (number | undefined)[] {
    let randomStartIndices = _.sortBy(_.sample([0, 1, 2, 3, 4, 5], size));
    while (
      // exclude not uniquely solvable start values
      _.isEqual(randomStartIndices, [0, 1, 3]) ||
      _.isEqual(randomStartIndices, [1, 2, 4]) ||
      _.isEqual(randomStartIndices, [3, 4, 5]) ||
      _.isEqual(randomStartIndices, [0, 2, 5])
    ) {
      randomStartIndices = _.sortBy(_.sample([0, 1, 2, 3, 4, 5], size));
    }

    const startValues = new Array(6);
    _.each(
      randomStartIndices,
      (index: number) => (startValues[index] = solution[index])
    );
    return startValues;
  }

  getIndex(rowId: number, colId: number, size: number): number {
    let index = 0;
    // increase index by (size - i) for each row
    for (let i = 0; i < rowId; i = i + 1) {
      index = index + size - i;
    }
    return index + colId;
  }
}

export { MathPyramidCalculator };
