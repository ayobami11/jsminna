/**
 * Changes the value of a property to "Not set" if it is falsy
 *
 * @param {*} propertyValue The value of the property
 */
const resetEmptyProperties = (propertyValue) => propertyValue || 'Not set';

/**
 * Converts a string to lower case and returns it
 *
 * @param {string} string The string to be converted
 */
const convertStringToLowercase = (string) => string.toLowerCase();

/**
 * Formats a number to include commas in appropriate places
 *
 * @param {number} number The number which is formatted to include commas
 */
const formatWithComma = (number) => {
    if (typeof number === 'number') {
        const digitsArray = String(number).split('');
        for (let i = digitsArray.length - 3; i > 0; i -= 3) {
            digitsArray[i] = ',' + digitsArray[i];
        }

        return digitsArray.join('');
    } else {
        return 'Not set';
    }
};

const countriesContainer = document.getElementById('countries');
/**
 * Destructures an object and creates a template based on the properties of the object
 *
 * @param {object} param The object to be destructured
 */
const generateCountryTemplate = ({
    name,
    capital,
    population,
    flag,
    demonym,
    region
}) => {
    const countryTile = document.createElement('section');
    countryTile.classList.add('country-tile');

    countryTile.innerHTML = `
        <header class="country-header">
            <figure class="country-figure">
                <img class="country-flag" src=${flag} alt="${demonym} flag" />
                <figcaption><h2>${name}</h2></figcaption>
            </figure>
        </header>
        <p class="country-capital">Capital: ${resetEmptyProperties(capital)} </p>
        <p class="country-region">Region: ${resetEmptyProperties(region)} </p>
        <p class="country-population">Population: ${formatWithComma(resetEmptyProperties(population))}</p>
    `;

    countriesContainer.appendChild(countryTile);
};

/**
 * Invokes the generateCountryTemplate() for each country
 *
 * @param {array} countriesList An array of objects containing countries' details
 */
const generateCountriesList = (countriesList) => {
    countriesContainer.innerHTML = '';
    for (const country of countriesList) {
        generateCountryTemplate(country);
    }
};

let countriesData;
const fetchCountriesData = async () => {
    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        countriesData = await response.json();

        generateCountriesList(countriesData);
    } catch {
        alert('Something went wrong. Please check your network and try again.');
    }
};

fetchCountriesData();

const countryInput = document.getElementById('form-input');
/**
 * Filters the list of countries to include based on the value of the user's input
 *
 * @param {array} countriesList An array of objects containing countries' details
 */
const filterCountriesData = (countriesList) => {
    if (countriesData) {
        const searchCountryValue = convertStringToLowercase(countryInput.value);

        const filteredCountriesData = countriesList.filter((country) =>
            convertStringToLowercase(country.name).includes(searchCountryValue)
        );
        generateCountriesList(filteredCountriesData);
    }
};

countryInput.addEventListener('input', () =>
    filterCountriesData(countriesData)
);
