// Difference between object literals and object constructors
/*
Ways of creating objects in JavaScript: Object literals, and Object constructors.
In JavaScript, objects created with object literals have only a single instance. This means any change made to the object is applied across the whole program. On the other hand, objects created with object constructors can have multiple instances. When using object constructors, we create an instance of the object by calling the constructor function with the 'new' keyword. This means when we make changes to an instance of the object, the change is only applied to that object instance, and does not affect the other instances.
*/

// The input object containing employees and their salary details
const employeeDetails = {
    'alfred': {
        age: 47,
        years: 20,
        performance: 7,
        salary: 10000
    },
    'john': {
        age: 55,
        years: 26,
        performance: 10,
        salary: 14000
    },
    'joshua': {
        age: 60,
        years: 35,
        performance: 9,
        salary: 20000
    },
    'daniel': {
        age: 30,
        years: 5,
        performance: 7,
        salary: 10500
    },
    'jamie': {
        age: 40,
        years: 14,
        performance: 6,
        salary: 13000
    }
}

// Assigns the object's key to employeeName and value to employeeInfo
let employeeName, employeeInfo;
const destructureEmployeeDetails = (employeeData) => {
    [employeeName, employeeInfo] = [employeeData[0], employeeData[1]];
}

// Adds a dollar sign to the beginning of a number
const prependDollarSign = (number) => '$' + number;

/*
Takes in an object and returns the new salaries of the employees based on their age, performance and number of years spent at the company, as an array of objects
*/
const calculateEmployeeSalary = (employeesData) => {
    const newSalaries = employeesData.map(employee => {
        destructureEmployeeDetails(employee);

        let { age, years, performance, salary } = employeeInfo;
        let ageBonus;
        
        if (age > 50) {
            ageBonus = 200;
        } else if (age >= 30) {
            ageBonus = 100;
        } else {
            ageBonus = 0;
        }
        
        const percentageRaise = (years / 10) * performance;
        const salaryIncrease = (percentageRaise / 100) * salary;
        const newSalary = salary + salaryIncrease + ageBonus;
        
        return {
            [employeeName]: newSalary
        }
    });
    
    return newSalaries;
}

/*
Takes in an object and returns an array of employees' names whose salary increase is greater than 15%
*/
const getRaisesOver15 = (employeesData) => {
    const raisesOver15 = employeesData.filter(employee => {
        destructureEmployeeDetails(employee);

        let { years, performance } = employeeInfo;
        const percentageRaise = (years / 10) * performance;
        
        return percentageRaise > 15;
    });

    const employeeNames = raisesOver15.map(employee => {
        destructureEmployeeDetails(employee);

        return employeeName;
    });
    
    return employeeNames;
}

/*
Takes in an object and returns the difference between the sum of all employees' salaries after the salary increase, and the sum of all the employees' salaries before the salary increase
*/
const findOverallPayoutIncrease = (employeesData) => {
    const salariesBeforeIncrease = employeesData.map(employee => {
        destructureEmployeeDetails(employee);

        return employeeInfo.salary;
    });
    const salariesBeforeIncreaseSum = salariesBeforeIncrease.reduce((sum, currentSalary) => {
        return sum + currentSalary;
    });
    
    const salariesAfterIncrease = calculateEmployeeSalary(employeesData).map(employee => {
        return Object.values(employee);
    });
    const salariesAfterIncreaseSum = salariesAfterIncrease.flat().reduce((sum, currentSalary) => {
        return sum + currentSalary;
    });
    
    const overallPayoutIncrease = salariesAfterIncreaseSum - salariesBeforeIncreaseSum;
    return overallPayoutIncrease;
}

const companyRaiseData = (data) => {
    const salaries = calculateEmployeeSalary(data).map(employee => {
        const currentEmployee = Object.keys(employee);
        const salaryInDollars = prependDollarSign(Object.values(employee));

        return {
            [currentEmployee]: salaryInDollars
        };
    });
    const raisesOver15 = getRaisesOver15(data);
    const overallPayoutIncrease = prependDollarSign(findOverallPayoutIncrease(data));
    
    return {
        salaries,
        raisesOver15,
        overallPayoutIncrease
    }
}

const employeesData = Object.entries(employeeDetails);
console.log(companyRaiseData(employeesData));