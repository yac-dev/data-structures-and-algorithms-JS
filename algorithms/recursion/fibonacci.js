// ------------------ andreiの書き方より、こっちの方が分かりやすい ------------------ //
// O(2^n)
const fibonacchiSucks = (index) => {
  if (index < 2) {
    return index;
  }
  return fibonacchiSucks(index - 1) + fibonacchiSucks(index - 2);
};

console.log(fibonacchiSucks(4));
// it really sucks! これを、dynamic programmingの考えを使えば、もっと計算の効率化をする事ができる。

// dynamic programming。これもrecursiveだが、memorizaeするから、O(n)で素晴らしい。ただ、下のやつと比べるとspaceをより使う。fib(10000)とかでやるとstack overflowを起こす。下は、Infinityと出力され、エラーを起こさない。
const fibonacchiMemo = (number, memo = []) => {};

// O(n) より、space complexityが少なく済む。bottom upするやり方。tabulationな方法。
const fibonacchiTable = (index) => {
  let fibonacciSequence = [0, 1];
  for (let i = 2; i <= index; i++) {
    fibonacciSequence.push(fibonacciSequence[i - 2] + fibonacciSequence[i - 1]);
  }
  return fibonacciSequence;
};

console.log(fibonacciIterative(4));
