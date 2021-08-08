// 上手く応用できるもんだな。
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(value) {
    this.root = { value: value, left: null, right: null };
  }

  addAtRoot(leftOrRight, value) {
    if (leftOrRight === 'left') {
      this.root.left = new Node(value);
    }
    if (leftOrRight === 'right') {
      this.root.right = new Node(value);
    }
    return this;
  }

  bfs(parentValue) {
    // const movedList = [];
    const queue = [this.root];
    let currentNode;
    while (queue.length) {
      currentNode = queue.shift();
      if (currentNode.left) {
        if (currentNode.left.value === parentValue) return currentNode.left;
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        if (currentNode.right.value === parentValue) return currentNode.right;
        queue.push(currentNode.right);
      }
    }
  }
  insert(parentValue, leftOrRight, value) {
    const parentNode = this.bfs(parentValue);
    parentNode[leftOrRight] = new Node(value);
    return this;
  }
}

const binaryTree = new BinaryTree(10);
binaryTree.addAtRoot('right', 20);
binaryTree.addAtRoot('left', 30);
binaryTree.insert(20, 'left', 40);
binaryTree.insert(20, 'right', 50);
binaryTree.insert(50, 'left', 60);
binaryTree.insert(30, 'right', 100);
console.log(binaryTree);

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const node = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);

node.left = node2;
node.right = node3;
console.log(node);
