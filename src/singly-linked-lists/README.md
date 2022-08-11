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

### Deletion
Let's consider this implementation options: **Delete at Head**, **Delete at Tail**, **Delete All Nodes With Certain Value**, **Delete a Single Node With Certain Value**. For all this option, the deleted node is returned to the user. For instance, deleting the head could be used as follows.

```js
// We create the linked list.
const linkedList = new LinkedList();
// We append some values.
// 1 -> 2 -> 3 -> null
linkedList
  .append(1)
  .append(2)
  .append(3);

// We delete the node. `deletedNode` is now a `LinkedListNode` with value set to 1.
// Our linked list was left like this
// 2 -> 3 -> null
const deletedNode = linkedList.deleteHead();
```

#### `linkedList.deleteHead`
By deleting the head, the user will get the node that was in the head. The linked list will have the linked list's head pointing to the previous head's next node, making it the new head, so the previous head is dettached from the list. The next's previous node is set to null. Since we can access the head immediately this operation is `O(1)` runtime complex.

![Delete Linked List Head](assets/delete-head.png)

```js
1  deleteHead() {
2    // We return null for an empty linked list.
3    if (!this.head) return null;
4
5    // We create the dettached node.
6    let deletedNode = this.head;
7
8    // If the linked list has only one element, we must update the tail reference as well.
9    if (this.head === this.tail) this.tail = null;
10
11   // We move the linked list head to the deleted head's next node.
12   this.head = deletedNode.next;
13
14   // We decrease this linked list length.
15   this.size--;
16
17   // We return the dettached node.
18   return deletedNode;
19 }
```

#### `linkedList.deleteTail`
By deleting the tail, the user will get the node that was in the tail. The linked list will have the linked list's tail dettached. However, the tail's previous node cannot be easily tracked (this is discussed on doubly linked lists topic), thus, forcing us to traverse to the `n-1th` node. Once there, we make the `n-1th` node the new tail, pointing its next node to `null`. This situation makes this operation `O(n)` runtime complex.

![Delete Linked List Tail](assets/delete-tail.png)

```js
1  deleteTail() {
2    // If the linked list is empty we return null.
3    if (!this.head) return null;
4 
5    let deletedNode = null;
6 
7    // We delete the head if this linked list has only one node.
8    if (!this.head.next) {
9      deletedNode = this.head;
10     this.head = null;
11     this.tail = null;
12     return deletedNode;
13   }
14
15   // We traverse up to the n-1th node
16   let currentNode = this.head;
17   while (currentNode.next.next) {
18     currentNode = currentNode.next;
19   }
10
20   // We set the deleted node, not to the tail, but the n-1th node's next node.
21   deletedNode = currentNode.next;
22
23   // We dettach the tail out of the n-1th node.
24   currentNode.next = null;
25
26   // We update this linked list's tail reference.
27   this.tail = currentNode;
28
29   // We decrease this linked list length.
30   this.size--;
31
32   return deletedNode;
33 }
```

#### `linkedList.delete`
**Delete** deletes the first node that matches the given value. As other deletion options, this operation dettaches the node out of the linked list and returns it to the user.

The worst case for this operation is `O(n)` runtime complexity (i.e. the node is around the end of the linked list). The best case would be `O(1)` runtime complexity (i.e. the node is around the beginning of the linked list).

![Delete Linked List Node By Value](assets/delete.png)

```js
1  delete(value) {
2    // If the list is empty, we return null
3    if (!this.head) return null;
4
5    let deletedNode = null;
6    let currentNode = this.head;
7
8    // Special case where the value is at the head.
9    // Here we must to dettach the head and update the linked list reference
10   // to that new head node.
11   if (this.head.value === value) {
12     deletedNode = this.head;
13     this.head = deletedNode.next;
14     this.size--;
15     return deletedNode;
16   }
17
18   // We must traverse the linked list up to the point where we find a
19   // node that matches the value criteria.
20   while (currentNode.next) {
21     if (this.comparator.equal(currentNode.next.value, value)) break;
22     currentNode = currentNode.next;
23   }
24
25   // We dettach the node out of the linked list.
26   deletedNode = currentNode.next;
27
28   // If no node matches the criteria, we return null.
29   if (!deletedNode) return deletedNode;
30
31   // We update this linked list's tail reference if the value is at the end.
32   if (this.comparator.equal(deletedNode.value, this.tail.value)) this.tail = currentNode;
33 
34   // We link the current node's next node to the detached node's next.
35   currentNode.next = deletedNode.next;
36
37   this.size--;
38
39   return deletedNode;
40 }
```

#### `linkedList.deleteAll`
***Delete All** deletes all the nodes that match with the given value. This option not only returns a node that matches the value, but dettaches all the nodes that matches with the given criteria. Thus, the runtime complexity is `O(n)`, because we must guarantee having traversed the whole linked list.

![Delete All Linked List Nodes By Value](assets/delete-all.png)

```js
1  deleteAll(value) {
2    // If the list is empty, we return null.
3    if (!this.head) return null;
4  
5    let deletedNode = null;
6  
7    // We dettach all the nodes that match the value and become the head.
8    while (this.head && this.comparator.equal(this.head.value, value)) {
9      deletedNode = this.head;
10     this.head = deletedNode.next;
11     this.size--;
12   }
13 
14   let currentNode = this.head;
15 
16   if (currentNode !== null)
17     while (currentNode.next) {
18       // We dettach all the nodes that matches the value across the linked list.
19       if (this.comparator.equal(currentNode.next.value, value)) {
20         deletedNode = currentNode.next;
21         currentNode.next = deletedNode.next;
22         this.size--;
23       }
24       else {
25         currentNode = currentNode.next;
26       }
27     }
28 
29   // We process the node that is at the tail if it matches the value.
30   if (this.comparator.equal(this.tail.value, value)) this.tail = currentNode;
31 
32   return deletedNode;
33 }
```

### `linkedList.find`
This **Search** operation receives either a value or a custom search function. We traverse the linked list up to the point where we find a node that matches either the value or a node that matches the custom search function criteria.

The worst case for this operation is `O(n)` runtime complexity (i.e. the node is around the end of the linked list). The best case would be `O(1)` runtime complexity (i.e. the node is around the beginning of the linked list).

This operation is almost identical to **Delete a Node by Value**. The only difference is that the returned node is not dettached out of the linked list.

![Find Linked List By Value](assets/find.png)

```js
find({ value = undefined, callback = undefined }) {
  // If the list is empty, we return null
  if (!this.head) return null;

  let currentNode = this.head;
  while (currentNode) {
    // If a custom search function was provided and the node
    // matches with the function criteria, we return such node.
    if (callback && callback(currentNode.value))
      return currentNode;

    // If the node's value matches the provided value, we return such node.
    if (value !== undefined && this.comparator.equal(currentNode.value, value))
      return currentNode;
    currentNode = currentNode.next
  }

  return null;
}
```

### `linkedList.fromArray`
Appends each element in the provided array to this linked list. This operation has `O(A)` runtime complexity. `A` being the array's length.

```js
1 fromArray(array) {
2   for (const e of array) {
3     this.append(e);
4   }
5 }
```

### `linkedList.toArray`
This operation returns an array of all the nodes in this linked list. Since we must traverse the whole linked list, the runtime complexity is `O(n)`.

```js
1  toArray() {
2    const nodes = [];
3  
4    let currentNode = this.head;
5    while (currentNode) {
6      nodes.push(currentNode);
7      currentNode = currentNode.next;
8    }
9
10   return nodes
11 }
```

### `linkedList.reverse`
Reversing a linked list is a process that starts at the head. We temporary save the next node from the current node's next accessor. We change the next node of the current node so it would link to the previous node. We move the previous node and current node one step forward. Finally, when we reach the tail we swap it with the head. Since we must traverse the whole linked list, this operation has `O(n)` runtime complexity.

![Reverse Linked List](assets/reverse.png)

```js
1  reverse() {
2    let currNode = this.head;
3    let prevNode = null;
4    let nextNode = null;
5  
6    while (currNode) {
7      // Store next node.
8      nextNode = currNode.next;
9
10     // Change next node of the current node so it would link to previous node.
11     currNode.next = prevNode;
12 
13     // Move prevNode and currNode nodes one step forward.
14     prevNode = currNode;
15     currNode = nextNode;
16   }
17 
18   // Reset head and tail.
19   this.tail = this.head;
20   this.head = prevNode;
21 
22   return this;
23 }
```

## Runtime Complexity Overview
| Access | Search | Insertion                  | Deletion                   |
|:------:|:------:|:--------------------------:|:--------------------------:|
| `O(n)` | `O(n)` | `O(n)` `O(1)` at beginning | `O(n)` `O(1)` at beginning |`

## Space Complexity
Linked lists have `O(n)` space complexity.