// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class SinglyLinkedList {
//   constructor(value) {
//     this.head = { value: value, next: null };
//     this.tail = this.head;
//     this.length = 1;
//   }

//   append(value) {
//     const newNode = new Node(value);
//     this.tail.next = newNode;
//     this.tail = newNode;
//     this.length++;
//     return this;
//   }

//   prepend(value) {
//     const newNode = new Node(value);
//     newNode.next = this.head;
//     this.head = newNode;
//     this.length++;
//     return this;
//   }

//   traverseToIndex(index) {
//     let counter = 0;
//     let currentNode = this.head;
//     while (index !== counter) {
//       currentNode = currentNode.next;
//       counter++;
//     }
//     return currentNode;
//   }
//   remove(index) {
//     const leaderNode = this.traverseToIndex(index - 1);
//     const unwantedNode = leaderNode.next;
//     leaderNode.next = unwantedNode.next;
//     this.length--;
//     return this;
//   }
//   insert(index, value) {
//     // あるnodeを間に入れる。
//     if (index >= this.length) {
//       return this.append(value);
//     }
//     const newNode = new Node(value);
//     const leaderNode = this.traverseToIndex(index - 1);
//     const savedNode = leaderNode.next;
//     leaderNode.next = newNode;
//     newNode.next = savedNode;
//     this.length++;
//     return this;
//   }

//   pop() {
//     // 要は、linked listの最後のnodeを消す。
//     const leaderNode = this.traverseToIndex(this.length - 2);
//     leaderNode.next = null;
//     this.tail = leaderNode;
//     this.length--;
//     return this;
//   } // 見本のpopよりも、こっちの方がシンプルだな。

//   shift() {
//     // 要は、linked listの最初のnodeを消す。
//     const newHeadNode = this.head.next;
//     this.head = newHeadNode;
//     this.length--;
//     return this;
//   } // まあ、シンプルに考えればいいわな。

//   reverse() {
//     let currentNode = this.head;
//     let previousNode = null;
//     let savedNextNode;
//     while (currentNode) {
//       savedNextNode = currentNode.next;
//       currentNode.next = previousNode;
//       // 次の準備。 今の自分を、過去のものとし、新しいものに引導を渡す物語が始まる。
//       previousNode = currentNode;
//       currentNode = savedNextNode;
//     }
//     this.tail = this.head;
//     this.head = previousNode;
//   }

//   clone() {}

//   printList() {
//     const list = [];
//     let currentNode = this.head;
//     while (currentNode) {
//       list.push(currentNode.value);
//       currentNode = currentNode.next;
//     }
//     // return list;
//     console.log(list);
//   }
// }

// const l = new SinglyLinkedList(2); // const arr = new Array()とやっていることは一緒よ。
// l.append(4);
// l.prepend(1);
// l.append(5);
// // l.remove(1);
// l.insert(2, 3);
// // l.printList();
// console.log(l);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 改めて、reference型の値の追っかけを見直そう。
class SLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    if (!this.length) {
      this.head = { value: value, next: null };
      this.tail = this.head;
      this.length++;
      return this;
    }
    const newNode = new Node(value);
    this.tail.next = newNode; // そう、これだけではいけない。
    this.tail = newNode; //この行がないと話にならないんですよ。
    this.length++;
    return this;
  }

  treverse(index) {
    let count = 0;
    let currentNode = this.head;
    while (count === index) {
      currentNode = currentNode.next;
      count++;
    }
    return this;
  }
  insert(value, index) {
    const newNode = new Node(value);
    let leaderNode = this.traverse(index - 1);
    let savedNode = leaderNode.next;
    leaderNode.next = newNode;
    newNode.next = savedNode;
    this.length++;
    return this;
  }

  reverse() {
    let currentNode = this.head;
    let previousNode = null;
    let savedNextNode;
    while (currentNode) {
      savedNextNode = currentNode.next;
      currentNode.next = previousNode;
      // 後半が始まる。
      previousNode = currentNode;
      currentNode = savedNextNode;
    }
  }
}

const ssl = new SLL();
ssl.append(1);
ssl.append(2);
ssl.append(3);
ssl.append(4);

console.dir(ssl, { depth: null });
