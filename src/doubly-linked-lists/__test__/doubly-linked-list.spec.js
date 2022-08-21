import { expect } from "chai";
import DoublyLinkedList from '../DoublyLinkedList';
import DoublyLinkedListNode from "../DoublyLinkedListNode";

describe('Doubly Linked List', () => {
  it('should create an empty doubly linked list', () => {
    const linkedList = new DoublyLinkedList();
    expect(linkedList.head).to.be.null;
    expect(linkedList.tail).to.be.null;
    expect(linkedList.toString()).to.be.equal('');
  });

  it('should append a node to the linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList
      .append(1)
      .append(2);

    expect(linkedList.head.next.value).to.be.equal(2);
    expect(linkedList.tail.previous.value).to.be.equal(1);
    expect(linkedList.toString()).to.be.equal('1<=>2');
  });

  it('should prepend a node to the linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.prepend(2);
    expect(linkedList.head.value).to.be.equal(2);
    expect(linkedList.tail.value).to.be.equal(2);

    linkedList
      .append(1)
      .prepend(3);

    expect(linkedList.head.next.next.previous).to.be.equal(linkedList.head.next);
    expect(linkedList.tail.previous.next).to.be.equal(linkedList.tail);
    expect(linkedList.tail.previous.value).to.be.equal(2);
    expect(linkedList.toString()).to.be.equal('3<=>2<=>1');
  });

  it('should append several nodes out of an array', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);
    expect(linkedList.toString()).to.be.equal('1<=>1<=>2<=>3<=>3<=>3<=>4<=>5');
    linkedList.fromArray([7, 21]);
    expect(linkedList.toString()).to.be.equal('1<=>1<=>2<=>3<=>3<=>3<=>4<=>5<=>7<=>21');
  });

  it('should get an array of nodes from the linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);
    const nodes = linkedList.toArray();
    expect(nodes.length).to.be.equal(linkedList.length);
    expect(nodes[0].value).to.be.equal(1);
    expect(nodes[nodes.length - 1].value).to.be.equal(5);
  });

  it('should insert nodes by index in the linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList
      .fromArray([1, 3, 5, 7, 9])
      .insert(0, -10)
      .insert(2, 2)
      .insert(6, 5)
      .insert(4, 4)
      .insert(8, 8)
      .insert(10, 1000);
    expect(linkedList.length).to.be.equal(11);
    expect(linkedList.toString()).to.be.equal('0<=>1<=>2<=>3<=>4<=>5<=>6<=>7<=>8<=>9<=>10')
  });

  it('should delete the head', () => {
    const linkedList = new DoublyLinkedList();

    let deleted = linkedList.deleteHead();
    expect(deleted).to.be.null;
    expect(linkedList.length).to.be.equal(0);

    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    deleted = linkedList.deleteHead();
    expect(deleted.value).to.be.equal(1);
    expect(deleted.next).to.be.null;
    expect(linkedList.length).to.be.equal(7);
  });

  it('should delete the tail', () => {
    const linkedList = new DoublyLinkedList();

    let deleted = linkedList.deleteTail();
    expect(deleted).to.be.null;
    expect(linkedList.length).to.be.equal(0);

    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    deleted = linkedList.deleteTail();
    expect(deleted.value).to.be.equal(5);
    expect(deleted.next).to.be.null;
    expect(linkedList.length).to.be.equal(7);
  });

  it('should delete a node by its value', () => {
    const linkedList = new DoublyLinkedList();

    let deleted = linkedList.delete(5);

    expect(deleted).to.be.null;

    linkedList
      .fromArray([1, 3, 5, 7, 9]);
    expect(linkedList.toString()).to.be.equal('1<=>3<=>5<=>7<=>9');

    deleted = linkedList.delete(5);
    expect(deleted.value).to.be.equal(5);
    expect(linkedList.toString()).to.be.equal('1<=>3<=>7<=>9');

    deleted = linkedList.delete(5);
    expect(deleted).to.be.null;

    deleted = linkedList.delete(1);
    expect(deleted.value).to.be.equal(1);
    expect(linkedList.toString()).to.be.equal('3<=>7<=>9');
    expect(linkedList.length).to.be.equal(3);

    deleted = linkedList.delete(9);
    expect(deleted.value).to.be.equal(9);
    expect(linkedList.toString()).to.be.equal('3<=>7');
    expect(linkedList.length).to.be.equal(2);
  });

  it('should delete all nodes by its value', () => {
    const linkedList = new DoublyLinkedList();
    let deleted = linkedList.deleteAll(3);
    expect(deleted).to.be.null;

    linkedList.fromArray([1, 1, 5, 2, 3, 1, 3, 3, 4, 5, 5]);

    deleted = linkedList.deleteAll(8);
    expect(deleted).to.be.null;

    deleted = linkedList.deleteAll(3);
    expect(linkedList.toString()).to.be.equal('1<=>1<=>5<=>2<=>1<=>4<=>5<=>5')
    expect(deleted.value).to.be.equal(3);

    deleted = linkedList.deleteAll(1);
    expect(deleted.value).to.be.equal(1);
    expect(linkedList.toString()).to.be.equal('5<=>2<=>4<=>5<=>5');

    deleted = linkedList.deleteAll(5);
    expect(deleted.value).to.be.equal(5);
    expect(linkedList.toString()).to.be.equal('2<=>4');
    expect(linkedList.length).to.be.equal(2);
  });

  it('should be possible to deal with objects and print them out', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.fromArray([
      { key: 'k1', value: 'Value 1' },
      { key: 'k2', value: 'Value 2' },
      { key: 'k3', value: 'Value 3' },
    ]);
    expect(linkedList.length).to.be.equal(3);
    expect(linkedList.toString())
      .to.be.equal('[object Object]<=>[object Object]<=>[object Object]');
    const stringifier = ({ key, value }) => `[${key} : ${value}]`;
    expect(linkedList.toString(stringifier))
      .to.be.equal('[k1 : Value 1]<=>[k2 : Value 2]<=>[k3 : Value 3]');
  });

  it('should find a node by value', () => {
    const linkedList = new DoublyLinkedList();

    let found = linkedList.find(5);
    expect(found).to.be.null;

    linkedList.fromArray([3, 2, 4, 56, 6, 4]);
    found = linkedList.find(56);
    expect(found).to.be.deep.equal(new DoublyLinkedListNode(56));

    found = linkedList.find(7);
    expect(found).to.be.null;
  });

  it('should find by custom function on objected nodes', () => {
    const linkedList = new DoublyLinkedList();

    let found = linkedList.find((value) => value.key === 'x');
    expect(found).to.be.null;

    linkedList.fromArray([
      { key: 'k1', value: 'Value 1' },
      { key: 'k2', value: 'Value 2' },
      { key: 'k3', value: 'Value 3' },
    ]);

    found = linkedList.find((value) => value.key === 'k2');
    expect(found.value).to.be.deep.equal({ key: 'k2', value: 'Value 2' });
  });

  it('should support custom comparisson functions', () => {
    const comparatorFunction = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    const linkedList = new DoublyLinkedList(comparatorFunction);

    linkedList
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' });

    let found = linkedList.find({ value: 2, customValue: 'test2' });
    expect(found.value).to.be.deep.equal({ value: 2, customValue: 'test2' });

    found = linkedList.find({ value: 5, customValue: 'test5' });
    expect(found).to.be.null;
  });

  it('should reverse linked list', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.fromArray([1, 2, 3, 4]);

    expect(linkedList.toString()).to.be.equal('1<=>2<=>3<=>4');
    expect(linkedList.head.value).to.be.equal(1);
    expect(linkedList.tail.value).to.be.equal(4);

    linkedList.reverse();
    expect(linkedList.toString()).to.be.equal('4<=>3<=>2<=>1');

    expect(linkedList.head.previous).to.be.null;
    expect(linkedList.head.value).to.be.equal(4);
    expect(linkedList.head.next.value).to.be.equal(3);
    expect(linkedList.head.next.next.value).to.be.equal(2);
    expect(linkedList.head.next.next.next.value).to.be.equal(1);

    expect(linkedList.tail.next).to.be.null;
    expect(linkedList.tail.value).to.be.equal(1);
    expect(linkedList.tail.previous.value).to.be.equal(2);
    expect(linkedList.tail.previous.previous.value).to.be.equal(3);
    expect(linkedList.tail.previous.previous.previous.value).to.be.equal(4);

    linkedList.reverse();
    expect(linkedList.toString()).to.be.equal('1<=>2<=>3<=>4');

    expect(linkedList.head.previous).to.be.null;
    expect(linkedList.head.value).to.be.equal(1);
    expect(linkedList.head.next.value).to.be.equal(2);
    expect(linkedList.head.next.next.value).to.be.equal(3);
    expect(linkedList.head.next.next.next.value).to.be.equal(4);

    expect(linkedList.tail.next).to.be.null;
    expect(linkedList.tail.value).to.be.equal(4);
    expect(linkedList.tail.previous.value).to.be.equal(3);
    expect(linkedList.tail.previous.previous.value).to.be.equal(2);
    expect(linkedList.tail.previous.previous.previous.value).to.be.equal(1);
  });
});