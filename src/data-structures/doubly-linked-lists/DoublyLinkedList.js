import Comparator from '../../utils/comparator';
import DoublyLinkedListNode from './DoublyLinkedListNode';

export default class DoublyLinkedList {
  /**
   * Builds a Doubly Linked List with custom comparator function or
   * default comparator if none is provided.
   * @param {Function} customComparator Initialize this linked list
   * with a custom comparator function
   */
  constructor(customComparator = null) {
    /** @var DoublyLinkedListNode */
    this.head = null;

    /** @var DoublyLinkedListNode */
    this.tail = null;

    /** @var Number length of this linked list */
    this.length = 0;

    this.comparator = new Comparator(customComparator);
  }

  /**
   * Prepends a new value to this linked list.
   * @param {any} value The value to prepend to this list
   * @returns {DoublyLinkedList} This list
   */
  prepend(value) {
    const newNode = new DoublyLinkedListNode(value);
    this.length++;

    // If there is no head we must make the new node head and tail.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    // Attach the new node to the start of the linked list.
    this.head.previous = newNode;

    // The current head must be the next of the new head.
    newNode.next = this.head;

    // Update the head reference to be the new node.
    this.head = newNode;

    return this;
  }

  /**
   * Appends a new value to this linked list.
   * @param {any} value The value to append to this linked list
   * @returns {DoublyLinkedList} This linked list
   */
  append(value) {
    const newNode = new DoublyLinkedListNode(value);
    this.length++;

    // If there is no head we must make the new node head and tail.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    // Attach the new node to the end of the linked list.
    this.tail.next = newNode;

    // The current tail must be the previous of the new tail.
    newNode.previous = this.tail;

    // Update the tail reference to be the new node.
    this.tail = newNode;

    return this;
  }

  /**
   * Inserts a new node at the specified position. If the position is out
   * of boundaries, the insertion is performed either by prepending or
   * appending the node to this list.
   * @param {any} value Value to insert
   * @param {Number} rawIndex Position of insertion
   * @returns {DoublyLinkedList} This linked list
   */
  insert(value, rawIndex) {
    // We must ensure the index is in the right boundary
    const index = rawIndex < 0 ? 0 : rawIndex;

    // If index is 0, we should prepend the new node.
    if (index === 0) this.prepend(value);
    else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new DoublyLinkedListNode(value);

      // We find the position of insertion
      while (currentNode) {
        if (count === index) break;
        currentNode = currentNode.next;
        count++;
      }

      // If the node is found we perform the insertion
      if (currentNode) {
        this.length++;
        newNode.next = currentNode.next;
        newNode.previous = currentNode;
        currentNode.next = newNode;
      }

      // If we don't find the node, it means that we must append the new node.
      else this.append(value);
    }

    return this;
  }

  /**
   * Deletes this list head, updating the list and returning the
   * deleted node.
   * @returns {(DoublyLinkedListNode|null)} The deleted node
   */
  deleteHead() {
    // If the list is empty we return null.
    if (!this.head) return null;

    // We dettach the head.
    let deleted = this.head;

    // We update this list head.
    this.head = deleted.next;

    // We clean the new head previous to null.
    this.head.previous = null;

    // We clean the deleted node before returning it.
    deleted.next = null;

    // We update this list length
    this.length--;

    return deleted;
  }

  /**
   * Deletes this list tail, updating the list and returning the
   * deleted node.
   * @returns {(DoublyLinkedListNode|null)} The deleted node
   */
  deleteTail() {
    // If the list is empty we return null.
    if (!this.head) return null;

    // We dettach the tail.
    let deleted = this.tail;

    // We update this list tail.
    this.tail = deleted.previous;

    // We clean the new tail next to null.
    this.tail.next = null;

    // We clean the deleted node before returning it.
    deleted.previous = null;
    this.length--;

    return deleted;
  }

  /**
   * Deletes a node that matches with the value.
   * @param {any} value The value to delete
   * @returns {(DoublyLinkedListNode|null)} The deleted node
   */
  delete(value) {
    // If the list is empty we return null.
    if (!this.head) return null;

    // If the head has this value, we delete the head.
    if (this.comparator.equal(this.head.value, value)) return this.deleteHead();

    // If the tail has this value, we delete the tail.
    if (this.comparator.equal(this.tail.value, value)) return this.deleteTail();

    // We delete the first occurrence of the value.
    let currentNode = this.head;
    while (currentNode) {
      if (this.comparator.equal(currentNode.value, value)) {
        currentNode.previous.next = currentNode.next;
        currentNode.next.previous = currentNode.previous;
        currentNode.next = null;
        currentNode.previous = null;
        this.length--;
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Deletes all the nodes that match with the value and
   * returns one of those nodes.
   * @param {any} value The value to delete out of this list
   * @returns {(DoublyLinkedListNode|null)} The deleted node
   */
  deleteAll(value) {
    if (!this.head) return null;

    let deleted = null;
    while (this.comparator.equal(this.head.value, value))
      deleted = this.deleteHead();
    while (this.comparator.equal(this.tail.value, value))
      deleted = this.deleteTail();

    let currentNode = this.head;
    while (currentNode) {
      if (this.comparator.equal(currentNode.value, value)) {
        deleted = currentNode;
        currentNode.previous.next = deleted.next;
        currentNode.next.previous = deleted.previous;
        currentNode = deleted.next;
        deleted.next = null;
        deleted.previous = null;
        this.length--;
      }
      else currentNode = currentNode.next;
    }

    return deleted;
  }

  /**
   * Finds a node in this list either by direct value or
   * via a finder function in case the nodes are objects.
   * @example
   * let found = linkedList.find((value) => value.key === 'x');
   * @param {any} finder The value to look up for
   * @returns {(DoublyLinkedListNode|null)} The found node in this list
   */
  find(finder) {
    if (!this.head) return null;

    let currentNode = this.head;
    while (currentNode) {
      if (finder instanceof Function &&
        finder(currentNode.value) ||
        this.comparator.equal(currentNode.value, finder)) {
        let found = currentNode;
        found.next = null;
        found.previous = null;
        return found;
      }
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /**
   * Reverses this linked list.
   * @returns {DoublyLinkedList} This list but reversed
   */
  reverse() {
    // Create auxiliary sentinel nodes;
    let currentNode = this.head;
    let previousNode = null;
    let nextNode = null;

    while (currentNode) {
      // Let's store current node's previous and next
      // nodes references.
      nextNode = currentNode.next;
      previousNode = currentNode.previous;

      // Let's swap current's previous and next nodes
      // references.
      currentNode.next = previousNode;
      currentNode.previous = nextNode;

      // The previous is our current for next iteration.
      previousNode = currentNode;

      // Our current is next node for next iteration.
      currentNode = nextNode;
    }

    // We update references of head and tail sentinel nodes.
    this.tail = this.head;
    this.head = previousNode;

    return this;
  }

  /**
   * Appends values from an array to this linked list.
   * @param {any[]} array New values to append
   * @returns {DoublyLinkedList} This linked list
   */
  fromArray(array) {
    for (const e of array) {
      this.append(e);
    }

    return this;
  }

  /**
   * Returns an array of the nodes in this list.
   * @returns {DoublyLinkedListNode[]} This list's nodes as an array
   */
  toArray() {
    const array = [];
    let currentNode = this.head;
    while (currentNode) {
      array.push(currentNode);
      currentNode = currentNode.next;
    }
    return array;
  }

  /**
   * Represents this list as a string. If a custom stringifier
   * function is provided, the string will comply to that function
   * definition.
   * @param {Function} stringifier A custom stringifier function
   * @returns {String} This linked list string representation
   */
  toString(stringifier) {
    const nodes = this.toArray();
    return nodes
      .map((node) => node.toString(stringifier))
      .join('<=>');
  }
}