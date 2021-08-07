// // -------------------- binary search tree  -------------------- //
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(value) {
    this.root = { value: value, left: null, right: null };
  }

  insert(value) {
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
        if (currentNode.right) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = newNode;
          return this;
        }
      }
    }
  }

  search(value) {
    let currentNode = this.root;
    while (true) {
      // utilsを参考にすれば、ここはwhile(current)ではなく、while(true)でもいい事がわかる。
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        return currentNode;
      }
    }
  }

  // 別のファイルのgraphとの根本的な違いは、各nodeが片道の方向を持っているかいないか。
  // graphの場合は、そもそも各vertexにpointerの概念がが一切ない。「自分の子供はこれとこれ」、っていうpointerが。ただただ、各vertexが「僕のお隣さんはこの人たちです」っていう風に言っているだけな。

  // 俺が実装しているgraphは。「各vertex(node)がpointerを持っていない、片道の方向をもっていない」。だから、moveの度にconfirmedListにお隣vertexを記さなくちゃいけなかった。

  // しかし、今回のbstは各nodeが片道の方向を持っている。自分の子供はこれとこれ、という具合で。一度行ったことのある場所に再び訪れることはない。だから、bfsと言えどconfirmedListは必要ない。そういうことになる。

  bfsI() {
    let movedList = [];
    let queue = [this.root];
    let currentNode;

    while (queue.length) {
      currentNode = queue.shift();
      movedList.push(currentNode.value);
      // graphと違い、confirmする必要はない。
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return movedList;
  } // ここをif elseで実装してはいけない理由が分かるね。

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
    //これでいいかもな。。。
    let currentNode;
    const queue = [this.root];
    let temp;
    while (queue.length) {
      currentNode = queue.shift();
      temp = currentNode.right;
      currentNode.right = currentNode.left;
      currentNode.left = temp;
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return this;
  }

  // // これ、よくない例。
  // invert() {
  //   let currentNode;
  //   const stack = [this.root];
  //   let temp;
  //   // あー。これ、if文でもしleft、rightにnodeがあるなら、ってやるのよくないわ。要は、left, rightがnullでもちゃんと反映させないといけない。
  //   while (stack.length) {
  //     currentNode = stack.pop();
  //     if (currentNode.left) {
  //       stack.push(currentNode.left);
  //       temp = currentNode.left;
  //     }
  //     if (currentNode.right) {
  //       stack.push(currentNode.right);
  //       currentNode.left = currentNode.right;
  //     }
  //     currentNode.right = temp;
  //   }
  //   return this;
  // }

  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //We have a match, get to work!

        //Option 1: No right child:
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            //if parent > current value, make current left child a child of parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;

              //if parent < current value, make left child a right child of parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }

          //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          } else {
            //if parent > current, make right child of the left the parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;

              //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }

          //Option 3: Right child that has a left child
        } else {
          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }

          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }
}

const binarySearchTree = new BinarySearchTree(20);
binarySearchTree.insert(15);
binarySearchTree.insert(30);
binarySearchTree.insert(17);
binarySearchTree.insert(32);
binarySearchTree.insert(13);
binarySearchTree.invert();
console.log(binarySearchTree);

// traversePreOrder(node, visitList) {
//   visitList.push(node.value);
//   if (node.left) {
//     traversePreOrder(node.left, visitList);
//   }
//   if (node.right) {
//     traversePreOrder(node.right, visitList);
//   }
//   return visitList;
// }
// DFTPreOrder() {
//   // return traversePreOrder(this.root, []);
//   let currentNode = this.root;
//   let visitList = [];
//   visitList.push(currentNode.value);
//   if (currentNode.left) {
//     currentNode = currentNode.left;
//     this.DFTPreOrder();
//   }
//   if (currentNode.right) {
//     currentNode = currentNode.right;
//     this.DFTPreOrder();
//   }
//   return visitList;
// }

// ---------------------- dfsの冗長な書き方 ---------------------- //
// preOrder(node, list) {
//   list.push(node.value);
//   if (node.left) {
//     this.preOrder(node.left, list);
//   }
//   if (node.right) {
//     this.preOrder(node.right, list);
//   }
//   return list;
// }
// depthFirstPreOrder() {
//   return this.preOrder(this.root, []);
// }

// inOrder(node, list) {
//   if (node.left) {
//     this.inOrder(node.left, list);
//   }
//   list.push(node.value);
//   if (node.right) {
//     this.inOrder(node.right, list);
//   }
//   return list;
// }
// depthFirstInOrder() {
//   return this.inOrder(this.root, []);
// }

// postOrder(node, list) {
//   if (node.left) {
//     this.postOrder(node.left, list);
//   }
//   if (node.right) {
//     this.postOrder(node.right, list);
//   }
//   list.push(node.value);
//   return list;
// }
// depthFirstPostOrder() {
//   return this.postOrder(this.root, []);
// }
