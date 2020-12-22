const formElement = document.querySelector('form');

/**
 * Returns a boolean indicating if all form inputs are valid
 */
const validateFormInputs = () => {
    const formInputs = [...document.getElementsByClassName('input-field')];
    const formInputsValid = formInputs.every((input) => input.checkValidity());

    const selectElement = document.querySelector('select');

    return formInputsValid && selectElement.value;
};

/**
 * Makes a request to the API and returns feedback for the user
 * 
 * @param {object} event The event object
 */
const submitFormData = async (event) => {
    event.preventDefault();

    if (validateFormInputs()) {
        const form = event.target;
        const endpoint = form.action;
        const formData = new FormData(form);

        const user = {};
        for (const [name, value] of formData) {
            user[name] = value;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
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
                    successMessageElement.innerText = 'Submission successful!';
                    successMessageElement.classList.add('success-message');

                    setTimeout(() => window.location.href = './index.html', 3000);

                    formElement.after(successMessageElement);
                } else {
                    if (!document.querySelector('.error-message')) {
                        const failureMessageElement = document.createElement(
                            'p'
                        );
                        failureMessageElement.innerText =
                            'Submission failed! Please try again later.';
                        failureMessageElement.classList.add('error-message');

                        formElement.after(failureMessageElement);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
};
formElement.addEventListener('submit', submitFormData);
