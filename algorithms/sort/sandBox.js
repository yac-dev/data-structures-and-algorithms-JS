const sequense = [3, 7, 1, 5, 2, 9, 13, 19, 14];

const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
};

// bubbleSort(sequense);
// console.log(sequense);

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[i] < array[j]) {
        swap(array, i, j);
      }
    }
  }
};

// insertionSort(sequense);
// console.log(sequense);

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let index = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[index]) {
        index = j;
      }
    }
    swap(array, i, index);
  }
};

// selectionSort(sequense);
// console.log(sequense);

// mergeSort

// quickSort
