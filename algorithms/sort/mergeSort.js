const numbers = [3, 7, 4, 1, 9, 12, 8, 10]; // 要素数が2^n個が一番分かりやすい。
// ------------------------------- 冗長な書き方 ------------------------------- //
// function mergeSort(array) {
//   if (array.length === 1) {
//     return array;
//   }
//   const middle = Math.floor(array.length / 2);
//   let arrayLeft = array.slice(0, middle); // index 0 ~ 5
//   // console.log(arrayLeft);
//   let arrayRight = array.slice(middle); // sliceの引数を含めて、それ以降のindexをパクる。
//   // console.log(arrayRight);
//   return merge(mergeSort(arrayLeft), mergeSort(arrayRight));
// }

// function merge(arrayLeft, arrayRight) {
//   const result = [];
//   let i = 0;
//   let j = 0;
//   while (i < arrayLeft.length && j < arrayRight.length) {
//     if (arrayLeft[i] < arrayRight[j]) {
//       result.push(arrayLeft[i]);
//       i++;
//     } else {
//       result.push(arrayRight[j]);
//       j++;
//     }
//   }
//   // console.log(left, right)
//   return result.concat(arrayLeft.slice(i)).concat(arrayRight.slice(j));
// }

// const answer = mergeSort(numbers);
// console.log(answer);

// ------------------------------- こっちの方が好き ------------------------------- //
const mergeSort = (array) => {
  if (array.length === 1) {
    return array;
  }
  let middle = Math.floor(array.length / 2);
  let arrayLeft = array.slice(0, middle); // sliceの場合は、配列をコピーする。だからその分、space complexityを使う。
  let arrayRight = array.slice(middle);
  return merge(mergeSort(arrayLeft), mergeSort(arrayRight));
};

const merge = (arrayLeft, arrayRight) => {
  let result = [];
  while (arrayLeft.length && arrayRight.length) {
    if (arrayLeft[0] < arrayRight[0]) {
      result.push(arrayLeft.shift());
    } else {
      result.push(arrayRight.shift());
    }
  }
  return [...result, ...arrayLeft, ...arrayRight];
};

const answer = mergeSort(numbers);
console.log(answer);
