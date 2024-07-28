import { expect } from "chai";
import QueueNode from "../QueueNode.js";
import Queue from "../Queue.js";

describe("Queue", () => {
  describe("Node", () => {
    it("should create queue node with value", () => {
      const node = new QueueNode(1);

      expect(node.value).to.be.equal(1);
      expect(node.next).to.be.null;
    });
    it("should create a queue node with an object as a value", () => {
      const nodeValue = { amount: 34, key: "test" };
      const node = new QueueNode(nodeValue);

      expect(node.value.amount).to.be.equal(34);
      expect(node.value.key).to.be.equal("test");
      expect(node.next).to.be.null;
    });
    it("should link nodes together", () => {
      const node2 = new QueueNode(2);
      const node1 = new QueueNode(1, node2);

      expect(node1.next).not.to.be.undefined;
      expect(node2.next).to.be.null;
      expect(node1.value).to.be.equal(1);
      expect(node1.next.value).to.be.equal(2);
    });
    it("should convert node to string", () => {
      const node = new QueueNode(1);

      expect(node.toString()).to.be.equal("1");

      node.value = "string value";
      expect(node.toString()).to.be.equal("string value");
    });
    it("should convert node to string with custom stringifier", () => {
      const nodeValue = { value: 1, key: "test" };
      const node = new QueueNode(nodeValue);
      const toStringCallback = (v) => `value: ${v.value}, key: ${v.key}`;

      expect(node.toString(toStringCallback)).to.be.equal(
        "value: 1, key: test",
      );
    });
  });

  describe("Queue", () => {
    it("should create empty queue", () => {
      const queue = new Queue();

      expect(queue.toString()).to.be.empty;
    });
    it("should enqueue data to queue", () => {
      const queue = new Queue();

      expect(queue.head).to.be.null;
      expect(queue.tail).to.be.null;

      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.length()).to.be.equal(2);
      expect(queue.toString()).to.be.equal("1,2");
      expect(queue.tail.next).to.be.null;
    });
    it("should be possible to enqueue objects", () => {
      const queue = new Queue();

      queue.enqueue({ value: "test1", key: "key1" });
      queue.enqueue({ value: "test2", key: "key2" });

      const stringifier = (value) => `${value.key}:${value.value}`;

      expect(queue.toString(stringifier)).to.be.equal("key1:test1,key2:test2");
    });
    it("should peek data from queue", () => {
      const queue = new Queue();

      expect(queue.peek()).to.be.null;

      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.peek()).to.be.equal(1);
      expect(queue.peek()).to.be.equal(1);
    });
    it("should check if queue is empty", () => {
      const queue = new Queue();

      expect(queue.isEmpty()).to.be.true;

      queue.enqueue(1);

      expect(queue.isEmpty()).to.be.false;
    });
    it("should dequeue from queue in FIFO order", () => {
      const queue = new Queue();

      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.dequeue().value).to.be.equal(1);
      expect(queue.dequeue().value).to.be.equal(2);
      expect(queue.dequeue()).to.be.null;
      expect(queue.isEmpty()).to.be.true;
    });
    it("should be possible to enqueue/dequeue objects", () => {
      const queue = new Queue();

      queue.enqueue({ value: "test1", key: "key1" });
      queue.enqueue({ value: "test2", key: "key2" });

      const stringifier = (value) => `${value.key}:${value.value}`;

      expect(queue.toString(stringifier)).to.be.equal("key1:test1,key2:test2");
      expect(queue.dequeue().value.value).to.be.equal("test1");
      expect(queue.dequeue().value.value).to.be.equal("test2");
    });
  });
});
