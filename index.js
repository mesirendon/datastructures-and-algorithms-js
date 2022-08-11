const hi = _ => 'Hello World!';

export { hi };

import LinkedList from './src/singly-linked-lists/LinkedList';

console.log(hi());

const linkedList = new LinkedList();

linkedList
  .append({value: 1, key: 'val-1'})
  .append({value: 2, key: 'val-2'})
  .append({value: 3, key: 'val-3'})
  .append({value: 4, key: 'val-4'})
  .prepend({value: 0, key: 'val-0'});

const formatter = ({value, key}) => ` Key: ${key} | Value: ${value}`
console.log(linkedList.toString(formatter));
console.log(linkedList.length());