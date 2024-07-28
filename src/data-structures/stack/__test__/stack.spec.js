import { expect } from "chai";
import StackNode from "../StackNode.js";
import Stack from "../Stack.js";

describe("Stack", () => {
  describe("Node", () => {
    it("should create a stack node with value", () => {
      const node = new StackNode(3);

      expect(node.value).to.be.equal(3);
      expect(node.next).to.be.null;
    });
    it("should create a stack node with an object as a value", () => {
      const nodeValue = { amount: 23, key: "test" };
      const node = new StackNode(nodeValue);

      expect(node.value.amount).to.be.equal(23);
      expect(node.value.key).to.be.equal("test");
      expect(node.next).to.be.null;
    });
    it("should link nodes together", () => {
      const node2 = new StackNode(2);
      const node1 = new StackNode(1, node2);

      expect(node1.next).not.to.be.undefined;
      expect(node2.next).to.be.null;
      expect(node1.value).to.be.equal(1);
      expect(node1.next.value).to.be.equal(2);
    });
    it("should convert node to string", () => {
      const node = new StackNode(1);

      expect(node.toString()).to.be.equal("1");

      node.value = "string value";
      expect(node.toString()).to.be.equal("string value");
    });
    it("should convert node to string with custom stringifier", () => {
      const nodeValue = { value: 23, key: "test" };
      const node = new StackNode(nodeValue);
      const toStringCallback = (v) => `value: ${v.value}, key: ${v.key}`;

      expect(node.toString(toStringCallback)).to.be.equal(
        "value: 23, key: test",
      );
    });
  });

  describe("Stack", () => {
    it("should create an empty stack", () => {
      const stack = new Stack();

      expect(stack).not.to.be.null;
      expect(stack.toString()).to.be.empty;
    });
    it("should stack data to stack", () => {
      const stack = new Stack();

      stack.push(1);
      stack.push(2);

      expect(stack.toString()).to.be.equal("2,1");
    });
    it("should peek data from stack", () => {
      const stack = new Stack();

      expect(stack.peek()).to.be.null;

      stack.push(1);
      stack.push(2);

      expect(stack.peek()).to.be.equal(2);
      expect(stack.peek()).to.be.equal(2);
    });
    it("should check if stack is empty", () => {
      const stack = new Stack();

      expect(stack.isEmpty()).to.be.true;

      stack.push(1);

      expect(stack.isEmpty()).to.be.false;
    });
    it("should pop data from stack", () => {
      const stack = new Stack();

      stack.push(1);
      stack.push(2);

      expect(stack.pop()).to.be.equal(2);
      expect(stack.pop()).to.be.equal(1);
      expect(stack.pop()).to.be.null;
      expect(stack.isEmpty()).to.be.true;
    });
    it("should be possible to push/pop objects", () => {
      const stack = new Stack();

      stack.push({ value: "test1", key: "key1" });
      stack.push({ value: "test2", key: "key2" });

      const stringifier = (value) => `${value.key}:${value.value}`;

      expect(stack.toString(stringifier)).to.be.equal("key2:test2,key1:test1");
      expect(stack.pop().value).to.be.equal("test2");
      expect(stack.pop().value).to.be.equal("test1");
    });
    it("should be possible to convert stack to array", () => {
      const stack = new Stack();

      expect(stack.peek()).to.be.null;

      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.toArray()).to.include.members([3, 2, 1]);
    });
    it("should tell the stack size", () => {
      const stack = new Stack();

      expect(stack.length()).to.be.equal(0);

      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.length()).to.be.equal(3);

      stack.pop();

      expect(stack.length()).to.be.equal(2);
    });
  });
});
