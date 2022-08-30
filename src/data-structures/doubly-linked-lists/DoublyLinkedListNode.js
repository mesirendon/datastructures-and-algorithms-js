export default class DoublyLinkedListNode {
  /**
   * Creates a Doubly Linked List Node
   * @param {any} value
   * @param {DoublyLinkedListNode} next
   * @param {DoublyLinkedListNode} previous 
   */
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  /**
   * Returns a string representation of this node.
   * 
   * If no stringifier function is defined, the representation
   * is a string of this node's value.
   * 
   * Stringifier example:
   * @example
   * const node = new DoublyLinkedListNode({value: 2, key: 'one'});
   * const stringifier = ({value, key}) => `Key: ${key} | Value: ${value}`;
   * console.log(node.toString(stringifier));
   * @param {Function} stringifier
   * @returns {String}
   */
  toString(stringifier = null) {
    return stringifier
      ? stringifier(this.value)
      : `${this.value}`;
  }
}