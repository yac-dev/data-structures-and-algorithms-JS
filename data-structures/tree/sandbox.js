// class Node {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// } //最初nodeを作る時は、こんな形になる。

class BST {
  constructor(value) {
    // value : nullでみようか次は。
    this.root = { value: null, left: null, right: null };
  }

  insert(value) {
    if (!this.root.value) {
      this.root.value = value;
      return this;
    }
    const newNode = new Node(value);
    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = newNode;
          return this;
        }
      } else {
        if (value > currentNode.value) {
          if (currentNode.right) {
            currentNode = currentNode.right;
          } else {
            currentNode.right = newNode;
            return this;
          }
        }
      }
    }
  }

  search(value) {
    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        return this;
      }
    }
  }

  bfsI() {
    const movedList = [];
    const stack = [this.root];
    let currentNode;

    while (stack.length) {
      currentNode = stack.shift();
      movedList.push(currentNode.value);
      if (currentNode.left) stack.push(currentNode.left);
      if (currentNode.right) stack.push(currentNode.right);
    }
    return movedList;
  }

  dfsPreOrder() {
    let list = [];
    (function traverse(node) {
      list.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    })(this.root);
    return list;
  }

  invert() {
    let currentNode;
    const queue = [this.root];
    let temp;

    while (queue.length) {
      currentNode = queue.shift();
      temp = currentNode.right; // nullでも全然可！むしろ、nullはなきゃだめでしょ！！
      currentNode.right = currentNode.left;
      currentNode.left = temp;
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return this;
  }

  // invert() {
  //   let currentNode;
  //   const stack = [this.root];
  //   let temp;
  //   while (stack.length) {
  //     currentNode = stack.shift();
  //     temp = currentNode.right;
  //     currentNode.right = currentNode.left;
  //     currentNode.left = temp;
  //     if (currentNode.left) stack.push(currentNode.left);
  //     if (currentNode.right) stack.push(currentNode.right);
  //   }
  //   return this;
  // }
}

const bst = new BST();
bst.insert(23);
bst.insert(67);
bst.insert(32);
bst.insert(12);
bst.insert(9);
bst.insert(19);
bst.invert();
// console.log(bst.dfsPreOrder());
console.log(bst);

// 極端に簡単に考えれば、こういう実装の仕方もある。実際、leetcodeでは完全にこれ。
// const node1 = new Node(14);
// const node2 = new Node(43);
// const node3 = new Node(21);

// node1.left = node2;
// node1.right = node3;

// console.log(node1);
// // console.log(node1);
// // console.log(node2);
// // console.log(node3);

// class BinaryHeap {
//   constructor() {
//     this.values = [];
//   }

//   insert(value) {
//     this.values.push(value);
//     this.bubbleUp();
//   }
//   bubbleUp() {
//     let addedIndex = this.values.length - 1;
//     let addedValue = this.values[addedIndex];
//     while (addedIndex > 0) {
//       let parentIndex = Math.floor((addedIndex - 1) / 2);
//       let parentValue = this.values[parentIndex];
//       if (addedValue < parentValue) {
//         return;
//       } else {
//         this.values[parentIndex] = addedValue;
//         this.values[addedIndex] = parentValue;
//         addedIndex = parentIndex;
//       }
//     }
//     return this;
//   }
//   // このように、insertは結構大変。

//   extractMax() {
//     const maxValue = this.values[0]; // このやり方、上手ね。すごい。
//     this.values[0] = this.values.pop();
//     this.bubbleDown();
//     return maxValue;
//   }
//   bubbleDown() {
//     let droppingIndex = 0;
//     let droppingValue = this.values[droppingIndex];

//     while (true) {
//       let leftChildIndex = 2 * droppingIndex + 1;
//       let rightChildIndex = 2 * droppingIndex + 2;
//       let leftChildValue, rightChildValue;
//       let tempIndex;

//       if (leftChildIndex < this.values.length) {
//         leftChildValue = this.values[leftChildIndex];
//         if (leftChildValue > droppingValue) tempIndex = leftChildIndex;
//       }

//       if (rightChildIndex < this.values.length) {
//         rightChildValue = this.values[rightChildIndex];
//         if (
//           (!tempIndex && rightChildValue > droppingValue) ||
//           (tempIndex && leftChildValue < rightChildValue)
//         ) {
//           tempIndex = rightChildIndex;
//         }
//       }

//       // ここまできてもtempInexがないなら、あなたをそこに認めます。
//       if (!tempIndex) return;
//       this.values[droppingIndex] = this.values[tempIndex];
//       this.values[tempIndex] = droppingValue;
//       droppingIndex = tempIndex;
//     }
//   }
// }

// const bh = new BinaryHeap();
// bh.insert(100);
// bh.insert(89);
// bh.insert(78);
// bh.insert(63);
// bh.insert(76);
// bh.insert(45);
// bh.insert(92);
// bh.extractMax();
// console.log(bh);
