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

```js
1 length() {
2   return this.size;
3 }
```

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

#### `linkedList.prepend`
**Prepend** adds a node at the beginning of the linked list. The new prepended node must be linked to the list's head and it must point to the previous head. There is no need to do further manipulation on the previous head since it already points to the next node. This operation is `O(1)` runtime because the node to manipulate is easily located through the linked list's head pointer.

![Prepend Linked List](assets/prepend.png)

```js
1  prepend(value) {
2    // The new node has to be the head of this list no matter what
3    const node = new LinkedListNode(value, this.head);
4    this.head = node;
5
6    // If there is no tail yet, we must have to create it
7    if (!this.tail) {
8      this.tail = node;
9    }
10
11   this.size++;
12
13   return this;
14 }
```

#### `linkedList.insert`
**Insert** adds a node at a given position in the linked list. The new inserted node must be placed between nodes that are already linked in the list. This operation is however more complex than append or prepend since in this case we need to traverse the linked list up to the point where the insertion must be done. Thus, insertion is `O(n)` runtime complex.

![Insert Linked List](assets/insert.png)

```js
1  insert(value, rawIndex) {
2    // We must guarantee the index is in the boundaries
3    const index = rawIndex < 0 ? 0 : rawIndex;
4  
5    // If the index is 0, this is a prepend.
6    if (index === 0) this.prepend(value);
7    else {
8      this.size++;
9      let count = 1;
10     let currentNode = this.head;
11 
12     // We create the node
13     const node = new LinkedListNode(value);
14 
15     // We have to traverse the linked list up to the point of insertion
16     while (currentNode) {
17       if (count === index) break;
18       currentNode = currentNode.next;
19       count++;
20     }
21 
22     // We perform the insertion on the reached node.
23     if (currentNode) {
24       node.next = currentNode.next;
25       currentNode.next = node;
26     }
27     else {
28       // We perform the insertion at the end.
29       if (this.tail) {
30         this.tail.next = node;
31         this.tail = node;
32       }
33       else {
34         this.head = node;
35         this.tail = node;
36       }
37     }
38   }
39 
40   return this;
41 }
```

## Runtime Complexity Overview
| Access | Search | Insertion                  | Deletion                   |
|:------:|:------:|:--------------------------:|:--------------------------:|
| `O(n)` | `O(n)` | `O(n)` `O(1)` at beginning | `O(n)` `O(1)` at beginning |`

## Space Complexity
Linked lists have `O(n)` space complexity.