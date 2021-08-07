const sequence = [7, 4, 9, 1, 3, 5, 6];

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[i]) {
        swap(array, i, j);
      }
    }
  }
};

const swap = (array, index1, index2) => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

insertionSort(sequence);
console.log(sequence);
