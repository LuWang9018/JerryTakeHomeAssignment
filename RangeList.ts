// Range List
// Guidelines
// In this part of the interview process, we'd like you to come up with an algorithm to
// solve the problem as described below. The problem itself is quite simple to solve.
// What we are mainly looking for in this test (other than that the solution should work)
// is, how well you actually write the code. We want to see how you write productionquality code in a team setting where multiple developers will be collaborating on the
// codebase.
// Specifically, we are looking for: simple, clean, readable and maintainable code, for
// example:
// Code organization and submission format. Things like code organization,
// readability, documentation, testing and deliverability are most important here.
// Your mastery of idiomatic programming.
// The solution is prefered to be in JavaScript. We understand that you may not have much
// experience with JS. We encourage you to take some time to research modern JS and best
// practices, and try your best to apply them when writing your test solution.
// If you choose to use a programming language other than JS, please still make sure you
// stick to the idiomatic way of that programming language.
// Problem Set
// Please use the exact class name, method name and input/output formats in this code
// template.
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes
// integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
type IntervalRange = number[];

export class RangeList {
  intervals: IntervalRange[];

  constructor() {
    this.intervals = [];
  }
  /**
  *
  * Adds a range to the list
  * @param {Array<number>} newInterval - Array of two integers that specify beginning and
  end of range.
  */
  add(newInterval: IntervalRange) {
    try {
      if (newInterval.length != 2) {
        // remove throw error for now. This make the output looks ugly
        // throw new Error(
        //   `Error: Input should be an array of length of 2 given "${newInterval}"`
        // );
        console.log(
          `Error: Input should be an array of length of 2. Given "${newInterval}"`
        );
        return `Error: Input should be an array of length of 2. Given "${newInterval}"`;
      }

      let [start, end] = newInterval;

      let left: IntervalRange[] = [];
      let right: IntervalRange[] = [];

      for (const interval of this.intervals) {
        const [first, last] = interval;

        if (last < start) {
          left.push(interval);
        } else if (first > end) {
          right.push(interval);
        } else {
          start = Math.min(start, first);
          end = Math.max(end, last);
        }
      }

      this.intervals = [...left, [start, end], ...right];
      // console.log(this.intervals);
    } catch (err) {
      console.log(err);
    }
  }

  /**
  *
  * Removes a range from the list
  * @param {Array<number>} toBeRemoved - Array of two integers that specify beginning and
  end of range.
  */
  remove(toBeRemoved: IntervalRange) {
    try {
      if (toBeRemoved.length != 2) {
        // remove throw error for now. This make the output looks ugly
        // throw new Error(
        //   `Error: Input should be an array of length of 2 given "${toBeRemoved}"`
        // );
        console.log(
          `Error: Input should be an array of length of 2. Given "${toBeRemoved}"`
        );
        return `Error: Input should be an array of length of 2. Given "${toBeRemoved}"`;
      }
      let [start, end] = toBeRemoved;

      let result: IntervalRange[] = [];

      while (this.intervals.length) {
        let curInterval = this.intervals.shift();
        if (!curInterval) break;
        const [first, last] = curInterval;

        if (first < start && end < last) {
          // [3,7], [4,5] => [[3,4], [5,7]]
          result.push([first, start]);
          result.push([end, last]);
        } else if (start <= first && last <= end) {
          // [3,7], [1,8] => []
          continue;
        } else if (first < start && start < last) {
          // [3,7], [6,9] => [[3,6]]
          result.push([first, start]);
        } else if (first < end && end < last) {
          // [3,7], [1,5] => [[5,7]]
          result.push([end, last]);
        } else {
          // [3,7], [9,10] => [[3,7]]
          result.push(curInterval.slice(0));
        }
      }

      this.intervals = result;
    } catch (err) {
      console.log(err);
    }
  }
  /**
   *
   * Convert the list of ranges in the range list to a string
   * @returns A string representation of the range list
   */
  toString() {
    let intervalsStrings: string[] = [];
    for (const interval of this.intervals) {
      intervalsStrings.push(`[${interval[0]}, ${interval[1]})`);
    }

    let result = intervalsStrings.join(" ");
    console.log(result);
    return result;
  }
}

// Example run
const rl = new RangeList();
//test invalid cases
//dont neet test invalid type since this is TS
console.log("Test Invalid inputs");
rl.add([]);
rl.add([1]);
rl.add([1, 1, 1]);
rl.remove([10]);

//edge cases
//remove interval that not exist
console.log("Test edge cases");
rl.remove([10, 10]);
rl.toString(); // Should be "" with no error

console.log("Test normal cases");
rl.toString(); // Should be ""
rl.add([1, 5]);
rl.toString(); // Should be: "[1, 5)"
rl.add([10, 20]);
rl.toString(); // Should be: "[1, 5) [10, 20)"
rl.add([20, 20]);
rl.toString(); // Should be: "[1, 5) [10, 20)"
rl.add([20, 21]);
rl.toString(); // Should be: "[1, 5) [10, 21)"
rl.add([2, 4]);
rl.toString(); // Should be: "[1, 5) [10, 21)"
rl.add([3, 8]);
rl.toString(); // Should be: "[1, 8) [10, 21)"
rl.remove([10, 10]);
rl.toString(); // Should be: "[1, 8) [10, 21)"
rl.remove([10, 11]);
rl.toString(); // Should be: "[1, 8) [11, 21)"
rl.remove([15, 17]);
rl.toString(); // Should be: "[1, 8) [11, 15) [17, 21)"
rl.remove([3, 19]);
rl.toString(); // Should be: "[1, 3) [19, 21)"
rl.remove([20, 20]);
rl.toString();
rl.remove([20, 21]);
rl.toString();
rl.remove([1, 21]);
rl.toString();
