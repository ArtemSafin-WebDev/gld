import { Swiper, Navigation, Parallax } from 'swiper';

Swiper.use([Navigation, Parallax]);

export default function menu() {
    const menuSliderContaniner = document.querySelector('.menu__slider .swiper-container');

    if (menuSliderContaniner) {
        new Swiper(menuSliderContaniner, {
            watchOverflow: true,
            slidesPerView: 'auto',
            speed: 800,
            loop: false,
            loopedSlides: 3,
            loopAdditionalSlides: 2,
            parallax: true,
            navigation: {
                nextEl: '.menu__slider-arrow--next',
                prevEl: '.menu__slider-arrow--prev'
            }
        });
    }

    const openBurger = document.querySelector('.page-header__burger-btn');
    const closeBurger = document.querySelector('.menu__burger');
    const menu = document.querySelector('.menu');

    if (!openBurger) return;

    console.log('Menu script');
    let menuOpen = false;
    const openMenu = () => {
        if (menuOpen) return;
        document.body.classList.add('menu-open');
        menuOpen = true;
    };

    const closeMenu = () => {
        if (!menuOpen) return;
        document.body.classList.remove('menu-open');
        menuOpen = false;
    };

    openBurger.addEventListener('click', event => {
        event.preventDefault();
        openMenu();
    });
    closeBurger.addEventListener('click', event => {
        event.preventDefault();
        closeMenu();
    });
}
