// src/index.ts
console.log("Hello, World!");
var sum = (...nums) => {
  return nums.reduce((acc, num) => acc + num, 0);
};
export {
  sum
};
