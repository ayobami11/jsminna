// Global varibles
const contactContainer = document.getElementById('contacts');
const searchForm = document.querySelector('.search-form');
const searchContactInput = document.getElementById('search-contact');
// contactData stores the data retrieved from the API
let contactData;

/**
 * Converts a string to lower case and returns it
 *
 * @param {string} string The string to be converted
 */
const convertStringToLowercase = (string) => string.toLowerCase();

/**
 * Destructures an object and creates a template based on the properties of the object
 *
 * @param {object} parameter The object to be destructured
 */
const generateContactTemplate = ({ name, number }) => {
    const contactTemplate = document.createElement('div');
    contactTemplate.classList.add('contact');

    contactTemplate.innerHTML = `
        <a class="contact-link" href="tel:${number}">
            <p class="contact-name">${name}</p>
            <i class="fas fa-phone"></i>
        </a>
    `;
    contactContainer.appendChild(contactTemplate);
};

/**
 * Invokes the generateContactTemplate() for each contact.
 * Displays a message if no contact is found.
 *
 * @param {array} contactList A list of contacts with information stored in key-value pairs
 */
const generateContactList = (contactList) => {
    contactContainer.innerHTML = '';
    contactList.forEach((contact) => generateContactTemplate(contact));

    if (!contactContainer.innerHTML) {
        contactContainer.innerHTML = '<p class="error-message">No contacts found.</p>';
    }
};

/**
 * Filters the list of contacts to include based on the value of the user's input
 *
 * @param {array} contactList A list of contacts with information stored in key-value pairs
 */
const filterContactBySearch = (contactList) => {
    const searchContactValue = convertStringToLowercase(
        searchContactInput.value
    );

    const filteredContactData = contactList.filter(({ name }) =>
        convertStringToLowercase(name).includes(searchContactValue)
    );

    generateContactList(filteredContactData);
};
searchContactInput.addEventListener('input', () =>
    filterContactBySearch(contactData)
);

/**
 * Fetches a list of contacts from the given API.
 * Invokes the generateContactList() with the data from the API.
 * Displays an error message if the request to the API was unsuccessful.
 */
const fetchContactData = async () => {
    try {
        const url =
            'https://emajency.com/js/numbers.json';
        const response = await fetch(url);
        
        if (response.ok) {
            contactData = await response.json();
            generateContactList(contactData);

            searchForm.classList.add('display-form');
            contactContainer.classList.add('grid-container');
        }
    } catch {
        contactContainer.innerHTML =
            '<p class="error-message">Something went wrong. Please check your network and try again.</p>';
    }
};

fetchContactData();
