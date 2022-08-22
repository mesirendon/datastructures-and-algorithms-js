import { expect } from "chai";
import Comparator from '../comparator';

describe('Comparator', () => {
  it('should compare with default comparator function', () => {
    const comparator = new Comparator();

    expect(comparator.equal(0, 0)).to.be.true;
    expect(comparator.equal(0, 1)).to.be.false;
    expect(comparator.equal('a', 'a')).to.be.true;
    expect(comparator.lessThan(1, 2)).to.be.true;
    expect(comparator.lessThan(-1, 2)).to.be.true;
    expect(comparator.lessThan('a', 'b')).to.be.true;
    expect(comparator.lessThan('a', 'ab')).to.be.true;
    expect(comparator.lessThan(10, 2)).to.be.false;
    expect(comparator.lessThanOrEqual(10, 2)).to.be.false;
    expect(comparator.lessThanOrEqual(1, 1)).to.be.true;
    expect(comparator.lessThanOrEqual(0, 0)).to.be.true;
    expect(comparator.greaterThan(0, 0)).to.be.false;
    expect(comparator.greaterThan(10, 0)).to.be.true;
    expect(comparator.greaterThanOrEqual(10, 0)).to.be.true;
    expect(comparator.greaterThanOrEqual(10, 10)).to.be.true;
    expect(comparator.greaterThanOrEqual(0, 10)).to.be.false;
  });

  it('should compare with custom comparator function', () => {
    const comparator = new Comparator((a, b) => {
      if (a.length === b.length) {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    expect(comparator.equal('a', 'b')).to.be.true;
    expect(comparator.equal('a', '')).to.be.false;
    expect(comparator.lessThan('b', 'aa')).to.be.true;
    expect(comparator.greaterThanOrEqual('a', 'aa')).to.be.false;
    expect(comparator.greaterThanOrEqual('aa', 'a')).to.be.true;
    expect(comparator.greaterThanOrEqual('a', 'a')).to.be.true;

    comparator.reverse();

    expect(comparator.equal('a', 'b')).to.be.true;
    expect(comparator.equal('a', '')).to.be.false;
    expect(comparator.lessThan('b', 'aa')).to.be.false;
    expect(comparator.greaterThanOrEqual('a', 'aa')).to.be.true;
    expect(comparator.greaterThanOrEqual('aa', 'a')).to.be.false;
    expect(comparator.greaterThanOrEqual('a', 'a')).to.be.true;
  });
});
