const sequense = [3, 6, 19, 45, 55, 67];

// const linearSearch = (array, value) => {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] === value) {
//       return i;
//     }
//   }
//   return -1;
// };

// console.log(linearSearch(sequense, 56));

const binarySearch = (array, value) => {
  let startIndex = 0;
  let endIndex = array.length - 1;
  let middleIndex = Math.floor((startIndex + endIndex) / 2);
  while (array[middleIndex] !== value && startIndex <= endIndex) {
    if (value < array[middleIndex]) {
      endIndex = middleIndex - 1;
    } else {
      startIndex = middleIndex + 1;
    }
    middleIndex = Math.floor((startIndex + endIndex) / 2);
  }
  return array[middleIndex] === value ? middleIndex : -1;
};

console.log(binarySearch(sequense, 19));
