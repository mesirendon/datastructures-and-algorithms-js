import StackNode from "./StackNode.js";

export default class Stack {
  /**
   * Builds a stack
   */
  constructor() {
    /** @var StackNode */
    this.head = null;

    /** @var Number */
    this.size = 0;
  }

  /**
   * Pushes a new Stack Node into this stack.
   * @param {any} value Value to push
   * @returns {Stack} This stack
   */
  push(value) {
    const node = new StackNode(value, this.head);
    this.head = node;
    this.size++;
    return this;
  }

  /**
   * Pops out the Stack Node at the top of this stack.
   * @returns {(StackNode|null)}
   */
  pop() {
    if (!this.head) return null;

    const poppedNode = this.head;
    this.head = this.head.next;
    poppedNode.next = null;
    this.size--;

    return poppedNode.value;
  }

  /**
   * This stack's size
   * @returns {Number}
   */
  length() {
    return this.size;
  }

  /**
   * Returns the value of this stack's head
   * @returns {any}
   */
  peek() {
    if (!this.head) return null;
    return this.head.value;
  }

  /**
   * Determines if this stack is empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this.head === null;
  }

  /**
   * Represents this stack as an array of either its nodes or nodes values
   * @param {boolean} value false for getting the node instead
   * @returns {(StackNode|any)}
   */
  toArray(value = true) {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      var v = currentNode;
      if (value) v = currentNode.value;
      nodes.push(v);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * Returns a string representation of this stack nodes separated by commas.
   * @param {function} stringifierFn Custom stringifier function
   * @returns {string}
   */
  toString(stringifierFn) {
    if (!this.head) return "";

    return this.toArray(false)
      .map((n) => n.toString(stringifierFn))
      .toString();
  }
}
