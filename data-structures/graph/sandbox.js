// class Graph {
//   // graphでは、hash tableを使う。
//   constructor() {
//     this.adjacentList = {};
//   }

//   addVertex(vertex) {
//     return (this.adjacentList[vertex] = []);
//   }

//   addEdge(vertex1, vertex2) {
//     this.adjacentList[vertex1].push(vertex2);
//     this.adjacentList[vertex2].push(vertex1);
//     return this;
//   }

//   // removeVertex(vertex) {
//   //   this.adjacentList[vertex].forEach((neighbor) => {
//   //     this.adjacentList[neighbor].filter((vertex) => vertex !== neighbor);
//   //   });
//   //   delete this.adjacentList[vertex];
//   //   return this;
//   // }
//   removeVertex(vertex) {
//     let neighbors = this.adjacentList[vertex];
//     for (let i = 0; i < neighbors.length; i++) {
//       let neighbor = neighbors[i];
//       this.adjacentList[neighbor] = this.adjacentList[neighbor].filter(
//         (element) => element !== vertex // {}でくくると、element !== vertexで返してくれないね。
//       );
//     }
//     delete this.adjacentList[vertex];
//     return this;
//   }

//   removeEdge(vertex1, vertex2) {
//     this.adjacentList[vertex1] = this.adjacentList[vertex1].filter(
//       (element) => element !== vertex2
//     );
//     this.adjacentList[vertex2] = this.adjacentList[vertex2].filter(
//       (element) => element !== vertex1
//     );
//     return this;
//   }

//   dfsI(startVertex) {
//     const movedList = [];
//     const confirmedList = {};
//     confirmedList[startVertex] = 'confirmed';
//     const stack = [startVertex];
//     let currentVertex;

//     while (stack.length) {
//       currentVertex = stack.pop();
//       movedList.push(currentVertex);
//       this.adjacentList[currentVertex].forEach((neighbor) => {
//         if (!confirmedList[neighbor]) {
//           confirmedList[neighbor] = 'confirmed';
//           stack.push(neighbor);
//         }
//       });
//     }
//     return movedList;
//   }

//   bfsI(startVertex) {
//     const movedList = [];
//     const confirmedList = {};
//     confirmedList[startVertex] = 'confirmed';
//     const queue = [startVertex];
//     let currentVertex;

//     while (queue.length) {
//       currentVertex = queue.shift();
//       movedList.push(currentVertex);
//       this.adjacentList[currentVertex].forEach((neighbor) => {
//         if (!confirmedList[neighbor]) {
//           confirmedList[neighbor] = 'confirmed';
//           queue.push(neighbor);
//         }
//       });
//     }

//     return movedList;
//   }

//   dfsR(startVertex) {
//     const movedList = [];
//     const confirmedList = {};
//     const adjacentList = this.adjacentList;

//     (function dfs(vertex) {
//       if (!adjacentList[vertex]) return;
//       confirmedList[vertex] = 'confirmed';
//       movedList.push(vertex);

//       adjacentList[vertex].forEach((neighbor) => {
//         if (!confirmedList[neighbor]) {
//           return dfs(neighbor);
//         }
//       });
//     })(startVertex);

//     return movedList;
//   }

//   bfsR(startVertex) {
//     const movedList = [];
//     const confirmedList = {};
//     const adjacentList = this.adjacentList;
//     const queue = [];

//     (function bfs(vertex) {
//       if (!adjacentList[vertex]) return;
//       confirmedList[vertex] = 'confirmed';
//       movedList.push(vertex);

//       adjacentList[vertex].forEach((neighbor) => {
//         if (!confirmedList[neighbor]) {
//           queue.push(neighbor);
//         }
//         return bfs(queue.shift());
//       });
//     })(startVertex);

//     return movedList;
//   }
// }

// // //          A
// // //        /   \
// // //       B     C
// // //       |     |
// // //       D --- E
// // //        \   /
// // //          F

// const g = new Graph();
// g.addVertex('A');
// g.addVertex('B');
// g.addVertex('C');
// g.addVertex('D');
// g.addVertex('E');
// g.addVertex('F');
// g.addEdge('A', 'B');
// g.addEdge('A', 'C');
// g.addEdge('B', 'D');
// g.addEdge('C', 'E');
// g.addEdge('D', 'E');
// g.addEdge('D', 'F');
// g.addEdge('E', 'F');
// // g.removeVertex('A');
// // g.removeEdge('B', 'D');
// // console.log(g.dfsI('A'));
// // console.log(g.dfsR('A'));
// console.log(g.bfsI('A'));
// // console.log(g.bfsR('A')); // あまり、graphにおけるbfsのrecursiveな実装はないかもな。

// // console.log(g);

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

// console.dir(wg, { depth: null });
