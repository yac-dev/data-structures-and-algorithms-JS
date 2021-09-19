// * Definition for a binary tree node.
// 正直、このleetcodeの書き方はかなり端折っている。
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const node1 = new TreeNode(8);
const node2 = new TreeNode(10);
const node3 = new TreeNode(11);
const node4 = new TreeNode(18);

node1.left = node2;
node1.right = node3;
node2.right = node4;

console.dir(node1, { depth: null });
// 出力結果
// TreeNode {
//   val: 8,
//   left: TreeNode {
//     val: 10,
//     left: TreeNode { val: 18, left: null, right: null },
//     right: null
//   },
//   right: TreeNode { val: 11, left: null, right: null }
// }

// これを、配列でvalueだけをprintする。ただ、leetcodeみたく、nullの部分をひょうじさせて、leafの部分に関しては無視する。みたいなことはできん。。。 そこは、leetcodeがなんかやってくれることとしよう。
const printList = (root) => {
  let printList = [];
  let queue = [];
  let currentNode;
  queue.push(root);

  while (queue.length) {
    currentNode = queue.shift();
    printList.push(currentNode.val);
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    // } else {
    //   printList.push(null);
    // }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
    // } else {
    //   printList.push(null);
    // }
  }

  return printList;
};

console.log(printList(node1));
// [ 8, 10, 11, 18 ]
