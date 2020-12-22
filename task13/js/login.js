const formElement = document.querySelector('form');
const passwordInputElement = document.getElementById('password');
const passwordBtnElement = document.getElementById('password-btn');

/**
 * Toggles the visibility of the password input.
 */
const togglePasswordVisibility = () => {
    if (passwordInputElement.type === 'password') {
        passwordInputElement.setAttribute('type', 'text');
        passwordBtnElement.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInputElement.setAttribute('type', 'password');
        passwordBtnElement.innerHTML = '<i class="fas fa-eye"></i>';
    }
};
passwordBtnElement.addEventListener('click', togglePasswordVisibility);

/**
 * Returns a boolean indicating if all form inputs are valid
 */
const validateFormInputs = () => {
    passwordInputElement.type !== 'password' &&
        passwordInputElement.setAttribute('type', 'password');
    passwordBtnElement.innerHTML = '<i class="fas fa-eye"></i>';

    const formInputs = [...document.getElementsByClassName('input-field')];
    const formInputsValid = formInputs.every((input) => input.checkValidity());
    return formInputsValid;
};

/**
 * Makes a request to the API and gives feeback if the request was unsuccessful.
 * 
 * @param {object} event The event object
 */
const submitFormData = async (event) => {
    event.preventDefault();

    try {
        if (validateFormInputs()) {
            const form = event.target;
            const endpoint = form.action;
            const formData = new FormData(form);

            const user = {};
            for (const [name, value] of formData) {
                user[name] = value;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const jsonResponse = await response.json();

                if (jsonResponse.success) {
                    if (document.querySelector('.error-message')) {
                        document.querySelector('.error-message').remove();
                    }

                    localStorage.setItem(
                        'userToken',
                        jsonResponse.payload.token
                    );

                    window.location.href = './index.html';
                } else {
                    if (!document.querySelector('.error-message')) {
                        const errorMessageElement = document.createElement('p');
                        errorMessageElement.innerText =
                            'Invalid email or password';
                        errorMessageElement.classList.add('error-message');

                        formElement.before(errorMessageElement);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
formElement.addEventListener('submit', submitFormData);
