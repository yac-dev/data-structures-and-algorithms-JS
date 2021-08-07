const factorialRecursive = (number) => {
  if (number === 2) {
    return 2;
  }
  return number * factorialRecursive(number - 1);
};

const factorialIterative = (number) => {
  let result = 1; // 足し算と違って、「0」での初期化はできない。また、undefinedでもだめだよ。当然。NaNになるよ。
  for (let i = 2; i <= number; i++) {
    result = result * i;
  }
  return result;
};

// console.log(factorialRecursive(5));
// console.log(factorialIterative(5));
