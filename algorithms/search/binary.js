// const binarySearch = (array, value) => {
//   let middle = Math.floor(array.length / 2);
//   if (array[middle] < value) {
//     let arrayRight = array.slice(middle);
//     return binarySearch(arrayRight, value);
//   } else if (array[middle] > value) {
//     let arrayLeft = array.slice(middle, value);
//     return binarySearch(arrayLeft);
//   } else if (array[middle] === value) {
//     return true;
//   } else {
//     return false;
//   }

// console.log(binarySearch(sequense, 57));

// }; // この方針では、space complexityが増えて行く。
// その配列におけるindexを出さないといけないんだよな。。。結局、sliceをしていくと、そのsliceされた配列の中でのindexが出力されることになる。
// こういう場合は、quicksortみたく、startIndex, endIndexみたく、一つの配列で考えるっていうようにしないといかんな。。。

// const binarySearch = (array, startIndex, endIndex, value) => {
//   if (startIndex <= endIndex) {
//     let middleIndex = Math.floor(endIndex - startIndex / 2);
//     // if (middleIndex === 0 || middleIndex === array.length - 1) return -1;
//     if (array[middleIndex] > value) {
//       return binarySearch(array, startIndex, middleIndex - 1, value);
//     } else if (array[middleIndex] < value) {
//       return binarySearch(array, middleIndex, endIndex, value);
//     } else if (array[middleIndex] === value) {
//       return middleIndex;
//     }
//   } else {
//     return -1;
//   }
// };
// 正直、これだと足りない。21とか入れるとstack overflowを起こす。これからさらにどうできる？ base caseは書いたけど、これでいいのか？
// こう書くことにより、O(logn)のtime complexityになる。
// console.log(binarySearch(sequense, 0, sequense.length - 1, 21));

const sequense = [3, 6, 12, 45, 57, 78];

function binarySearch(array, value) {
  let startIndex = 0;
  let endIndex = array.length - 1;
  let middleIndex = Math.floor((startIndex + endIndex) / 2);
  while (array[middleIndex] !== value && startIndex <= endIndex) {
    if (value < array[middleIndex]) endIndex = middleIndex - 1;
    else startIndex = middleIndex + 1;
    middleIndex = Math.floor((startIndex + endIndex) / 2);
  }
  return array[middleIndex] === value ? middleIndex : -1;
}

console.log(binarySearch(sequense, 52));
