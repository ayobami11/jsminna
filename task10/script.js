const countriesContainer = document.getElementById('countries');
const searchForm = document.querySelector('.search-form');
const searchCountryInput = document.getElementById('search-input');
const regionSelectElement = document.getElementById('regions');
// countriesData stores the data retrieved from the API
let countriesData;

/**
 * Changes the value of a property to "Not set" if it is falsy
 *
 * @param {string || number} propertyValue The value of the property
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

/**
 * Destructures an object and creates a template based on the properties of the object
 *
 * @param {object} parameter The object to be destructured
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
        <p class="country-capital">Capital: ${resetEmptyProperties(
            capital
        )} </p>
        <p class="country-region">Region: ${resetEmptyProperties(region)} </p>
        <p class="country-population">Population: ${formatWithComma(
            resetEmptyProperties(population)
        )}</p>
    `;

    countriesContainer.appendChild(countryTile);
};

/**
 * Invokes the generateCountryTemplate() for each country
 *
 * @param {array} countryList An list of countries with information stored in key-value pairs
 */
const generateCountriesList = (countryList) => {
    countriesContainer.innerHTML = '';
    for (const country of countryList) {
        generateCountryTemplate(country);
    }
};

/**
 * Filters the list of countries to include based on the value of the user's input
 *
 * @param {array} countriesList An array of objects containing countries' details
 */
const filterCountriesBySearch = (countriesList) => {
    const searchCountryValue = convertStringToLowercase(
        searchCountryInput.value
    );

    const filteredCountriesData = countriesList.filter(({ name }) =>
        convertStringToLowercase(name).includes(searchCountryValue)
    );

    generateCountriesList(filteredCountriesData);
};

searchCountryInput.addEventListener('input', () =>
    filterCountriesBySearch(countriesData)
);

/**
 * Creates an option element for a region.
 *
 * @param {string} region The option for the region
 */
const generateRegionTemplate = (region) => {
    const option = document.createElement('option');
    option.value = region;
    option.innerText = region;
    option.classList.add('country-region');
    regionSelectElement.appendChild(option);
};

/**
 * Runs the generateRegionTemplate() for each option in the list
 *
 * @param {array} regionList A list of different country regions
 */
const generateRegionOptions = (regionList) => {
    for (const region of regionList) {
        generateRegionTemplate(region);
    }
};

/**
 * Maps through a list of countries and returns their regions.
 * Duplicates regions are then removed from the returned array.
 * The final array is sorted in ascending order.
 *
 * @param {array} countryList A list of countries with information stored in key-value pairs
 */
const getCountryRegions = (countryList) => {
    const countryRegions = countryList.map(({ region }) =>
        resetEmptyProperties(region)
    );
    const uniqueCountryRegions = Array.from(new Set(countryRegions));
    return uniqueCountryRegions.sort();
};

/**
 * Filters the list of countries based on the region selected.
 * Generates a list of countries based on the filtered results.
 *
 * @param {array} countryList A list of countries with information stored in key-value pairs
 * @param {function} func A callback function that returns the value of the clicked region
 */
const filterCountriesByRegion = (countryList, func) => {
    const filteredCountriesByRegion = countryList.filter(
        ({ region }) => resetEmptyProperties(region) === func()
    );
    generateCountriesList(filteredCountriesByRegion);
};

regionSelectElement.addEventListener('change', ({ target }) => {
    if (target.value === 'all') {
        generateCountriesList(countriesData);
    } else {
        filterCountriesByRegion(countriesData, () => target.value);
    }
});

/**
 * Fetches a list of countries from the given API.
 * Invokes the generateCountriesList() with the data from the API.
 * Displays an error message if the request to the API was unsuccessful.
 */
const fetchCountriesData = async () => {
    try {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        countriesData = await response.json();

        generateCountriesList(countriesData);
        generateRegionOptions(getCountryRegions(countriesData));

        searchForm.classList.add('display-form');
        countriesContainer.classList.add('grid-container');
    } catch {
        countriesContainer.innerHTML =
            '<p>Something went wrong. Please check your network and try again.</p>';
    }
};

fetchCountriesData();
