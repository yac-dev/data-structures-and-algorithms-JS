class BinaryHeap {
  constructor() {
    this.values = [];
  }

  // そうか。とりあえずまず、valueをpushするのか。まずね。そのpushされたものをいじっていく感じだ。
  insert(value) {
    this.values.push(value);
    this.bubbleUp();
  }
  bubbleUp() {
    let addedIndex = this.values.length - 1;
    let addedValue = this.values[addedIndex];
    while (addedIndex > 0) {
      let parentIndex = Math.floor((addedIndex - 1) / 2);
      let parentValue = this.values[parentIndex];
      if (addedValue <= parentValue) return;
      this.values[parentIndex] = addedValue;
      this.values[addedIndex] = parentValue;
      addedIndex = parentIndex;
    }
    return this;
  }

  extractMax() {
    // maxをretrievして、binary heapを再度作る。maxだけ取得しろ、って一行だけで終わるからね。
    const maxValue = this.values[0];
    this.values[0] = this.values.pop();
    // とりあえずます、binary heapにおいて一番後ろの要素を一番先頭に持ってくる。とりあえずまず、な。
    this.bubbleDown();
    return maxValue;
  }
  bubbleDown() {
    let droppingIndex = 0;
    const droppingValue = this.values[droppingIndex];
    while (true) {
      let leftChildIndex = 2 * droppingIndex + 1;
      let rightChildIndex = 2 * droppingIndex + 2;
      let leftChildValue, rightChildValue;
      let tempIndex;

      if (leftChildIndex < this.values.length) {
        // 要は、index自体はbubbleDownしていく。そのbubbleDwonしている、indexの子indexが配列の外にならないんだったら、以下の処理をするってこと。
        leftChildValue = this.values[leftChildIndex];
        if (leftChildValue > droppingValue) tempIndex = leftChildIndex;
      }
      if (rightChildIndex < this.values.length) {
        rightChildValue = this.values[rightChildIndex];
        if (
          (!tempIndex && rightChildValue > droppingValue) ||
          (tempIndex && rightChildValue > leftChildValue)
        )
          tempIndex = rightChildIndex;
      }
      if (!tempIndex) return; // breakも可。

      this.values[droppingIndex] = this.values[tempIndex];
      this.values[tempIndex] = droppingValue;
      droppingIndex = tempIndex;
    }
    // return this; // ここでreturnすると、consoleにはundefinedってなったね。その理由は、最後while文をbreakで抜けたからである。
  }
}

const heap = new BinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
heap.insert(13);
heap.insert(17);
heap.insert(26);
heap.insert(24);
console.log(heap.extractMax());
console.log(heap);

//                     55
//                   /    \
//                 39       41
//               /   \     /   \
//             18    27   12     33
//           /   \  /  \ /  \   /  \
//          13  17 26  24

// const heap = new BinaryHeap();
// heap.insert(41);
// heap.insert(39);
// heap.insert(33);
// heap.insert(18);
// heap.insert(27);
// heap.insert(12);
// heap.insert(55);
// // console.log(heap.extractMax());
// console.log(heap);

//            55
//           /  \
//         39    41
//        /  \  /  \
//       18  27 12  33
