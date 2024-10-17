import { expect } from "chai";
import HashTable from "../HashTable.js";

describe("HashTable", () => {
  it("should create a hash table of certain size", () => {
    const defaultHashTable = new HashTable();
    expect(defaultHashTable.buckets.length).to.be.eq(32);

    const biggerHashTable = new HashTable(64);
    expect(biggerHashTable.buckets.length).to.be.eq(64);
  });

  it("should generate proper hash for specified keys", () => {
    const hashTable = new HashTable();

    expect(hashTable.hash("a")).to.be.eq(1);
    expect(hashTable.hash("b")).to.be.eq(2);
    expect(hashTable.hash("abc")).to.be.eq(6);
  });

  it("should set, read and delete data with collisions", () => {
    const hashTable = new HashTable(3);

    expect(hashTable.hash("a")).to.be.eq(1);
    expect(hashTable.hash("b")).to.be.eq(2);
    expect(hashTable.hash("c")).to.be.eq(0);
    expect(hashTable.hash("d")).to.be.eq(1);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.has("x")).to.be.false;
    expect(hashTable.has("b")).to.be.true;
    expect(hashTable.has("c")).to.be.true;

    const stringifier = (value) => `${value.key}:${value.value}`;

    expect(hashTable.buckets[0].toString(stringifier)).to.be.eq("c:earth");
    expect(hashTable.buckets[1].toString(stringifier)).to.be.eq(
      "a:sky,d:ocean",
    );
    expect(hashTable.buckets[2].toString(stringifier)).to.be.eq("b:sea");

    expect(hashTable.get("a")).to.be.eq("sky");
    expect(hashTable.get("d")).to.be.eq("ocean");
    expect(hashTable.get("x")).to.be.undefined;

    hashTable.delete("a");

    expect(hashTable.delete("not-existing")).to.be.null;

    expect(hashTable.get("a")).to.be.undefined;
    expect(hashTable.get("d")).to.be.eq("ocean");

    hashTable.set("d", "ocean-new");
    expect(hashTable.get("d")).to.be.eq("ocean-new");
  });

  it("should be possible to add objects to hash table", () => {
    const hashTable = new HashTable();

    hashTable.set("objectKey", { prop1: "a", prop2: "b" });

    const object = hashTable.get("objectKey");
    expect(object).not.to.be.undefined;
    expect(object.prop1).to.be.eq("a");
    expect(object.prop2).to.be.eq("b");
  });

  it("should track actual keys", () => {
    const hashTable = new HashTable(3);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.getKeys()).to.be.deep.equal(["a", "b", "c", "d"]);
    expect(hashTable.has("a")).to.be.true;
    expect(hashTable.has("x")).to.be.false;

    hashTable.delete("a");

    expect(hashTable.has("a")).to.be.false;
    expect(hashTable.has("b")).to.be.true;
    expect(hashTable.has("x")).to.be.false;
  });

  it("should get all the values", () => {
    const hashTable = new HashTable(3);

    hashTable.set("a", "alpha");
    hashTable.set("b", "beta");
    hashTable.set("c", "gamma");
    hashTable.set("d", "delta");

    expect(hashTable.getValues()).to.be.deep.equal([
      "gamma",
      "alpha",
      "delta",
      "beta",
    ]);
  });

  it("should get all the values from empty hash table", () => {
    const hashTable = new HashTable();
    expect(hashTable.getValues()).to.be.deep.equal([]);
  });

  it("should get all the values in case of hash collision", () => {
    const hashTable = new HashTable(3);

    // Keys `ab` and `ba` in current implementation should result in one hash (one bucket).
    // We need to make sure that several items from one bucket will be serialized.
    hashTable.set("ab", "one");
    hashTable.set("ba", "two");

    hashTable.set("ac", "three");

    expect(hashTable.getValues()).to.be.deep.equal(["one", "two", "three"]);
  });
});
