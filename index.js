import HashTable from "./src/data-structures/hash-table/HashTable.js";

const hashTable = new HashTable(3);

hashTable.set("a", "sky-old");
hashTable.set("a", "sky");
hashTable.set("b", "sea");
hashTable.set("c", "earth");
hashTable.set("d", "ocean");

console.log("All the keys", hashTable.getValues());
