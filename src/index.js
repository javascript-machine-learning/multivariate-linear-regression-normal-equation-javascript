import math from 'mathjs';
import csvToMatrix  from 'csv-to-array-matrix';

import {
  getDimensionSize,
  pushVector,
} from 'mathjs-util';

csvToMatrix('./src/data.csv', init);

function init(matrix) {

  // Part 0: Preparation
  console.log('Part 0: Preparation ...\n');

  let X = math.eval('matrix[:, 1:2]', {
    matrix,
  });
  let y = math.eval('matrix[:, 3]', {
    matrix,
  });

  let m = getDimensionSize(y, 1);

  // Part 1: Normal Equation
  console.log('Part 1: Normal Equation ...\n');

  // Add Intercept Term
  X = pushVector(X, 0, math.ones([m, 1]).valueOf());

  let theta = normalEquation(X, y);

  console.log('theta: ', theta);
  console.log('\n');

  // Part 3: Predict Price of 1650 square meter and 3 bedroom house
  console.log('Part 3: Price Prediction ...\n');

  let houseVector = [1, 1650, 3];
  let price = math.eval('houseVector * theta', {
    houseVector,
    theta,
  });

  console.log('Predicted price for a 1650 square meter and 3 bedroom house: ', price);
}

function normalEquation(X, y) {
  let theta = math.eval(`inv(X' * X) * X' * y`, {
    X,
    y,
  });

  return theta;
}