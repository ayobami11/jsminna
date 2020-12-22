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
 * Makes a request to the API and returns feedback for the user
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

                    const successMessageElement = document.createElement('p');
                    successMessageElement.innerText =
                        'Registration successful!';
                    successMessageElement.classList.add('success-message');

                    formElement.after(successMessageElement);
                    setTimeout(
                        () => (window.location.href = './login.html'),
                        3000
                    );
                } else {
                    if (!document.querySelector('error-message')) {
                        const failureMessageElement = document.createElement(
                            'p'
                        );
                        failureMessageElement.innerText =
                            'Registration failed! Please try again later.';
                        failureMessageElement.classList.add('error-message');

                        formElement.after(failureMessageElement);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
formElement.addEventListener('submit', submitFormData);
