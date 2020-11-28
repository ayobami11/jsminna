// Global variables

// Variables used for the time
const currentTimeElement = document.getElementById('current-time');
// Variables used for the extra date data
const dayOfWeekElement = document.getElementById('day-of-week');
const dayOfYearElement = document.getElementById('day-of-year');
const weekNumberElement = document.getElementById('week-number');
const timePeriodElement = document.getElementById('time-period');
const userTimezoneElement = document.getElementById('timezone');
// Buttons
const extrasBtn = document.getElementById('extras-btn');
const refreshQuoteBtn = document.getElementById('refresh-btn');

/**
 * Targets the elements that will contain the quote and the quote author.
 * Generate a random quote from an array of quote data.
 * Renders the randomly generated quote to the screen.
 */
const generateRandomProgrammingQuotes = () => {
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');

    const programmingQuotes = [
        {
            quote:
                'The only way to learn a programming language is by writing programs in it',
            author: 'Dennis Ritchi'
        },
        {
            quote:
                'We think we are creating the system for our own purposes. We believe we are making it in our own image... But the computer is not really like us. It is a projection of a very slim part of ourselves: that portion devoted to logic, order, rule and charity',
            author:
                'Ellen Ullman, Close to the Machine: Technophilia and its Discontents'
        },
        {
            quote:
                'Learning to write programs streches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains',
            author: 'Bill Gates, Co-founder, Microsoft'
        },
        {
            quote:
                "It's hard enough to find an error in your code when you're looking for it; it's even harder when you've assumed your code is error-free",
            author: 'Steve McConnell'
        },
        {
            quote:
                'Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to build bigger and better idiots. So far, the universe is winning',
            author: 'Rick Cook'
        },
        {
            quote:
                'Programs must be written for people to read, and only incidentally for machines to understand',
            author:
                'Harold Abelson, Structure and Interpretation of Computer Programs'
        },
        {
            quote: 'First, solve the problem. Then, write the code',
            author: 'John Johson'
        },
        {
            quote:
                'The best programmers are not marginally better than merely good ones. They are an order-of-magnitude better, measured by whatever standard: conceptual creativity, speed, ingenuity of design, or problem-solving ability',
            author: 'Randall E. Stross'
        },
        {
            quote:
                'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it',
            author: 'Brian W. Kernighan'
        },
        {
            quote:
                'Any fool can write code that a computer can understand. Good programmers write code that humans can understand',
            author: 'Martin Fowler'
        },
        {
            quote:
                'Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program',
            author: 'Linus Torvalds'
        }
    ];

    const randomArrayIndex = Math.floor(
        Math.random() * programmingQuotes.length
    );
    const randomProgrammingQuote = programmingQuotes[randomArrayIndex];
    const { quote, author } = randomProgrammingQuote;

    quoteTextElement.innerText = quote;
    quoteAuthorElement.innerText = author;
};
refreshQuoteBtn.addEventListener('click', generateRandomProgrammingQuotes);

/**
 * Targets all elements with a class of 'extras'.
 * Toggles the class 'toggle-extras' on the elements with class 'extras'.
 * Sets the innerHTML of the button that toggles the class.
 */
const showExtraInfo = () => {
    const extrasElements = [...document.getElementsByClassName('extras')];
    extrasElements.forEach((element) =>
        element.classList.toggle('toggle-extras')
    );
    document.body.classList.toggle('align-between');

    const quoteContainer = document.getElementById('quote');
    if (!quoteContainer.classList.contains('toggle-extras')) {
        extrasBtn.innerHTML = 'Less <i class="fas fa-chevron-up"></i>';
    } else {
        extrasBtn.innerHTML = 'More <i class="fas fa-chevron-down"</i>';
    }
};
extrasBtn.addEventListener('click', showExtraInfo);

/**
 * Returns the current day number in the week.
 *
 * @param {object} currentDate The date object
 */
const getDayOfWeek = (currentDate) => currentDate.getDay() + 1;

/**
 * Returns the current day number in the year.
 *
 * @param {object} currentDate The date object
 */
const getDayOfYear = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1);

    const timeElapsed = currentDate.getTime() - firstDayOfYear.getTime();
    const dayNumber = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
    return dayNumber;
};

/**
 * Returns the current week number in the year
 *
 * @param {object} currentDate The date object
 */
const getWeekNumber = (currentDate) => {
    const currentYear = currentDate.getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1);

    const timeElapsed = currentDate.getTime() - firstDayOfYear.getTime();
    const weekNumber = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7));
    return weekNumber;
};

/**
 * Returns the current time in hours and minutes.
 *
 * @param {date} currentDate The date object
 */
const getCurrentTime = (currentDate) => {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    return {
        hours,
        minutes
    };
};

/**
 * Invokes all date-related functions with an argument of the current date.
 * Renders the current date data to the screen.
 * Displays different images based on the time of day.
 *
 * @param {date} currentDate The date object
 */
const displayDateData = (currentDate) => {
    const dateData = {
        dayOfTheWeek: getDayOfWeek(currentDate),
        dayOfTheYear: getDayOfYear(currentDate),
        weekOfTheYear: getWeekNumber(currentDate),
        currentHour: getCurrentTime(currentDate).hours,
        currentMinute: getCurrentTime(currentDate).minutes
    };

    const {
        dayOfTheWeek,
        dayOfTheYear,
        weekOfTheYear,
        currentHour,
        currentMinute
    } = dateData;

    dayOfWeekElement.innerText = dayOfTheWeek;
    dayOfYearElement.innerText = dayOfTheYear;
    weekNumberElement.innerText = weekOfTheYear;
    currentTimeElement.innerText = `${String(currentHour).padStart(
        2,
        '0'
    )}:${String(currentMinute).padStart(2, '0')}`;

    if (currentHour <= 16) {
        document.body.classList.add('day-bg');
        document.body.classList.add('day-mode');
    } else {
        document.body.classList.add('night-bg');
    }

    if (currentHour < 12) {
        timePeriodElement.innerHTML =
            '<i class="far fa-sun" aria-hidden="true"></i>Good morning, it\'s currently';
    } else if (currentHour >= 12 && currentHour <= 16) {
        timePeriodElement.innerHTML =
            '<i class="fas fa-sun" aria-hidden="true"></i>Good afternoon, it\'s currently';
    } else {
        timePeriodElement.innerHTML =
            '<i class="fas fa-moon" aria-hidden="true"></i>Good evening, it\'s currently';
    }
};

userTimezoneElement.innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;
setInterval(() => displayDateData(new Date()), 1000);
