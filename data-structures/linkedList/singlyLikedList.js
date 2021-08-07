// // -------------------- linked list  -------------------- //
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(value) {
    // this.head = { value: value, next: null };
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
    //   const holdingPointer = this.tail.next;
    //   this.tail = newNode;
    //   newNode.next = holdingPointer; // この三行だと、headが変わってくれない。
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  remove(index) {
    //今あるlinked listの何番目を消したいか、でindexを入れる。問題はlast indexを消したい時だね。
    const leaderNode = this.traverseToIndex(index - 1);
    const unwantedNode = leaderNode.next;
    leaderNode.next = unwantedNode.next;
    this.length--;
    return this;
  }

  traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head;
    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }
  insert(index, value) {
    if (index >= this.length) {
      return this.append(value);
    }
    const newNode = new Node(value);
    const leaderNode = this.traverseToIndex(index - 1);
    const savedNode = leaderNode.next;
    leaderNode.next = newNode;
    newNode.next = savedNode;
    this.length++;
    return this;
  }

  search(value) {
    let currentNode = this.head;
    while (currentNode.value !== value) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
  } // もうちょっとだろうなー。

  reverse() {
    let currentNode = this.head;
    let previousNode = null;
    let savingNextNode;
    while (currentNode) {
      savingNextNode = currentNode.next;
      currentNode.next = previousNode;
      // 次の準備を始める。// 今の自分自身を、過去のものとしていく物語になる。
      previousNode = currentNode;
      currentNode = savingNextNode;
    }
    this.tail = this.head;
    this.head = previousNode;
  }

  pop() {
    const leaderNode = this.traverseToIndex(this.length - 2);
    leaderNode.next = null;
    this.tail = leaderNode;
    this.length--;
    return this;
  }

  shift() {
    const newHeadNode = this.head.next;
    this.head = newHeadNode;
    this.length--;
    return this;
  }

  copy() {
    let currentNode = this.head;
    const newNode = new Node(this.head.value);
    newNode.next = this.head.next;
    return this;
  } // また後で。

  sort() {}

  // pop() {
  //   let currentNode = this.head;
  //   let newTail;
  //   while (currentNode.next) {
  //     newTail = currentNode;
  //     currentNode = currentNode.next;
  //   }
  //   this.tail = newTail;
  //   this.tail.next = null;
  //   this.length--;
  //   return this;
  // }

  // shift() {
  //   const savingNextNode = this.head.next;
  //   this.head = savingNextNode;
  //   this.length--;
  //   return this;
  // }

  printList() {
    const array = [];
    let currentNode = this.head;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }
}

const sll1 = new SinglyLinkedList();
sll1.append(2);
sll1.append(4);
sll1.prepend(1);
// console.log(sll1);

const sll2 = new SinglyLinkedList();
sll2.append(3);
sll2.append(4);
sll2.append(5);
// console.log(sll2);

const addTwoNumbers = (sll1, sll2) => {
  // このlist1, list2として、sll1,sll2をいれていくことになる。
  const arrayOfSll1ToInteger = Number(sll1.printList().reverse().join('')); // space complexity
  const arrayOfSll2ToInteger = Number(sll2.printList().reverse().join('')); // space complexity
  const sum = arrayOfSll1ToInteger + arrayOfSll2ToInteger;
  const arrayOfSum = String(sum).split('').reverse();
  const sumLinkedList = new SinglyLinkedList();
  arrayOfSum.forEach((element) => {
    sumLinkedList.append(element);
  });
  return sumLinkedList;
}; // time complexity自体は、O(n)である。ただこの場合、memory complexityが結構多そうだな。

console.log(addTwoNumbers(sll1, sll2));

// const sll = new SinglyLinkedList(2);
// sll.append(4);
// sll.prepend(1);
// // sll.insert(2, 3);
// // sll.reverse();
// // sll.pop();
// // sll.remove(2);
// // sll.search(4);
// // console.log(sll.printList())
// console.log(sll);
// const sll2 = new SinglyLinkedList(3);
// sll2.append(4)
// sll2.append(5)
// console.log(sll2);

// ここleetcodeの書き方
// function ListNode(val, next) {
//   this.val = val === undefined ? 0 : val;
//   this.next = next === undefined ? null : next;
// }

// // なるほど。constructor()がなくても、instanceを作る事ができるんだな。
// // constructor()がないと、instanceは作れないかと思っていた。
// const node = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
// const node5 = new ListNode(5);
// node.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
// console.log(node);
// leetcodeでは、このlinked listを、配列の形で表してくれる、ってことね。
