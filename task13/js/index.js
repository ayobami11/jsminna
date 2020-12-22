// Global variables
const headerLogoutBtns = document.getElementsByClassName('header-logout');

const dropdownContent = document.getElementsByClassName('dropdown-content');

const scrollTopBtn = document.getElementById('top-btn');

const hamburgerBtnElement = document.querySelector('.hamburger');
const hamburgerNavElement = document.querySelector('.hamburger-nav');

const categoriesContainer = document.getElementById('categories');

const suggestionsSection = document.querySelector('.suggestions-section');
const suggestionsContainer = document.getElementById('suggestions');

const formElement = document.querySelector('form');

// Array of objects representing all products in the store
const products = [
    {
        category: 'electronics',
        products: [
            {
                name: 'Laptop',
                image: './images/electronics/laptop.jpg',
                price: 475000
            },
            {
                name: 'Mobile phone',
                image: './images/electronics/mobile-phone.jpg',
                price: 97000
            },
            {
                name: 'PlayStation',
                image: './images/electronics/playstation.jpg',
                price: 180000
            },
            {
                name: 'Mobile phone',
                image: './images/electronics/mobile-phone.jpg',
                price: 97000
            },
            {
                name: 'Laptop',
                image: './images/electronics/laptop.jpg',
                price: 475000
            },
            {
                name: 'PlayStation',
                image: './images/electronics/playstation.jpg',
                price: 180000
            },
            {
                name: 'PlayStation',
                image: './images/electronics/playstation.jpg',
                price: 180000
            },
            {
                name: 'Mobile phone',
                image: './images/electronics/mobile-phone.jpg',
                price: 97000
            },
            {
                name: 'Laptop',
                image: './images/electronics/laptop.jpg',
                price: 475000
            },
            {
                name: 'PlayStation',
                image: './images/electronics/playstation.jpg',
                price: 180000
            },
            {
                name: 'Mobile phone',
                image: './images/electronics/mobile-phone.jpg',
                price: 97000
            },
            {
                name: 'PlayStation',
                image: './images/electronics/playstation.jpg',
                price: 180000
            },
            {
                name: 'Mobile phone',
                image: './images/electronics/mobile-phone.jpg',
                price: 97000
            },
            {
                name: 'PlayStation',
                image: './images/electronics/playstation.jpg',
                price: 180000
            }
        ]
    },
    {
        category: 'furniture',
        products: [
            {
                name: 'Chair',
                image: './images/furniture/chair.jpg',
                price: 250000
            },
            {
                name: 'Couch',
                image: './images/furniture/couch.jpg',
                price: 150000
            },
            {
                name: 'Office furniture set',
                image: './images/furniture/office-furniture-set.jpg',
                price: 500000
            },
            {
                name: 'Chair',
                image: './images/furniture/chair.jpg',
                price: 250000
            },
            {
                name: 'Couch',
                image: './images/furniture/couch.jpg',
                price: 150000
            },
            {
                name: 'Office furniture set',
                image: './images/furniture/office-furniture-set.jpg',
                price: 500000
            },
            {
                name: 'Couch',
                image: './images/furniture/couch.jpg',
                price: 150000
            },
            {
                name: 'Chair',
                image: './images/furniture/chair.jpg',
                price: 250000
            },
            {
                name: 'Office furniture set',
                image: './images/furniture/office-furniture-set.jpg',
                price: 500000
            },
            {
                name: 'Chair',
                image: './images/furniture/chair.jpg',
                price: 250000
            }
        ]
    },
    {
        category: 'grocery',
        products: [
            {
                name: 'Grains',
                image: './images/grocery/grains.jpg',
                price: 30000
            },
            {
                name: 'Vegetables',
                image: './images/grocery/vegetables.jpg',
                price: 5000
            },
            {
                name: 'Citrus fruit',
                image: './images/grocery/citrus-fruit.jpg',
                price: 200
            },
            {
                name: 'Vegetables',
                image: './images/grocery/vegetables.jpg',
                price: 5000
            },
            {
                name: 'Citrus fruit',
                image: './images/grocery/citrus-fruit.jpg',
                price: 200
            },
            {
                name: 'Grains',
                image: './images/grocery/grains.jpg',
                price: 30000
            },
            {
                name: 'Vegetables',
                image: './images/grocery/vegetables.jpg',
                price: 5000
            },
            {
                name: 'Citrus fruit',
                image: './images/grocery/citrus-fruit.jpg',
                price: 200
            },
            {
                name: 'Grains',
                image: './images/grocery/grains.jpg',
                price: 30000
            },
            {
                name: 'Citrus fruit',
                image: './images/grocery/citrus-fruit.jpg',
                price: 200
            }
        ]
    }
];

/**
 * Removes the auth token from localStorage when the user logs out
 */
const removeAuthToken = () => {
    localStorage.removeItem('userToken');
    window.location.href = './login.html';
};
[...headerLogoutBtns].forEach(button => button.addEventListener('click', removeAuthToken));

/**
 * Formats a number to include commas in appropriate places
 *
 * @param {number} number The number which is formatted to include commas
 */
const formatWithComma = (number) => {
    const digitsArray = String(number).split('');
    for (let i = digitsArray.length - 3; i > 0; i -= 3) {
        digitsArray[i] = ',' + digitsArray[i];
    }

    return digitsArray.join('');
};

/**
 * Generates a category link for each category in the store.
 *
 * @param {array} productCategory A list of categories and their products
 */
const generateCategories = (productCategory) => {
    productCategory.forEach(({ category }) => {
        const categoryLink = `<a href=${'#' + category}>${category}</a>`;
        [...dropdownContent].forEach(
            (dropdown) => (dropdown.innerHTML += categoryLink)
        );
    });
};
generateCategories(products);

/**
 * Creates a template for a product in the store.
 * Appends the newly-created template to the currentCategory.
 *
 * @param {object} product A product in the store
 * @param {object} currentCategory The current category of products
 */
const generateProductTemplate = ({ name, image, price }, currentCategory) => {
    currentCategory.innerHTML += `
    <figure class="product">
        <div class="image-container">
            <img
                class="product-image"
                src=${image}
                alt=${name}
            />
            </div>
            <figcaption class="product-info">
                <p class="product-name">${name}</p>
                <p class="product-price">${formatWithComma(price)}</p>
            </figcaption>
        </figure>
    `;
};

/**
 * Creates a new category template.
 * Sets the title of the new category.
 * Creates a new product template for each product in the category.
 *
 * @param {object} categoryData An object containing a category name and its products
 */
const generateCategoryTemplate = ({ category, products }) => {
    const currentCategory = document.createElement('section');
    currentCategory.id = category;
    currentCategory.classList.add('category');
    const currentCategoryTitle = `<h2 class="category-title">${category}</h2>`;

    const categoryProducts = document.createElement('div');
    categoryProducts.classList.add('products');

    // Creates a template for each product
    products.forEach((product) =>
        generateProductTemplate(product, categoryProducts)
    );

    currentCategory.innerHTML = currentCategoryTitle;

    currentCategory.appendChild(categoryProducts);
    categoriesContainer.appendChild(currentCategory);
};

/**
 * Generates all products from their category
 *
 * @param {array} products An array containing all products in their different categories
 */
const generateAllProducts = (products) => {
    products.forEach((product) => generateCategoryTemplate(product));
};
generateAllProducts(products);

/**
 * Scrolls to the top of the webpage.
 */
const scrollToTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};
scrollTopBtn.addEventListener('click', scrollToTop);

/**
 * Toggles the display of the hamburger menu for mobile screeens.
 */
const toggleHamburgerDisplay = () => {
    if (!hamburgerNavElement.classList.contains('display-block')) {
        hamburgerNavElement.classList.add('display-block');
        hamburgerBtnElement.innerHTML = '<i class="fas fa-times fa-2x"></i>';
    } else {
        hamburgerNavElement.classList.remove('display-block');
        hamburgerBtnElement.innerHTML = '<i class="fas fa-bars fa-2x"></i>';
    }
};
hamburgerBtnElement.addEventListener('click', toggleHamburgerDisplay);

/**
 * Creates a template in HTML form for a suggestion.
 * Appends the created template to the suggestionsContainer.
 *
 * @param {object} suggestion An object representing a user's suggestion
 */
const generateSuggestionTemplate = ({
    itemName,
    itemDescription,
    itemCategory,
    reason
}) => {
    const suggestionDataContainer = document.createElement('div');
    suggestionDataContainer.classList.add('suggestion-tile');
    suggestionDataContainer.innerHTML = `
        <p><span class="suggestion-label">Item name:<span> ${itemName}</p>
        <p><span class="suggestion-label">Item description:</span> ${itemDescription}</p>
        <p><span class="suggestion-label">Item category:</span> ${itemCategory}</p>
        <p><span class="suggestion-label">Reason:</span> ${reason}</p>
    `;
    suggestionsContainer.appendChild(suggestionDataContainer);
};

/**
 * Clears the content of the suggestionsContainer.
 * Generates a suggestion template for each suggestion in the array.
 *
 * @param {array} suggestions An array of object containing user suggestions
 */
const getUserSuggestions = (suggestions) => {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach((suggestion) => generateSuggestionTemplate(suggestion));
};

/**
 * Makes the suggestionSection element visible.
 * Scrolls the page to the user's suggestions.
 */
const displaySuggestions = () => {
    suggestionsSection.classList.add('display-block');
    window.location.href = '#suggestions-section';
};

/**
 * Makes a GET request for the users' suggestion.
 * Invokes the displaySuggestions function.
 *
 * @param {object} event The event object
 */
const fetchUserSuggestions = async (event) => {
    event.preventDefault();
    const itemCategory = document.getElementById('itemCategory');

    const form = event.target;
    const endpoint = form.action + itemCategory.value;

    displaySuggestions();

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();

            if (jsonResponse.success) {
                getUserSuggestions(jsonResponse.payload.result);
            } else {
                if (!document.querySelector('.error-message')) {
                    const failureMessageElement = document.createElement('p');
                    failureMessageElement.innerText =
                        "Could't get suggestions. Please try again later.";
                    failureMessageElement.classList.add('error-message');

                    formElement.after(failureMessageElement);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
formElement.addEventListener('submit', fetchUserSuggestions);
