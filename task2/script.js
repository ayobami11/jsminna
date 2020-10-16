'use strict';

const replaceString = (word, search, replaceWith) => {
    const regex = new RegExp(search, 'gi');
    return word.replace(regex, replaceWith);
};

const changeCase = (sentence, characterCase) => {
    if (characterCase === 'upper') {
        sentence = sentence.toUpperCase();
    } else if (characterCase === 'lower') {
        sentence = sentence.toLowerCase();
    }
    return sentence;
};

const trimEdges = sentence => {
    return sentence.trim();
};

const extractString = (sentence, start, end) => {
    end = end || undefined;
    return sentence.substring(start, end);
};
console.log(extractString('hello there', 0, 0))

const getInitials = name => {
    return name.split(' ').map(el => el.charAt(0).toUpperCase()).join('');
};

const str = 'Go to Twitter and see how the well Educated men and women are giving a standing ovation for #TeamSuits';
const str2 = 'poog';
const regex = new RegExp('x{2}');
console.log(regex.test(str2));