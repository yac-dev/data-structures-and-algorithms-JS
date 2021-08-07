// ------------------ andreiの書き方より、こっちの方が分かりやすい ------------------ //
// O(n)
const fibonacciIterative = (index) => {
  let fibonacciSequence = [0, 1];
  for (let i = 2; i <= index; i++) {
    fibonacciSequence.push(fibonacciSequence[i - 2] + fibonacciSequence[i - 1]);
  }
  return fibonacciSequence;
};

// console.log(fibonacciIterative(4));

// O(2^n)
const fibonacchiRecursive = (index) => {
  if (index < 2) {
    return index;
  }
  return fibonacchiRecursive(index - 1) + fibonacchiRecursive(index - 2);
};

console.log(fibonacchiRecursive(4));
