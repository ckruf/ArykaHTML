const handleCarousel = () => {
    const cardsContainer = document.querySelector('.cards-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    scrollLeftBtn.addEventListener('click', () => {
        cardsContainer.scrollLeft -= cardsContainer.offsetWidth;
    });
    
    scrollRightBtn.addEventListener('click', () => {
        cardsContainer.scrollLeft += cardsContainer.offsetWidth;
    });
}

document.addEventListener('DOMContentLoaded', handleCarousel);