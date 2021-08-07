// -------------------- queue  -------------------- //
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    this.first = { value: value, next: null };
    this.last = this.first;
    this.length = 1;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const newNode = new Node(value);
    this.last.next = newNode;
    this.last = newNode;
    this.length++;
    return this;
  }

  dequeue() {
    // const holdingPointer = this.first.next;別にholdingPointはいらないね。
    if (this.first === this.last) {
      this.last === null;
    }
    this.first = this.first.next;
    this.length--;
    return this;
  }
}

const queue = new Queue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
console.log(queue);
