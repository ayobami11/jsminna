'use strict';
// Note: All helper functions in this generateResult() are immediately invoked

// Returns the modified result object
const generateResult = inputString => {
    // Toggles the case of each letter i.e uppercase to lowercase & lowercase to uppercase
    const toggledWords = (function toggleCase() {
        const wordsArray = inputString.split(' ');

        const words = wordsArray.map(word => {
            const letters = word.split('');
            // Toggles the case of each letter
            let lettersArray = letters.map(letter => {
                if (letter === letter.toLowerCase()) {
                    letter = letter.toUpperCase();
                } else {
                    letter = letter.toLowerCase();
                }
                return letter;
            });
            return lettersArray.join('');
        });

        return words;
    })();

    // Checks if a word starts with an uppercase letter
    const checkUppercase = (() => {
        return toggledWords.filter(word => word.charAt(0) === word.charAt(0).toUpperCase() && word !== '');
    })();

    // Checks if a word ends with 'ing' (case-insensitive)
    const endsWithIng = (() => {
        return toggledWords.filter(word => word.slice(-3).match(/ing/gi));
    })();

    // Checks if a word is a palindrome
    const isPalindrome = (() => {
        const uppercasedWords = checkUppercase.map(word => word.toLowerCase());
        let palindromes = uppercasedWords.filter(word => word === word.split('').reverse().join(''));
        // Converts the array to a string if it contains one element or less
        palindromes = palindromes.length <= 1 && palindromes.toString();
        return palindromes;
    })();

    const collateResult = (() => {
        const uppercased = checkUppercase;
        const ing = endsWithIng;
        const palindrome = isPalindrome;

        const result = {
            uppercased,
            ing,
            palindrome
        }
        return result;
    })();
    return collateResult;
};

const example = 'maDam aYO Who Stays In oYoing Was in a Bus to Lagos whEn Her Son Sold the rAceCar';
console.log(generateResult(example));