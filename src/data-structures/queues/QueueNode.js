export default class QueueNode {
  /**
   * Builds a Queue Node
   * @param {any} value Queue Node Value
   * @param {QueueNode} next Next Queue node
   */
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  /**
   *  Returns a string representation of this node.
   * 
   * Could be specified through a function.
   * @param {function} customFn  Custom stringifier
   * @returns {string} This node string representation
   */
  toString(customFn = null) {
    return customFn ? customFn(this.value) : `${this.value}`;
  }
}
