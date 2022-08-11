# Singly Linked List
Linked lists are linear dynamic data structures able to manage memory at runtime. On the surface, it might look like both arrays and linked lists are the same, but underneath, their behavior makes them different.

Elements in a linked list can point to the next element, rather than letting the data structure pointing to a specific physical memory location. These elements are widely known as Linked List Nodes or simply Nodes.

Nodes represent not only a value, but a reference to the next node (i.e. next node's memory address). This extra reference is known as a Link.

![Linked List](assets/linked-list.png)

## Operations
Consider having a linked list initialized as
```js
const linkedList = new LinkedList();
```

The available operations are as follows.

### `linkedList.length`
This operation has `O(1)` runtime since keeping the internal `size` variable updated is the key at insertion and deletion.

### Insertion
This implementation considers three cases: **Append**, **Prepend**, and **Insert** at a given position.

#### `linkedList.append`
**Append** adds a node at the end of the linked list. The new appended node must be the linked list's tail and it must point to null, since it's the last one. The previous tail points to the new tail. This operation is `O(1)` runtime because there is no need to traverse the whole linked list, it's just a matter of using current tail and replace such reference.

![Append Linked List](assets/append.png)

```js
1  append(value) {
2    // Let's create the isolated node.
3    const node = new LinkedListNode(value);
4
5    // We increase this linked list length.
6    this.size++;
7
8    // The new node is the head and tail if this linked list is empty.
9    if (!this.head) {
10     this.head = node;
11     this.tail = node;
12
13     return this;
14   }
15
16   // Attach the new node to the end of the linked list
17   this.tail.next = node;
18   this.tail = node;
19
20   return this;
21 }
```

## Runtime Complexity
| Access | Search | Insertion                  | Deletion                   |
|:------:|:------:|:--------------------------:|:--------------------------:|
| `O(n)` | `O(n)` | `O(n)` `O(1)` at beginning | `O(n)` `O(1)` at beginning |`

## Space Complexity
Linked lists have `O(n)` space complexity.