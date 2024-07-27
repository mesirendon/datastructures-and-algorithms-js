export default class QueueNode {
  /**
   *
   * @param {any} value Queue Node Value
   * @param {QueueNode} next Next Queue node
   */
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
