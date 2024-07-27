import { expect } from "chai";
import QueueNode from "../QueueNode.js";

describe("Queue", () => {
  describe("Node", () => {
    it("should create queue node with value", () => {
      const node = new QueueNode(1);

      expect(node.value).to.be.eq(1);
      expect(node.next).to.be.null;
    });
    it("should create a queue node with an object as a value", () => {
      const nodeValue = { amount: 34, key: "test" };
      const node = new QueueNode(nodeValue);

      expect(node.value.amount).to.be.eq(34);
      expect(node.value.key).to.be.eq("test");
      expect(node.next).to.be.null;
    });
  });
  //   it("should create empty queue", () => {
  //     const queue = new Queue();
  //     expect(queue).not.toBeNull();
  //     expect(queue.linkedList).not.toBeNull();
  //   });

  //   it("should enqueue data to queue", () => {
  //     const queue = new Queue();

  //     queue.enqueue(1);
  //     queue.enqueue(2);

  //     expect(queue.toString()).toBe("1,2");
  //   });

  //   it("should be possible to enqueue/dequeue objects", () => {
  //     const queue = new Queue();

  //     queue.enqueue({ value: "test1", key: "key1" });
  //     queue.enqueue({ value: "test2", key: "key2" });

  //     const stringifier = (value) => `${value.key}:${value.value}`;

  //     expect(queue.toString(stringifier)).toBe("key1:test1,key2:test2");
  //     expect(queue.dequeue().value).toBe("test1");
  //     expect(queue.dequeue().value).toBe("test2");
  //   });

  //   it("should peek data from queue", () => {
  //     const queue = new Queue();

  //     expect(queue.peek()).toBeNull();

  //     queue.enqueue(1);
  //     queue.enqueue(2);

  //     expect(queue.peek()).toBe(1);
  //     expect(queue.peek()).toBe(1);
  //   });

  //   it("should check if queue is empty", () => {
  //     const queue = new Queue();

  //     expect(queue.isEmpty()).toBe(true);

  //     queue.enqueue(1);

  //     expect(queue.isEmpty()).toBe(false);
  //   });

  //   it("should dequeue from queue in FIFO order", () => {
  //     const queue = new Queue();

  //     queue.enqueue(1);
  //     queue.enqueue(2);

  //     expect(queue.dequeue()).toBe(1);
  //     expect(queue.dequeue()).toBe(2);
  //     expect(queue.dequeue()).toBeNull();
  //     expect(queue.isEmpty()).toBe(true);
  //   });
});
