// -------------------- stack  -------------------- //
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(value) {
    this.last = { value: value, next: null };
    this.first = this.last;
    this.length = 1;
  }

  peek() {
    return this.last;
  }

  push(value) {
    const newNode = new Node(value);
    // const holdingPointer = this.top;
    // this.top = newNode;
    // this.top.next = holdingPointer
    newNode.next = this.last;
    this.last = newNode; // 上ではなくてこれでもいいはず。
    this.length++;
    return this;
  }

  pop() {
    if (this.last === this.first) {
      this.first = null;
    }
    this.last = this.last.next;
    this.length--;
    return this;
  }
}

const stack = new Stack(1);
stack.push(2);
stack.push(3);
stack.pop();
console.log(stack);
