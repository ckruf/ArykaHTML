const navigation = () => {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
    
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

document.addEventListener('DOMContentLoaded', navigation);
