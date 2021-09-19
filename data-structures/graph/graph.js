// // -------------------- graph -------------------- //
// command + shift + L;
class Graph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(vertex) {
    return (this.adjacentList[vertex] = []);
  }

  addEdge(vertex1, vertex2) {
    this.adjacentList[vertex1].push(vertex2);
    this.adjacentList[vertex2].push(vertex1);
    return this;
  }

  removeVertex(vertex) {
    let neighbors = this.adjacentList[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      this.adjacentList[neighbor] = this.adjacentList[neighbor].filter(
        (element) => element !== vertex // {}でくくると、element !== vertexで返してくれないね。
      );
    }
    delete this.adjacentList[vertex];
    return this;
  }

  removeEdge(vertex1, vertex2) {
    this.adjacentList[vertex1] = this.adjacentList[vertex1].filter(
      (vertex) => vertex !== vertex2
    );
    this.adjacentList[vertex2] = this.adjacentList[vertex2].filter(
      (vertex) => vertex !== vertex1
    );
    return this;
  }

  dfsR(startVertex) {
    const result = [];
    const visitedList = {};
    const adjacentList = this.adjacentList;

    (function dfs(vertex) {
      if (!adjacentList[vertex]) return;
      visitedList[vertex] = true;
      result.push(vertex);

      adjacentList[vertex].forEach((neighbor) => {
        if (!visitedList[neighbor]) {
          return dfs(neighbor);
        }
      });
    })(startVertex);
    return result;
  }

  dfsI(startVertex) {
    const movedList = [];
    const confirmedList = {};
    confirmedList[startVertex] = true;
    const stack = [startVertex];
    let currentVertex;

    while (stack.length) {
      currentVertex = stack.pop();
      movedList.push(currentVertex);
      this.adjacentList[currentVertex].forEach((neighbor) => {
        if (!confirmedList[neighbor]) {
          confirmedList[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return movedList;
  }

  bfsI(startVertex) {
    const result = [];
    const visitedList = {};
    const queue = [startVertex];
    let currentVertex;

    visitedList[startVertex] = true;
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacentList[currentVertex].forEach((neighbor) => {
        if (!visitedList[neighbor]) {
          queue.push(neighbor);
          visitedList[neighbor] = true;
        }
      });
    }
    return result;
  }

  //bfsのrecursiveな実装ってできないかもな。dfsはどんどん前にいけるが。。。
}

// //          A
// //        /   \
// //       B     C
// //       |     |
// //       D --- E
// //        \   /
// //          F

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('E', 'C');
graph.addEdge('F', 'E');
graph.addEdge('F', 'D');
graph.addEdge('D', 'E');
// graph.removeVertex('A');
// graph.removeEdge('A', 'B');
console.log(graph.dfsI('A'));

// ---------------------------- original ---------------------------- //
// class Graph {
//   constructor() {
//     this.adjacentList = {};
//   }

//   addVertex(vertex) {
//     // functionの終わりは、できるだけreturn してな。
//     if (!this.adjacentList[vertex]) {
//       this.adjacentList[vertex] = [];
//     }
//     return this;
//   }

//   addEdge(vertex1, vertex2) {
//     this.adjacentList[vertex1].push(vertex2);
//     this.adjacentList[vertex2].push(vertex1);
//     return this;
//   }

//   removeVertex(vertex) {
//     let neighbors = this.adjacentList[vertex];
//     for (let i = 0; i < neighbors.length; i++) {
//       let neighbor = neighbors[i];
//       this.adjacentList[neighbor] = this.adjacentList[neighbor].filter(
//         (e) => e !== vertex
//       );
//     }
//     delete this.adjacentList[vertex];
//     return this;
//   }

//   reomveEdge(vertex1, vertex2) {
//     // filterは、returnの条件に一致しない要素だけを残すメソッド。
//     this.adjacentList[vertex1] = this.adjacentList[vertex1].filter(
//       (vertex) => vertex !== vertex2
//     );
//     this.adjacentList[vertex2] = this.adjacentList[vertex2].filter(
//       (vertex) => vertex !== vertex1
//     );
//     return this;
//   }

//   depthFirst1(startVertex) {
//     const movedList = [];
//     const confirmedList = {};
//     const adjacentList = this.adjacentList;

//     (function dfs(vertex) {
//       //       if (!adjacentList[vertex]) return;
//       confirmedList[vertex] = true;
//       movedList.push(vertex);
//       adjacentList[vertex].forEach((neighbor) => {
//         if (!visitedList[neighbor]) {
//           return dfs(neighbor); // return 必要か？？？
//         }
//       });
//     })(startVertex);

//     return result;
//   } //これをIIFEではなく書ける様にしたいんだよなー。。。

//   depthFirst2(startVertex) {
//     const result = [];
//     const visitedList = {};
//     const stack = [startVertex];
//     let currentVertex;

//     visitedList[startVertex] = true;
//     while (stack.length) {
//       currentVertex = stack.pop();
//       result.push(currentVertex);

//       this.adjacentList[currentVertex].forEach((neighbor) => {
//         if (!visitedList[neighbor]) {
//           visitedList[neighbor] = true;
//           stack.push(neighbor);
//         }
//       });
//     }
//     return result;
//   }

//   breadthFirst(startVertex) {
//     const result = [];
//     const visitedList = {};
//     let queue = [startVertex];
//     let currentVertex;

//     visitedList[startVertex] = true;
//     while (queue.length) {
//       currentVertex = queue.shift();
//       result.push(currentVertex);

//       this.adjacentList[currentVertex].forEach((neighbor) => {
//         if (!visitedList[neighbor]) {
//           visitedList[neighbor] = true;
//           queue.push(neighbor);
//         }
//       });
//     }
//     return result;
//   }

//   // removeVertex(vertex) {
//   //   while (this.adjacentList[vertex].length) {
//   //     const adjacentVertex = this.adjacentList[vertex].pop();
//   //     this.reomveEdge(vertex, adjacentVertex);
//   //   }
//   //   delete this.adjacentList[vertex];
//   //   return this;
//   // }

//   // removeEdge(vertex1, vertex2) {
//   //   let x = this.adjacentList[vertex1];
//   //   let y = this.adjacentList[vertex2];
//   //   x.splice(x.indexOf(vertex2), 1);
//   //   y.splice(y.indexOf(vertex1), 1);
//   //   return this;
//   // }
// }
