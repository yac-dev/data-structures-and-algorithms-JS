const sequense = [3, 7, 1, 5, 2, 9, 13, 19, 14];

const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};
