const add = (a, b) => {
    return a+b
}

const nums = [1, 2, 3, 4];
const doubled = nums.map(i => i*2);

const nums1 = [10, 20, 30];
const total = nums1.reduce((acc, iterator) => {
    acc += iterator
    return acc
});

const sayHello = () => {
    return 'hello'
}

const makePerson = (name, age) => {
    return { 'name': name, 'age': age }
}

const nums2 = [5, 1, 9, 3];
const decsSort = nums2.sort((a, b) => b - a);

const nums3 = [3, 8, 12, 5];
const firstBig = nums3.find((value, i, nums3) => value > 10);

const triple = (x) => x*3

const applyTo5 = (fn) => {
    // call fn with 5 and return the result
    return fn(5)
};

const result = applyTo5(x => x * 2); // should return 10

const nums4 = [1, 2, 3, 4, 5];
const result1 = nums4.map(i => i*2).filter(i => i>5);

const animals = ['dog', 'cat', 'parrot'];
const hasLongName = animals.some(i => i.length > 3);

const nums5 = [10, 20, 30];
const allDivBy5 = nums5.every(i => i%5 === 0);

const users = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
];

const names = users.map(i => i.name.toUpperCase()); // ['ALICE', 'BOB']

const multiplyBy = x => (function(y){
    return x*y
})
const double = multiplyBy(2);
const triple1 = multiplyBy(3);
//double(5); // returns 10




export function test(){
    console.log(add(4, 7))
    console.log(doubled)
    console.log(total)
    console.log(sayHello())
    console.log(makePerson('bob', 266))
    console.log(decsSort)
    console.log(firstBig)
    console.log(triple(3))
    console.log(result)
    console.log(result1)
    console.log(hasLongName)
    console.log(allDivBy5)
    console.log(names)
    console.log(double(5))
    console.log(triple1(7))
}