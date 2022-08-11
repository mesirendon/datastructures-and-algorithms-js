import LinkedListNode from "./LinkedListNode.js";
import Comparator from '../utils/comparator';

export default class LinkedList {
  /**
   * Builds a linked list with custom comparator function or default comparator if none is given.
   * @param {Function} customComparator Initialize this linked list with a custom comparator function
   */
  constructor(customComparator = null) {
    /** @var LinkedListNode */
    this.head = null;

    /** @var LinkedListNode */
    this.tail = null;

    /** @var Number */
    this.size = 0;

    this.comparator = new Comparator(customComparator);
  }

  length() {
    return this.size;
  }

  /**
   * 
   * @param {any} value Value to append
   * @returns {LinkedList} This linked list
   */
  append(value) {
    const node = new LinkedListNode(value);
    this.size++;

    // The new node is the head if this list is empty
    if (!this.head) {
      this.head = node;
      this.tail = node;

      return this;
    }

    // Attach the new node to the end of the linked list
    this.tail.next = node;
    this.tail = node;

    return this;
  }

  /**
   * Prepends the given value to this linked list making it the new head.
   * @param {any} value The value to prepend to the list. New head.
   * @returns {LinkedList} This linked list
   */
  prepend(value) {
    // The new node has to be the head of this list no matter what
    const node = new LinkedListNode(value, this.head);
    this.head = node;

    // If there is no tail yet, we must have to create it
    if (!this.tail) {
      this.tail = node;
    }

    this.size++;

    return this;
  }

  /**
   * 
   * @param {any} value The value to insert in this linked list
   * @param {number} rawIndex The position where the value must be inserted at
   * @returns {LinkedList} This linked list
   */
  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex;

    if (index === 0) this.prepend(value);
    else {
      this.size++;
      let count = 1;
      let currentNode = this.head;
      const node = new LinkedListNode(value);
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count++;
      }
      if (currentNode) {
        node.next = currentNode.next;
        currentNode.next = node;
      }
      else {
        if (this.tail) {
          this.tail.next = node;
          this.tail = node;
        }
        else {
          this.head = node;
          this.tail = node;
        }
      }
    }

    return this;
  }

  /**
   * Deletes and returns the first node that match with the value out of this
   * linked list. Returns null if the linked list is empty.
   * @param {any} value Value to delete and return
   * @returns {(LinkedListNode|null)} The deleted node from this linked list
   */
  delete(value) {
    if (!this.head) return null;

    let deletedNode = null;
    let currentNode = this.head;

    if (this.head.value === value) {
      deletedNode = this.head;
      this.head = deletedNode.next;
      this.size--;
      return deletedNode;
    }

    while (currentNode.next) {
      if (this.comparator.equal(currentNode.next.value, value)) break;
      currentNode = currentNode.next;
    }

    deletedNode = currentNode.next;
    if (!deletedNode) return deletedNode;
    if (this.comparator.equal(deletedNode.value, this.tail.value)) this.tail = currentNode;
    currentNode.next = deletedNode.next;

    this.size--;

    return deletedNode;
  }

  /**
   * Deletes all the nodes that have the specified value out of this linked list.
   *
   * Returns a single deleted node, or null if the linked list is empty.
   *
   * @param {any} value Value to be deleted from this linked list
   * @returns {(LinkedList|null)} This linked list without nodes having the specified value
   */
  deleteAll(value) {
    if (!this.head) return null;

    let deletedNode = null;

    while (this.head && this.comparator.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = deletedNode.next;
      this.size--;
    }

    let currentNode = this.head;

    if (currentNode !== null)
      while (currentNode.next) {
        if (this.comparator.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = deletedNode.next;
          this.size--;
        }
        else {
          currentNode = currentNode.next;
        }
      }

    if (this.comparator.equal(this.tail.value, value)) this.tail = currentNode;

    return deletedNode;
  }

  /**
   * Deletes the tail, updating this linked list new tail and returning the deleted
   * node. Returns null if the linked list is empty.
   * @returns {(LinkedListNode|null)} The tail node of this linked list if it exists
   */
  deleteTail() {
    if (!this.head) return null;

    let deletedNode = null;

    if (!this.head.next) {
      deletedNode = this.head;
      this.head = null;
      this.tail = null;
      return deletedNode;
    }

    let currentNode = this.head;
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }

    deletedNode = currentNode.next;
    currentNode.next = null;
    this.tail = currentNode;
    this.size--;

    return deletedNode;
  }

  /**
   * Deletes this linked list head and returns it if it exists. Updates references to
   * new head and tail if applies.
   * @returns {(LinkedListNode|null)}
   */
  deleteHead() {
    if (!this.head) return null;

    let deletedNode = this.head;
    if (this.head === this.tail) this.tail = null;
    this.head = deletedNode.next;
    this.size--;
    return deletedNode;
  }

  /**
   * Finds a node by either its value or a custom search function.
   * Returns null if there is no matches for the given finding parameters.
   * @param {Object} findParams Finding object
   * @param {any} findParams.value Find by value
   * @param {Function} findParams.callback Find by function
   * @returns {(LinkedListNode|null)} Node that matches finding criteria
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) return null;

    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value))
        return currentNode;
      if (value !== undefined && this.comparator.equal(currentNode.value, value))
        return currentNode;
      currentNode = currentNode.next
    }

    return null;
  }

  /**
   * Populates this linked list from a given array.
   * @param {any[]} array Array to process
   */
  fromArray(array) {
    for (const e of array) {
      this.append(e);
    }
  }

  /**
   * Represent this linked list as an array of its nodes.
   * @returns {LinkedListNode[]} Array of nodes in this linked list
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes
  }

  /**
  * Reverse a linked list.
  * @returns {LinkedList}
  */
  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  /**
   * Returns a string representing this linked list separated by commas
   * @returns {string} This linked list string representation
   */
  toString(stringifierFn) {
    return this.toArray().map(n => n.toString(stringifierFn)).toString();
  }
}