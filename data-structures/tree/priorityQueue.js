// こっちの書き方の方が、simpleでimageしやすい
class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  swap(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  insert(value, priority) {
    const newNode = new Node(value, priority);
    this.nodes.push(newNode);
    this.bubbleUp(); // bubbleの中にあるthis、こういうときは働いてくれるんだな。
    return this;
  }
  bubbleUp() {
    let addedNodeIndex = this.nodes.length - 1;
    let addedNode = this.nodes[addedNodeIndex];
    while (addedNodeIndex > 0) {
      let parentNodeIndex = Math.floor((addedNodeIndex - 1) / 2);
      let parentNode = this.nodes[parentNodeIndex];
      if (addedNode.priority > parentNode.priority) return;
      this.swap(this.nodes, parentNodeIndex, addedNodeIndex);
      addedNodeIndex = parentNodeIndex; // swapしたら、addedのindexにparentのindexを上書きしていく
      // this.nodes[parentNodeIndex] = addedNode;
      // this.nodes[addedNodeIndex] = parentNode;
    }
  }

  extractMinNode() {
    const minPriorityNode = this.nodes[0];
    const lastNode = this.nodes.pop();
    if (this.nodes.length > 0) {
      this.nodes[0] = lastNode;
      this.bubbleDown();
    }
    return minPriorityNode;
  }
  bubbleDown() {
    let droppingNodeIndex = 0;
    let droppingNode = this.nodes[droppingNodeIndex];
    while (true) {
      let leftChildNodeIndex = 2 * droppingNodeIndex + 1;
      let rightChildNodeIndex = 2 * droppingNodeIndex + 2;
      let leftChildNode, rightChildNode;
      let tempIndex;

      if (leftChildNodeIndex < this.nodes.length) {
        leftChildNode = this.nodes[leftChildNodeIndex];
        if (leftChildNode.priority < droppingNode.priority) {
          tempIndex = leftChildNodeIndex;
        }
      }

      if (rightChildNodeIndex < this.nodes.length) {
        rightChildNode = this.nodes[rightChildNodeIndex];
        if (
          (tempIndex && rightChildNode.priority < leftChildNode.priority) ||
          (!tempIndex && rightChildNode.priority < droppingNode.priority)
        ) {
          tempIndex = rightChildNodeIndex;
        }
      }

      if (!tempIndex) return; // 結局、ここまでの流れでやっているのは、droppingnodeはleft child right childのうち、どっちと交換するか、それを決めている。少なくとも、bubbleupのときはchidが親と交換するだけだったんで、面倒臭い比較はなかったけど。
      this.swap(this.nodes, droppingNodeIndex, tempIndex); // swapしたら、droppingのindexにそのchildのindexを上書きして行く。
      droppingNodeIndex = tempIndex;
      // this.nodes[droppingNodeIndex] = this.nodes[tempIndex];
      // this.nodes[tempIndex] = droppingNode;
    }
  }
}

const pq = new PriorityQueue();
pq.insert('yosuke', 4);
pq.insert('yosuke', 9);
pq.insert('yosuke', 13);
pq.insert('yosuke', 8);
pq.insert('yosuke', 24);
pq.insert('yosuke', 15);
console.dir(pq.extractMinNode(), { depth: null });
console.dir(pq, { depth: null });

// --------------------- 冗長な書き方 --------------------- //
// class Node {
//   constructor(value, priority) {
//     this.value = value;
//     this.priority = priority;
//   }
// }

// // このpriority queueは、min binary heapを元に作られている。不等号をひっくり返している。
// class PriorityQueue {
//   constructor() {
//     this.values = [];
//   }

//   enqueue(value, priority) {
//     const newNode = new Node(value, priority);
//     this.values.push(newNode);
//     this.bubbleUp();
//   } // priority queueの場合は、新しいデータのvalueでbubble upなどを決めるのではなく、priorityの値でheapのdata structureを作る
//   bubbleUp() {
//     let addedAtIndex = this.values.length - 1;
//     const addedValue = this.values[addedAtIndex];
//     while (addedAtIndex > 0) {
//       let parentIndex = Math.floor((addedAtIndex - 1) / 2);
//       let parent = this.values[parentIndex];
//       if (addedValue.priority >= parent.priority) return; // coltはbreakにしている。 ここを、<=にすれば、max binary heap型、>=にすれば、Min binary heap型になる。
//       this.values[parentIndex] = addedValue;
//       this.values[addedAtIndex] = parent;
//       addedAtIndex = parentIndex;
//     }
//   }

//   dequeue() {
//     const maxValue = this.values[0];
//     const lastValue = this.values.pop();
//     this.values[0] = lastValue; // [33, 39, 41, 18, 27, 12] edge case
//     this.bubbleDown();
//     return maxValue; // 最終的に配列を返したい場合は最初の変数宣言は不要。
//   } // [33, 39, 41, 18, 27, 12]
//   bubbleDown() {
//     let droppingIndex = 0;
//     const droppingValue = this.values[droppingIndex];
//     while (true) {
//       let leftChildIndex = 2 * droppingIndex + 1; // だから、このindexってのは基本、parentのindexを指し示している。
//       let rightChildIndex = 2 * droppingIndex + 2;
//       // let leftChild = this.values[leftChildIndex] // これはできない。this.valuesの外になってしまう可能性があるから。
//       let leftChildValue, rightChildValue;
//       let tempIndex;

//       if (leftChildIndex < this.values.length) {
//         leftChildValue = this.values[leftChildIndex];
//         if (leftChildValue.priority < droppingValue.priority) {
//           tempIndex = leftChildIndex;
//         }
//       }
//       if (rightChildIndex < this.values.length) {
//         rightChildValue = this.values[rightChildIndex];
//         if (
//           (tempIndex && rightChildValue.priority < leftChildValue.priority) ||
//           (!tempIndex && rightChildValue.priority < droppingValue.priority)
//         ) {
//           tempIndex = rightChildIndex;
//         }
//       }
//       if (!tempIndex) return; // coltはbreakってやっている。
//       this.values[droppingIndex] = this.values[tempIndex];
//       this.values[tempIndex] = droppingValue;
//       droppingIndex = tempIndex;
//     }
//   }
// }

// // valuesの各データはnodeで、valueとpriorityの値をもつ。
// // 遊んでみよう。coltの例の様に、病院が患者の病気リストを作っているとして、それぞれの病気に関してpriorityをつけているとしよう。

// const pq = new PriorityQueue();
// pq.enqueue('president', 20);
// pq.enqueue('sales', 12);
// pq.enqueue('accountant', 14);
// pq.enqueue('marketing', 8);
// pq.enqueue('software engineer', 15);
// pq.enqueue('vice president', 17);
// pq.enqueue('human resourse', 6);
// pq.enqueue('analyst', 16);
// // pq.enqueue('A', 4);
// // pq.enqueue('A', 2);
// // pq.enqueue('A', 3);
// // pq.enqueue('A', 5);
// // pq.enqueue('A', 1);
// // pq.dequeue();
// console.log(pq.dequeue());
// console.log(pq);

// console.dir(wg, { depth: null });

// // simpleなpriority queue。まあ、こういうやり方もある、程度に。
// class PriorityQueue {
//   constructor() {
//     this.values = [];
//   }
//   enqueue(val, priority) {
//     this.values.push({ val, priority });
//     this.sort();
//   }
//   dequeue() {
//     return this.values.shift();
//   }
//   sort() {
//     this.values.sort((a, b) => a.priority - b.priority);
//   } // このsort method自体は、ascending orderでarrayの要素を並べ替える、ってうだけよ。
// }
