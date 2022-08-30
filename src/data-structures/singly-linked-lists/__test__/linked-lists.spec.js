import { expect } from "chai";
import LinkedListNode from "../LinkedListNode";
import LinkedList from "../LinkedList";

describe('Linked lists', () => {
  describe('Node', () => {
    it('should create list node with value', () => {
      const node = new LinkedListNode(1);

      expect(node.value).to.eq(1);
      expect(node.next).to.be.null;
    });

    it('should create list node with object as a value', () => {
      const nodeValue = { value: 1, key: 'test' };
      const node = new LinkedListNode(nodeValue);

      expect(node.value.value).to.eq(1);
      expect(node.value.key).to.eq('test');
      expect(node.next).to.be.null;
    });

    it('should link nodes together', () => {
      const node2 = new LinkedListNode(2);
      const node1 = new LinkedListNode(1, node2);

      expect(node1.next).not.to.be.undefined;
      expect(node2.next).to.be.null;
      expect(node1.value).to.eq(1);
      expect(node1.next.value).to.eq(2);
    });

    it('should convert node to string', () => {
      const node = new LinkedListNode(1);

      expect(node.toString()).to.eq('1');

      node.value = 'string value';
      expect(node.toString()).to.eq('string value');
    });

    it('should convert node to string with custom stringifier', () => {
      const nodeValue = { value: 1, key: 'test' };
      const node = new LinkedListNode(nodeValue);
      const toStringCallback = (value) => `value: ${value.value}, key: ${value.key}`;

      expect(node.toString(toStringCallback)).to.eq('value: 1, key: test');
    });
  });

  describe('Linked list', () => {
    it('should create empty linked list', () => {
      const linkedList = new LinkedList();
      expect(linkedList.toString()).to.be.empty;
    });

    it('should append node to linked list', () => {
      const linkedList = new LinkedList();

      expect(linkedList.head).to.be.null;
      expect(linkedList.tail).to.be.null;

      linkedList.append(1);
      linkedList.append(2);

      expect(linkedList.toString()).to.be.eq('1,2');
      expect(linkedList.tail.next).to.be.null;
    });

    it('should convert to array', () => {
      const linkedList = new LinkedList();

      linkedList.append(1);
      linkedList.append(2);
      linkedList.append(3);

      expect(linkedList.toArray().join(',')).to.be.eq('1,2,3');
    });

    it('should prepend node to linked list', () => {
      const linkedList = new LinkedList();

      linkedList.prepend(2);
      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('2');

      linkedList.append(1);
      linkedList.prepend(3);

      expect(linkedList.toString()).to.be.equal('3,2,1');
    });

    it('should insert node to linked list', () => {
      const linkedList = new LinkedList();

      linkedList.insert(4, 3);
      expect(linkedList.head.toString()).to.be.equal('4');
      expect(linkedList.tail.toString()).to.be.equal('4');

      linkedList.insert(3, 2);
      linkedList.insert(2, 1);
      linkedList.insert(1, -7);
      linkedList.insert(10, 9);

      expect(linkedList.toString()).to.be.equal('1,4,2,3,10');
    });

    it('should delete a node by value from linked list', () => {
      const linkedList = new LinkedList();

      expect(linkedList.delete(5)).to.be.null;

      linkedList.append(1);
      linkedList.append(1);
      linkedList.append(2);
      linkedList.append(3);
      linkedList.append(3);
      linkedList.append(3);
      linkedList.append(4);
      linkedList.append(5);

      expect(linkedList.head.toString()).to.be.equal('1');
      expect(linkedList.tail.toString()).to.be.equal('5');
      expect(linkedList.toString()).to.be.equal('1,1,2,3,3,3,4,5');

      const deletedNode = linkedList.delete(3);
      expect(deletedNode.value).to.be.equal(3);
      expect(linkedList.toString()).to.be.equal('1,1,2,3,3,4,5');

      linkedList.delete(3);
      expect(linkedList.toString()).to.be.equal('1,1,2,3,4,5');

      linkedList.delete(3);
      expect(linkedList.toString()).to.be.equal('1,1,2,4,5');

      linkedList.delete(3);
      expect(linkedList.toString()).to.be.equal('1,1,2,4,5');

      linkedList.delete(1);
      expect(linkedList.toString()).to.be.equal('1,2,4,5');

      linkedList.delete(1);
      expect(linkedList.toString()).to.be.equal('2,4,5');

      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('5');

      linkedList.delete(5);
      expect(linkedList.toString()).to.be.equal('2,4');

      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('4');

      linkedList.delete(4);
      expect(linkedList.toString()).to.be.equal('2');

      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('2');

      linkedList.delete(2);
      expect(linkedList.toString()).to.be.equal('');
    });

    it('should delete all node by value from linked list', () => {
      const linkedList = new LinkedList();

      expect(linkedList.deleteAll(5)).to.be.null;

      linkedList.append(1);
      linkedList.append(1);
      linkedList.append(2);
      linkedList.append(3);
      linkedList.append(3);
      linkedList.append(3);
      linkedList.append(4);
      linkedList.append(5);
      linkedList.append(3);
      linkedList.append(1);
      linkedList.append(4);
      linkedList.append(5);

      expect(linkedList.head.toString()).to.be.equal('1');
      expect(linkedList.tail.toString()).to.be.equal('5');
      expect(linkedList.toString()).to.be.equal('1,1,2,3,3,3,4,5,3,1,4,5');

      const deletedNode = linkedList.deleteAll(3);
      expect(deletedNode.value).to.be.equal(3);
      expect(linkedList.toString()).to.be.equal('1,1,2,4,5,1,4,5');

      linkedList.deleteAll(1);
      expect(linkedList.toString()).to.be.equal('2,4,5,4,5');

      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('5');

      linkedList.deleteAll(5);
      expect(linkedList.toString()).to.be.equal('2,4,4');

      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('4');

      linkedList.deleteAll(4);
      expect(linkedList.toString()).to.be.equal('2');

      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('2');

      linkedList.deleteAll(2);
      expect(linkedList.toString()).to.be.equal('');
    });

    it('should delete linked list tail', () => {
      const linkedList = new LinkedList();

      expect(linkedList.deleteTail()).to.be.null;

      linkedList.append(1);
      linkedList.append(2);
      linkedList.append(3);

      expect(linkedList.head.toString()).to.be.equal('1');
      expect(linkedList.tail.toString()).to.be.equal('3');

      const deletedNode1 = linkedList.deleteTail();

      expect(deletedNode1.value).to.be.equal(3);
      expect(linkedList.toString()).to.be.equal('1,2');
      expect(linkedList.head.toString()).to.be.equal('1');
      expect(linkedList.tail.toString()).to.be.equal('2');

      const deletedNode2 = linkedList.deleteTail();

      expect(deletedNode2.value).to.be.equal(2);
      expect(linkedList.toString()).to.be.equal('1');
      expect(linkedList.head.toString()).to.be.equal('1');
      expect(linkedList.tail.toString()).to.be.equal('1');

      const deletedNode3 = linkedList.deleteTail();

      expect(deletedNode3.value).to.be.equal(1);
      expect(linkedList.toString()).to.be.equal('');
      expect(linkedList.head).to.be.null;
      expect(linkedList.tail).to.be.null;
    });

    it('should delete linked list head', () => {
      const linkedList = new LinkedList();

      expect(linkedList.deleteHead()).to.be.null;

      linkedList.append(1);
      linkedList.append(2);

      expect(linkedList.head.toString()).to.be.equal('1');
      expect(linkedList.tail.toString()).to.be.equal('2');

      const deletedNode1 = linkedList.deleteHead();

      expect(deletedNode1.value).to.be.equal(1);
      expect(linkedList.toString()).to.be.equal('2');
      expect(linkedList.head.toString()).to.be.equal('2');
      expect(linkedList.tail.toString()).to.be.equal('2');

      const deletedNode2 = linkedList.deleteHead();

      expect(deletedNode2.value).to.be.equal(2);
      expect(linkedList.toString()).to.be.equal('');
      expect(linkedList.head).to.be.null;
      expect(linkedList.tail).to.be.null;
    });

    it('should be possible to store objects in the list and to print them out', () => {
      const linkedList = new LinkedList();

      const nodeValue1 = { value: 1, key: 'key1' };
      const nodeValue2 = { value: 2, key: 'key2' };

      linkedList
        .append(nodeValue1)
        .prepend(nodeValue2);

      const nodeStringifier = (value) => `${value.key}:${value.value}`;

      expect(linkedList.toString(nodeStringifier)).to.be.eq('key2:2,key1:1');
    });

    it('should find node by value', () => {
      const linkedList = new LinkedList();

      expect(linkedList.find({ value: 5 })).to.be.null;

      linkedList.append(1);
      expect(linkedList.find({ value: 1 })).not.to.be.undefined;

      linkedList
        .append(2)
        .append(3);

      const node = linkedList.find({ value: 2 });

      expect(node.value).to.be.equal(2);
      expect(linkedList.find({ value: 5 })).to.be.null;
    });

    it('should find node by callback', () => {
      const linkedList = new LinkedList();

      linkedList
        .append({ value: 1, key: 'test1' })
        .append({ value: 2, key: 'test2' })
        .append({ value: 3, key: 'test3' });

      const node = linkedList.find({ callback: (value) => value.key === 'test2' });

      expect(node).not.to.be.undefined;
      expect(node.value.value).to.be.equal(2);
      expect(node.value.key).to.be.equal('test2');
      expect(linkedList.find({ callback: (value) => value.key === 'test5' })).to.be.null;
    });

    it('should create linked list from array', () => {
      const linkedList = new LinkedList();
      linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

      expect(linkedList.toString()).to.be.equal('1,1,2,3,3,3,4,5');
    });

    it('should find node by means of custom compare function', () => {
      const comparatorFunction = (a, b) => {
        if (a.customValue === b.customValue) {
          return 0;
        }

        return a.customValue < b.customValue ? -1 : 1;
      };

      const linkedList = new LinkedList(comparatorFunction);

      linkedList
        .append({ value: 1, customValue: 'test1' })
        .append({ value: 2, customValue: 'test2' })
        .append({ value: 3, customValue: 'test3' });

      const node = linkedList.find({
        value: { value: 2, customValue: 'test2' },
      });

      expect(node).not.to.be.undefined;
      expect(node.value.value).to.be.equal(2);
      expect(node.value.customValue).to.be.equal('test2');
      expect(linkedList.find({ value: { value: 2, customValue: 'test5' } })).to.be.null;
    });

    it('should find preferring callback over compare function', () => {
      const greaterThan = (value, compareTo) => (value > compareTo ? 0 : 1);

      const linkedList = new LinkedList(greaterThan);
      linkedList.fromArray([1, 2, 3, 4, 5]);

      let node = linkedList.find({ value: 3 });
      expect(node.value).to.be.equal(4);

      node = linkedList.find({ callback: (value) => value < 3 });
      expect(node.value).to.be.equal(1);
    });

    it('should convert to array', () => {
      const linkedList = new LinkedList();
      linkedList.append(1);
      linkedList.append(2);
      linkedList.append(3);
      expect(linkedList.toArray().join(',')).to.be.equal('1,2,3');
    });

    it('should reverse linked list', () => {
      const linkedList = new LinkedList();

      // Add test values to linked list.
      linkedList
        .append(1)
        .append(2)
        .append(3);

      expect(linkedList.toString()).to.be.equal('1,2,3');
      expect(linkedList.head.value).to.be.equal(1);
      expect(linkedList.tail.value).to.be.equal(3);

      // Reverse linked list.
      linkedList.reverse();
      expect(linkedList.toString()).to.be.equal('3,2,1');
      expect(linkedList.head.value).to.be.equal(3);
      expect(linkedList.tail.value).to.be.equal(1);

      // Reverse linked list back to initial state.
      linkedList.reverse();
      expect(linkedList.toString()).to.be.equal('1,2,3');
      expect(linkedList.head.value).to.be.equal(1);
      expect(linkedList.tail.value).to.be.equal(3);
    });

    it('should tell the linked list size at any moment', () => {
      const linkedList = new LinkedList();

      expect(linkedList.length()).to.be.equal(0);

      linkedList
        .append(1)
        .append(2)
        .append(2)
        .append(3)
        .append(3);

      expect(linkedList.length()).to.be.equal(5);

      linkedList.deleteAll(3);

      expect(linkedList.length()).to.be.equal(3);

      linkedList
        .prepend(1)
        .prepend(1);

      expect(linkedList.length()).to.be.equal(5);

      linkedList.deleteAll(1);

      expect(linkedList.length()).to.be.equal(2);

      linkedList.deleteAll(2);

      expect(linkedList.length()).to.be.equal(0);

      linkedList
        .append(1)
        .append(2)
        .append(3)
        .append(5);

      expect(linkedList.length()).to.be.equal(4);

      linkedList
        .insert(4, 3)
        .insert(0, -4)
        .insert(10, 40)

      expect(linkedList.length()).to.be.equal(7);

      linkedList.delete(3);

      expect(linkedList.length()).to.be.equal(6);

      linkedList.delete(0);

      expect(linkedList.length()).to.be.equal(5);

      linkedList.delete(0);

      expect(linkedList.length()).to.be.equal(5);

      linkedList.delete(10);

      expect(linkedList.length()).to.be.equal(4);

      linkedList.deleteHead()
      linkedList.deleteTail();

      expect(linkedList.length()).to.be.equal(2);

    });
  });
});