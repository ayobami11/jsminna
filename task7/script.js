const hamburgerIcon = document.querySelector('.hamburger');

// Displays the navbar for smaller screens
const toggleMenu = () => {
    const logo = document.querySelector('.logo');
    const navbar = document.querySelector('.navbar');

    if (hamburgerIcon.classList.contains('fa-bars')) {
        hamburgerIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        hamburgerIcon.classList.replace('fa-times', 'fa-bars');
    }
    navbar.classList.toggle('hide');
    logo.classList.toggle('hide');
};

hamburgerIcon.addEventListener('click', toggleMenu);
