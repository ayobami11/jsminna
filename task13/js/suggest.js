const formElement = document.querySelector('form');

const validateFormInputs = () => {
    const formInputs = [...document.getElementsByClassName('input-field')];
    const formInputsValid = formInputs.every((input) => input.checkValidity());

    const selectElement = document.querySelector('select');

    return formInputsValid && selectElement.value;
};

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
        console.log(JSON.stringify(user));

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log(response);
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            if (jsonResponse.success) {
                if (document.querySelector('.error-message')) {
                    document.querySelector('.error-message').remove();
                }

                const successMessageElement = document.createElement('p');
                successMessageElement.innerText =
                    'Submission successful!';
                successMessageElement.classList.add('success-message');

                formElement.after(successMessageElement);
            }
        }
    }
};
formElement.addEventListener('submit', submitFormData);
