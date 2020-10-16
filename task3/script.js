// 1.
const squareNumLoop = arr => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i] ** 2);
    }
    return newArr;
}
// console.log(squareNumLoop([2, 4, 5, 10]));

const filterOddNumLoop = arr => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i] % 2 !== 1 && newArr.push(arr[i]);
    }
    return newArr;
}
// console.log(filterOddNumLoop([2, 5, 7, 9, 11, 12, 14, 13, 20]));

const sumNumbersLoop = arr => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    };
    return sum;
}
// console.log(sumNumbersLoop([10, 43, -1, 29]));

// 2. Yes, they are easier to use.
const squareNum = arr => arr.map(num => num ** 2);
// console.log(squareNum([2, 4, 5, 10]));

const filterOddNum = arr => arr.filter(num => num % 2 !== 1);
// console.log(filterOddNum([2, 5, 7, 9, 11, 12, 14, 13, 20]));

const sumNumbers = arr => arr.reduce((accumulator, currentValue) => accumulator + currentValue);
// console.log(sumNumbers([10, 43, -1, 29]));

// 3.
const sortArrLoop = arr => {
    const newArr = [];
    
    while (arr.length > 0) {
        const leastNum = Math.min(...arr);
        for (let i = 0; i < arr.length; i++) {
            arr[i] === leastNum && newArr.push(arr.splice(i, 1));
        }
    }
    return newArr.flat();
}
// console.log(sortArrLoop([21, -4, 9, 0, -7, 101, 725, -333, -0]));

const sortArr = arr => {
    const newArr =[];

    while (arr.length > 0) {
        const leastNum = Math.min(...arr);
        arr.map((num, index) => num === leastNum && newArr.push(arr.splice(index, 1)));
    }
    return newArr.flat();
}
// console.log(sortArr([21, -4, 9, 0, -7, 101, 725, -333, -0]));

// Solution 2:
const sortArr2 = arr => {
    const newArr = [];

    while (arr.length > 0) {
        arr.map((outerNum, index) => {
            const boolArr = [];
            // Loops through the entire array on each iteration amd returns true/false
            arr.map(innerNum => boolArr.push(outerNum <= innerNum));
            // If all the elements in boolArr return true, then the current element in the outer iteration is removed and pushed to the newArr 
            boolArr.every(bool => bool) && newArr.push(arr.splice(index, 1));
        });
    }
    return newArr.flat();
}
console.log(sortArr2([21, -4, 9, 0, -7, 101, 725, -333, -0]));

// const sortArr2 = arr => {
//     const newArr = [];

//     while (arr.length > 0) {
//         arr.map((outerNum, index) => {
//             const boolArr = [];
//             // Loops through the entire array on each iteration amd returns true/false
//             arr.map(innerNum => boolArr.push(outerNum <= innerNum));
//             // If all the elements in boolArr return true, then the current element in the outer iteration is removed and pushed to the newArr 
//             boolArr.every(bool => bool) && newArr.push(arr.splice(index, 1));
//         });
//     }
//     return newArr.flat();
// }
console.log(sortArr2([21, -4, 9, 0, -7, 101, 725, -333, -0]));
