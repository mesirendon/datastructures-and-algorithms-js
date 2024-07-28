import QueueNode from "./QueueNode.js";

export default class Queue {
  /**
   * Builds a queue
   */
  constructor() {
    /** @var QueueNode */
    this.head = null;

    /** @var QueueNode */
    this.tail = null;

    /** @var Number */
    this.size = 0;
  }

  /**
   * This queue's size
   * @returns {Number} This queue's size
   */
  length() {
    return this.size;
  }

  /**
   * Appends a new node to this queue.
   * @param {any} value Value to append
   * @returns {Queue} This queue
   */
  enqueue(value) {
    const node = new QueueNode(value);
    this.size++;

    // The new node is the head if this list is empty
    if (!this.head) {
      this.head = node;
      this.tail = node;

      return this;
    }

    // Attach the new node to the end of the queue
    this.tail.next = node;
    this.tail = node;

    return this;
  }

  /**
   * Deletes this queue head and returns it if it exists.
   * Updates references to the new head and tail if applies.
   * @returns {(QueueNode|null)}
   */
  dequeue() {
    if (!this.head) return null;

    let deletedNode = this.head;
    if (this.head === this.tail) this.tail = null;
    this.head = this.head.next;
    this.size--;

    return deletedNode;
  }

  /**
   * Returns the value of this queue head
   * @returns {any} This queue head's value
   */
  peek() {
    if (!this.head) return null;

    return this.head.value;
  }

  /**
   * Determines if this queue is empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this.head == null;
  }

  /**
   * Represents this queue as an array of its nodes.
   * @returns {QueueNode[]} Array of nodes in this queue
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * Returns a string representing this queue separated by commas.
   * @param {Function} stringifierFn Custom stringifier function
   * @returns {string} This queue string representation
   */
  toString(stringifierFn) {
    return this.toArray()
      .map((n) => n.toString(stringifierFn))
      .toString();
  }
}
