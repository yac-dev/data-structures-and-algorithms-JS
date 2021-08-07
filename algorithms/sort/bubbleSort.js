const sequence = [6, 9, 2, 4, 1];
// const bubbleSort = (array) => {
//   for (let i = 0; i < array.length; i++) {
//     for (let j = i + 1; j < array.length; j++) {
//       if (array[i] > array[j]) {
//         swap(array, i, j);
//       }
//     }
//   }
// }; // これでもいいけど、一般的な書き方はしただな。

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      // ここの、arrayのloopの範囲はかなり大切だね。少なくとも、これみたいに +1を使っている場合は、loopの範囲に神経質になる必要がある。roman to integerのエラーも、ここに原因があるんだろう。
      // andreiはj < array.lengthってしてたけど、厳密には、j < array.length - 1　の方がいい。確実に。array[4]とarray[5]を比較することになるが、array[5]なんてないからね。
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
};
const swap = (array, index1, index2) => {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

bubbleSort(sequence);
console.log(sequence);
