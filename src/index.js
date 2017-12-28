import math from 'mathjs';
import csvToMatrix  from 'csv-to-array-matrix';

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

  let m = y.length;

  // Part 1: Normal Equation
  console.log('Part 1: Normal Equation ...\n');

  // Add Intercept Term
  X = math.concat(math.ones([m, 1]).valueOf(), X);

  let theta = normalEquation(X, y);

  console.log('theta: ', theta);
  console.log('\n');

  // Part 2: Predict Price of 1650 square meter and 3 bedroom house
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
