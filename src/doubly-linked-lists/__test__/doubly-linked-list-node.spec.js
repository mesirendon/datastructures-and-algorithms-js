import { expect } from "chai";
import DoublyLinkedListNode from "../DoublyLinkedListNode";

describe('Doubly Linked List Node', () => {
  it('should create a linked list node with value', () => {
    const node = new DoublyLinkedListNode(5);

    expect(node.previous).to.be.null;
    expect(node.value).to.be.equal(5);
    expect(node.next).to.be.null;
  });

  it('should create a linked list node with object as a value', () => {
    const nodeValue = { value: 2, key: 'two' };
    const node = new DoublyLinkedListNode(nodeValue);

    expect(node.previous).to.be.null;
    expect(node.value).to.be.deep.equal(nodeValue);
    expect(node.next).to.be.null;
  });

  it('should link nodes toghether', () => {
    const node2 = new DoublyLinkedListNode(2);
    const node1 = new DoublyLinkedListNode(1, node2);
    const node3 = new DoublyLinkedListNode(3, node1, node2);

    expect(node1.next).not.to.be.undefined;
    expect(node1.previous).to.be.null;
    expect(node2.next).to.be.null;
    expect(node2.previous).to.be.null;
    expect(node3.next).not.to.be.undefined;
    expect(node3.previous).not.to.be.undefined;
    expect(node1.value).to.be.equal(1);
    expect(node1.next.value).to.be.equal(2);
    expect(node3.next.value).to.be.equal(1);
    expect(node3.previous.value).to.be.equal(2);
  });

  it('should convert node to string', () => {
    const node = new DoublyLinkedListNode(1);
    expect(node.toString()).to.be.equal('1');
    node.value = 'a new value';
    expect(node.toString()).to.be.equal('a new value');
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'one' };
    const node = new DoublyLinkedListNode(nodeValue);
    const stringifier = ({ value, key }) => `value: ${value}, key: ${key}`;

    expect(node.toString(stringifier)).to.be.equal('value: 1, key: one');
  });
});