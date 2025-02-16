
AOS.init({
    duration: 1200,
});

const staffContainer = document.querySelector('.staffBox-item');
const scrollLeftButton = document.getElementById('scrollLeft');
const scrollRightButton = document.getElementById('scrollRight');

scrollLeftButton.addEventListener('click', () => {
    staffContainer.scrollBy({ left: -200, behavior: 'smooth' });
});

scrollRightButton.addEventListener('click', () => {
    staffContainer.scrollBy({ left: 200, behavior: 'smooth' });
});

function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("hidden");
}