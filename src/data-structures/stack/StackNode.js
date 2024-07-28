export default class StackNode {
  /**
   * Builds a Stack Node
   * @param {any} value Stack Node Value
   * @param {StackNode} next Next Stack Node
   */
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  /**
   * Returns a string representation of this node.
   *
   * Could be specified through a function.
   * @param {function} customFn Custom stringifier
   * @returns {string} This node string representation
   */
  toString(customFn = null) {
    return customFn ? customFn(this.value) : `${this.value}`;
  }
}
