// graphファイルでやっていた通り、基本はundirectedなgraphで考える。そこにweightの情報をのせていくこととする。
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
}

const wg = new WeightedGraph();
wg.addVertex('A');
wg.addVertex('B');
wg.addVertex('C');
wg.addEdge('A', 'B', 20);
wg.addEdge('B', 'C', 10);
wg.addEdge('A', 'C', 15);

// console.dirが一番いいかも。JSONやらnode module使うのはめんどいや。
console.dir(wg, { depth: null });
