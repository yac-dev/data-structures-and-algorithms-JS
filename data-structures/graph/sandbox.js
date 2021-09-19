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

class WeightedGraph {
  constructor() {
    this.adjacentList = {};
  }
  addVertex(vertex) {
    this.adjacentList[vertex] = [];
    return this;
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacentList[vertex1].push({ vertex: vertex2, weight: weight });
    this.adjacentList[vertex2].push({ vertex: vertex1, weight: weight });
    return this;
  }

  Dijkstra(startVertex, finishVertex) {
    // まだだなー。dijkstraは。
  }
}

const wg = new WeightedGraph();
wg.addVertex('A');
wg.addVertex('B');
wg.addVertex('C');
wg.addVertex('D');
wg.addVertex('E');

wg.addEdge('A', 'B', 2);
wg.addEdge('A', 'D', 5);
wg.addEdge('A', 'E', 6);
wg.addEdge('B', 'C', 1);
wg.addEdge('C', 'D', 1);
wg.addEdge('E', 'D', 1);
// console.log(wg.Dijkstra('A', 'C'));
// console.dir(wg, { depth: null });

class Graph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(vertex) {
    this.adjacentList[vertex] = [];
    return this;
  }
  addEdge(vertex1, vertex2) {
    this.adjacentList[vertex1].push(vertex2);
    this.adjacentList[vertex2].push(vertex1);
    return this;
  }
  removeVertex(vertex) {
    const neighbors = this.adjacentList[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      this.adjacentList[neighbor] = this.adjacentList[neighbor].filter(
        (element) => element !== vertex
      );
    }
    delete this.adjacentList[vertex];
    return this;
  }
  removeEdge(vertex1, vertex2) {
    this.adjacentList[vertex1] = this.adjacentList[vertex1].filter(
      (element) => element !== vertex2
    );
    this.adjacentList[vertex2] = this.adjacentList[vertex2].filter(
      (element) => element !== vertex1
    );
    return this;
  }

  dfsI(startVertex) {
    const visitedList = [];
    const confirmedList = {};
    confirmedList[startVertex] = 'COnfirmed!';
    const stack = [startVertex];

    while (stack.length) {}
  }
}

const g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('A', 'E');
g.addEdge('C', 'D');
g.addEdge('B', 'D');
g.addEdge('E', 'D');
// g.removeEdge('A', 'B');
// g.removeVertex('A');
console.dir(g, { depth: null });
