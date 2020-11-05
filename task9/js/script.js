const hamburgerIcon = document.querySelector('.hamburger');

// Displays the navbar for smaller screens when hambugerIcon is clicked
const toggleMenu = () => {
    const hamburgerSection = document.querySelector('.hamburger-section');
    const blurElements = [
        ...document.getElementsByTagName('section'),
        document.querySelector('footer')
    ];

    blurElements.forEach((element) => element.classList.toggle('blur'));
    hamburgerSection.classList.toggle('toggle-hamburger');

    if (hamburgerIcon.classList.contains('fa-bars')) {
        hamburgerIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        hamburgerIcon.classList.replace('fa-times', 'fa-bars');
    }
};

hamburgerIcon.addEventListener('click', toggleMenu);
