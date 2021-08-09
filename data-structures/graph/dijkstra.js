class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

// このpriority queueは、min binary heapを元に作られている。不等号をひっくり返している。
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
      if (addedValue.priority >= parent.priority) return; // coltはbreakにしている。 ここを、<=にすれば、max binary heap型、>=にすれば、Min binary heap型になる。
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
    let droppingIndex = 0;
    const droppingValue = this.values[droppingIndex];
    while (true) {
      let leftChildIndex = 2 * droppingIndex + 1; // だから、このindexってのは基本、parentのindexを指し示している。
      let rightChildIndex = 2 * droppingIndex + 2;
      // let leftChild = this.values[leftChildIndex] // これはできない。this.valuesの外になってしまう可能性があるから。
      let leftChildValue, rightChildValue;
      let tempIndex;

      if (leftChildIndex < this.values.length) {
        leftChildValue = this.values[leftChildIndex];
        if (leftChildValue.priority < droppingValue.priority) {
          tempIndex = leftChildIndex;
        }
      }
      if (rightChildIndex < this.values.length) {
        rightChildValue = this.values[rightChildIndex];
        if (
          (tempIndex && rightChildValue.priority < leftChildValue.priority) ||
          (!tempIndex && rightChildValue.priority < droppingValue.priority)
        ) {
          tempIndex = rightChildIndex;
        }
      }
      if (!tempIndex) return; // coltはbreakってやっている。
      this.values[droppingIndex] = this.values[tempIndex];
      this.values[tempIndex] = droppingValue;
      droppingIndex = tempIndex;
    }
  }
}

// wgファイルでやっていた通り、基本はundirectedなwgで考える。そこにweightの情報をのせていくこととする。
class WeightedGraph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(vertex) {
    if (!this.adjacentList[vertex]) this.adjacentList[vertex] = [];
    return this;
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacentList[vertex1].push({ vertex: vertex2, weight: weight });
    this.adjacentList[vertex2].push({ vertex: vertex1, weight: weight });
    return this;
  }

  Dijkstra(start, finish) {
    // weighted graphはadjacentListを既に持っている。そこに対して、priority queueのinstanceを使う。
    const nodes = new PriorityQueue();
    const distances = {}; // distancesは、coltがやってた、一番メインの表のやつのこと。
    const previous = {};
    let path = [];
    let smallest;

    // adjacentList自体は、
    for (let vertex in this.adjacentList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // as long as there si something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().value;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
    }
    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor in this.adjacentList[smallest]) {
      }
    }
  }
}

var wg = new WeightedGraph();
wg.addVertex('A');
wg.addVertex('B');
wg.addVertex('C');
wg.addVertex('D');
wg.addVertex('E');
wg.addVertex('F');

wg.addEdge('A', 'B', 4);
wg.addEdge('A', 'C', 2);
wg.addEdge('B', 'E', 3);
wg.addEdge('C', 'D', 2);
wg.addEdge('C', 'F', 4);
wg.addEdge('D', 'E', 3);
wg.addEdge('D', 'F', 1);
wg.addEdge('E', 'F', 1);

// console.dirが一番いいかも。JSONのstringifyやらnode module使うのはめんどい。
console.dir(wg, { depth: null });
