// ---------------------- 冗長な書き方 ---------------------- //
// function quickSort(array, startIndex, endIndex) {
//   if (startIndex >= endIndex) return; // base case

//   let pivotIndex = endIndex; // ここのendIndexにpartitionIndex - 1が入る。
//   let partitionIndex = partition(array, pivotIndex, startIndex, endIndex);
//   quickSort(array, startIndex, partitionIndex - 1);
//   quickSort(array, partitionIndex + 1, endIndex);

//   return array;
// }

// function partition(array, pivotIndex, startIndex, endIndex) {
//   let pivotValue = array[pivotIndex];
//   let partitionIndex = startIndex;

//   for (let i = startIndex; i < endIndex; i++) {
//     if (array[i] < pivotValue) {
//       swap(array, i, partitionIndex);
//       partitionIndex++;
//     }
//   }
//   swap(array, endIndex, partitionIndex);
//   return partitionIndex;
// }

// function swap(array, firstIndex, secondIndex) {
//   let temp = array[firstIndex];
//   array[firstIndex] = array[secondIndex];
//   array[secondIndex] = temp;
// }
// const numbers = [7842, 7883, 7134, 7891, 7315, 7849];
// quickSort(numbers, 0, numbers.length - 1);
// console.log(numbers);

// ---------------------- 無駄のない書き方 ---------------------- //
// const quickSort = (array, startIndex, endIndex) => {
//   if (startIndex >= endIndex) return;
//   let partitionIndex = partition(array, startIndex, endIndex);
//   quickSort(array, startIndex, partitionIndex - 1);
//   quickSort(array, partitionIndex + 1, endIndex);
//   return array;
// };

// const partition = (array, startIndex, endIndex) => {
//   let pivotValue = array[endIndex];
//   let partitionIndex = startIndex;
//   for (let i = startIndex; i < endIndex; i++) {
//     if (array[i] < pivotValue) {
//       swap(array, i, partitionIndex);
//       partitionIndex++;
//     }
//   }
//   swap(array, partitionIndex, endIndex);
//   return partitionIndex;
// };

// const swap = (array, firstIndex, secondIndex) => {
//   let temp = array[firstIndex];
//   array[firstIndex] = array[secondIndex];
//   array[secondIndex] = temp;
// };

// ---------------------- さらに無駄のない書き方 ---------------------- //
const quickSort = (array, startIndex, endIndex) => {
  if (startIndex >= endIndex) return array; // return;でも同じことをする。
  let partitionIndex = solvePartitionIndex(array, startIndex, endIndex);
  quickSort(array, startIndex, partitionIndex - 1); // 先に先頭をsortして、その後に後ろもsortする、っていう順序か。
  quickSort(array, partitionIndex + 1, endIndex);
  return array;
};

const solvePartitionIndex = (array, startIndex, endIndex) => {
  let partitionIndex = startIndex;
  for (let i = startIndex; i < endIndex; i++) {
    if (array[i] < array[endIndex]) {
      swap(array, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(array, partitionIndex, endIndex);
  return partitionIndex;
};

const swap = (array, index1, index2) => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

const numbers = [7842, 7883, 7134, 7891, 7315, 7849];
quickSort(numbers, 0, numbers.length - 1);
console.log(numbers);
