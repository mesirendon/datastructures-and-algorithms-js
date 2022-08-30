import DoublyLinkedList from "./src/data-structures/doubly-linked-lists/DoublyLinkedList";

const ll = new DoublyLinkedList();

const array = [
  {value: 1, key: 'test1'},
  {value: 2, key: 'test2'},
  {value: 3, key: 'test3'},
  {value: 4, key: 'test4'},
  {value: 5, key: 'test5'},
  {value: 6, key: 'test6'},
];

ll.fromArray(array);

const stringifier = ({key, value}) => `\nKey: ${key} | Value: ${value}\n`;

console.log(ll.toString(stringifier));

const finder = (val) => val.value === 4;

let node = ll.find(finder)

console.log(node);