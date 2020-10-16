// Calculates the mean and rounds the result to the nearest 2 decimal places
const computeMean = (arr) => {
    let mean = arr.reduce((acc, val) => acc + val) / arr.length;
    // .toFixed() returns a string so we convert back to a number (used parseFloat because mean may contain decimals)
    mean = parseFloat(mean.toFixed(2), 10);

    return mean;
}

// Calculates the median and returns the result
const computeMedian = (arr) => {
    const arrLength = arr.length;
    const midNumIndex = arrLength / 2;

    let median;
    if (arrLength % 2 === 0) {
        // If half of the array length is even, this finds the mean of the two middle numbers
        median = (arr[midNumIndex - 1] + arr[midNumIndex]) / 2;
    } else {
        // If not, this rounds down the index of the middle number (recall arrays are zero-indexed)
        median = arr[Math.floor(midNumIndex)];
    }

    return median;
}

// Calculates the mode and returns the result
const computeMode = (arr) => {
    let mode;

    const getMode = (inputArray) => {
        if (inputArray.length === 1) {
            return inputArray;
        }
    
        // Returns the duplicates of the array, if any
        let findMode = inputArray.filter((element, index, array) => array.indexOf(element) !== index);
        /*
        From the duplicates array, if the element's index equals the index returned from calling the indexOf() method on each element, 
        then findMode will be returned i.e. the returned element(s) have only one duplicate
        */
        if (findMode.every((el, i, arr) => arr.indexOf(el) === i)) {
            return findMode;
        } 
        /* If the condition in the if statement fails, then the loop in the else statement will run until there are no duplicates 
        in findMode */
        else {
            do {
                findMode = findMode.filter((element, index, array) => array.indexOf(element) !== index);
                // Here, if any of the elements have duplicates, the loop runs
            } while (findMode.some((el, i, arr) => arr.indexOf(el) !== i));
        }
        return findMode;
    }
    mode = getMode(arr);

    if (mode.length === 1) {
        mode = parseInt(mode.toString());
    }

    return mode;
}

const compute = (arr) => {
  
    const filterNum = (inputArray) => {
        // Filters array elements to include only strings and numbers
        const filteredArr = inputArray.filter(value => {
            return typeof value === 'number' || typeof value === 'string'; 
        });
        
        const numRegex = new RegExp('[0-9]');
        /* Splits string elements into individual characters and runs the regex test to check if the character is a number.
            If so, it filters the numbers, joins the result and converts the string back to a number. 
        */
        let filterNumbers = filteredArr.map(value => {
            if (typeof value === 'string') {
                let numbers = value.split('').filter(el => numRegex.test(el)).join('');
                // .join() returns a string so we convert back to a number
                numbers = parseInt(numbers, 10);
                return numbers;
            }
            return value;
        });
        // Filters out NaN values and sorts the array in descending order
        const sortedArr = filterNumbers.filter(val => val).sort((a, b) => b - a);
        return sortedArr;
    };
    const filteredArray = filterNum(arr);

    const mean = computeMean(filteredArray);
    const median = computeMedian(filteredArray);
    const mode = computeMode(filteredArray);

    return {
        filteredArray,
        mean,
        mode,
        median
    };
}

console.log(compute([1, '3ab', 2, 'ef4', 'gh3', 5]));