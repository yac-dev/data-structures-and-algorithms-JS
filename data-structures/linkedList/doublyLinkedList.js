class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.head = { value: value, next: null, previous: null };
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);
    this.head.previous = newNode;
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
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
    const newNode = new Node(value);
    const leaderNode = this.traverseToIndex(index - 1);
    const temp = leaderNode.next;
    leaderNode.next = newNode;
    newNode.previous = leaderNode;
    newNode.next = temp;
    temp.previous = newNode;
    this.length++;
    return this;
  }
}

const doublyLinkedList = new DoublyLinkedList(2);
// doublyLinkedList.append(3);
doublyLinkedList.append(4);
doublyLinkedList.prepend(1);
doublyLinkedList.insert(2, 3);
console.log(doublyLinkedList);
