class Graph {
  // graphでは、hash tableを使う。
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

  // removeVertex(vertex) {
  //   this.adjacentList[vertex].forEach((neighbor) => {
  //     this.adjacentList[neighbor].filter((vertex) => vertex !== neighbor);
  //   });
  //   delete this.adjacentList[vertex];
  //   return this;
  // }
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
      (element) => element !== vertex2
    );
    this.adjacentList[vertex2] = this.adjacentList[vertex2].filter(
      (element) => element !== vertex1
    );
    return this;
  }

  dfsI(startVertex) {
    const movedList = [];
    const confirmedList = {};
    confirmedList[startVertex] = 'confirmed';
    const stack = [startVertex];
    let currentVertex;

    while (stack.length) {
      currentVertex = stack.pop();
      movedList.push(currentVertex);
      this.adjacentList[currentVertex].forEach((neighbor) => {
        if (!confirmedList[neighbor]) {
          confirmedList[neighbor] = 'confirmed';
          stack.push(neighbor);
        }
      });
    }
    return movedList;
  }

  bfsI(startVertex) {
    const movedList = [];
    const confirmedList = {};
    confirmedList[startVertex] = 'confirmed';
    const queue = [startVertex];
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.shift();
      movedList.push(currentVertex);
      this.adjacentList[currentVertex].forEach((neighbor) => {
        if (!confirmedList[neighbor]) {
          confirmedList[neighbor] = 'confirmed';
          queue.push(neighbor);
        }
      });
    }

    return movedList;
  }

  dfsR(startVertex) {
    const movedList = [];
    const confirmedList = {};
    const adjacentList = this.adjacentList;

    (function dfs(vertex) {
      if (!adjacentList[vertex]) return;
      confirmedList[vertex] = 'confirmed';
      movedList.push(vertex);

      adjacentList[vertex].forEach((neighbor) => {
        if (!confirmedList[neighbor]) {
          return dfs(neighbor);
        }
      });
    })(startVertex);

    return movedList;
  }

  bfsR(startVertex) {
    const movedList = [];
    const confirmedList = {};
    const adjacentList = this.adjacentList;
    const queue = [];

    (function bfs(vertex) {
      if (!adjacentList[vertex]) return;
      confirmedList[vertex] = 'confirmed';
      movedList.push(vertex);

      adjacentList[vertex].forEach((neighbor) => {
        if (!confirmedList[neighbor]) {
          queue.push(neighbor);
        }
        return bfs(queue.shift());
      });
    })(startVertex);

    return movedList;
  }
}

// //          A
// //        /   \
// //       B     C
// //       |     |
// //       D --- E
// //        \   /
// //          F

const g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');
// g.removeVertex('A');
// g.removeEdge('B', 'D');
// console.log(g.dfsI('A'));
// console.log(g.dfsR('A'));
console.log(g.bfsI('A'));
// console.log(g.bfsR('A')); // あまり、graphにおけるbfsのrecursiveな実装はないかもな。

// console.log(g);
