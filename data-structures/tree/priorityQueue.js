class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
  } // priority queueの場合は、新しいデータのvalueでbubble upなどを決めるのではなく、priorityの値でheapのdata structureを作る
  bubbleUp() {
    let addedAtIndex = this.values.length - 1;
    const addedValue = this.values[addedAtIndex];
    while (addedAtIndex > 0) {
      let parentIndex = Math.floor((addedAtIndex - 1) / 2);
      let parent = this.values[parentIndex];
      if (addedValue.priority <= parent.priority) return; // coltはbreakにしている。
      this.values[parentIndex] = addedValue;
      this.values[addedAtIndex] = parent;
      addedAtIndex = parentIndex;
    }
  }

  dequeue() {
    const maxValue = this.values[0];
    const lastValue = this.values.pop();
    this.values[0] = lastValue; // [33, 39, 41, 18, 27, 12] edge case
    this.bubbleDown();
    return maxValue; // 最終的に配列を返したい場合は最初の変数宣言は不要。
  } // [33, 39, 41, 18, 27, 12]
  bubbleDown() {
    let index = 0;
    while (true) {
      let leftChildIndex = 2 * index + 1; // だから、このindexってのは基本、parentのindexを指し示している。
      let rightChildIndex = 2 * index + 2;
      // let leftChild = this.values[leftChildIndex] // これはできない。this.valuesの外になってしまう可能性があるから。
      let leftChildValue, rightChildValue;
      let tempIndex;

      if (leftChildIndex < this.values.length) {
        leftChildValue = this.values[leftChildIndex];
        if (leftChildValue.priority > this.values[0].priority) {
          tempIndex = leftChildIndex;
        }
      }
      if (rightChildIndex < this.values.length) {
        rightChildValue = this.values[rightChildIndex];
        if (
          (tempIndex && rightChildValue.priority > leftChildValue.priority) ||
          (!tempIndex && rightChildValue.priority > this.values[0].priority)
        ) {
          tempIndex = rightChildIndex;
        }
      }
      if (!tempIndex) return; // coltはbreakってやっている。
      this.values[index] = this.values[tempIndex];
      this.values[tempIndex] = this.values[0];
      index = tempIndex;
    }
  }
}

// valuesの各データはnodeで、valueとpriorityの値をもつ。
// 遊んでみよう。coltの例の様に、病院が患者の病気リストを作っているとして、それぞれの病気に関してpriorityをつけているとしよう。

const pq = new PriorityQueue();
pq.enqueue('president', 20);
pq.enqueue('sales', 12);
pq.enqueue('accountant', 14);
pq.enqueue('marketing', 8);
pq.enqueue('software engineer', 15);
pq.enqueue('vice president', 17);
pq.enqueue('human resourse', 6);
pq.enqueue('analyst', 16);
pq.enqueue('data scientist', 16);
// pq.dequeue();
console.log(pq);
