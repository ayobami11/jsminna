// checkValidity() uses the constraints applied on the element and returns a boolean which indicates if the form input passes all the constraints

const formElement = document.querySelector('form');

const htmlFormInputs = document.getElementsByClassName('form-input');
const formInputs = [...htmlFormInputs];

const submitBtn = document.getElementById('submit-btn');

/**
 * Filters out the array to include only password input fields.
 * Returns a boolean to indicate if the password input fields are the same.
 *
 * @param {array} formInputs A list of form input elements
 */
const validatePassword = (formInputs) => {
    const passwordFields = formInputs.filter(
        (formInput) => formInput.type === 'password'
    );
    return passwordFields.length === 1
        ? true
        : passwordFields[0].value === passwordFields[1].value;
};

/**
 * Performs validation tests on all formInputs elements and validate the password fields.
 * It also verifies if the terms checkbox has been checked.
 * If all validations are successful, the submit button is no longer disabled.
 *
 *
 */
const terms = document.getElementById('terms');
const validateFormInputs = () => {
    const inputsValidity = formInputs.every((formInput) =>
        formInput.checkValidity()
    );
    const passwordValidated = validatePassword(formInputs);

    // If there is no terms input and the other validations are successful, the submit button is no longer disabled
    if ((terms?.checked ?? true) && inputsValidity && passwordValidated) {
        submitBtn.removeAttribute('disabled');
        submitBtn.removeAttribute('aria-disabled');
    } else {
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.setAttribute('aria-disabled', 'true');
    }
};

/**
 * Stores the recipient input element in a variable called currentElement.
 * Checks if the last child currentElement's parent has a class of 'error-message' and stores the result in containsErrorElement.
 * If currentElement fails any of the validation tests, an error message is outputted just below the input field.
 *
 *
 * @param {object} event The event object of the recipient input element
 */
const toggleErrorMessage = (event) => {
    const currentElement = event.target;

    // Returns a boolean which indicates if the last child node of currentElement contains the class 'error-message'
    const containsErrorElement = currentElement.parentNode.lastElementChild.classList.contains(
        'error-message'
    );

    if (
        currentElement.value &&
        !currentElement.checkValidity() &&
        !containsErrorElement
    ) {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.classList.add('error-message');
        currentElement.classList.add('invalid-input');

        const errorMessage = 'Password should be at least 8 characters long';
        errorMessageElement.innerText = errorMessage;
        currentElement.parentNode.insertBefore(
            errorMessageElement,
            currentElement.nextSibling
        );
    } else if (currentElement.checkValidity() && containsErrorElement) {
        currentElement.parentNode.querySelector('.error-message').remove();
    }
};
formInputs.forEach((formInput) => {
    formInput.addEventListener('input', validateFormInputs);
    formInput.addEventListener('input', toggleErrorMessage);
});
terms?.addEventListener('change', validateFormInputs);

/**
 * Delays the submission of the form by 2 seconds.
 * When the form is submitted (submit button is clicked), the submit button element simulates a loading scenario for 2 seconds.
 *
 * @param {object} event The form element event object
 */
const simulateLoading = (event) => {
    event.preventDefault();
    const initialButtonText = submitBtn.innerText;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';
    setTimeout(() => {
        submitBtn.innerHTML = initialButtonText;
        formElement.submit();
    }, 2000);
};
formElement.addEventListener('submit', simulateLoading);
