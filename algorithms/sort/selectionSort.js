const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let index = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[index]) {
        index = j;
      }
    }
    swap(array, index, i);
  }
};

selectionSort(sequense);
console.log(sequense);

// これで一応動くけど、なんでlet index = 0にしておくとダメだったんだろう？？
// indexを０で固定すると、最初に一番小さいのを持ってきて、iの2巡目で何もできなくなるぞ。1順目で一番小さいのを一番左に持ってきたら、次は2つめから始めないと。
