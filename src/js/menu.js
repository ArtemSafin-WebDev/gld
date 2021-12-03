import { Swiper, Navigation, Parallax } from 'swiper';

Swiper.use([Navigation, Parallax]);

export default function menu() {
    const menuSliderContaniner = document.querySelector('.menu__slider .swiper-container');

    if (menuSliderContaniner) {
        new Swiper(menuSliderContaniner, {
            watchOverflow: true,
            slidesPerView: 'auto',
            speed: 800,
            loop: true,
            loopedSlides: 3,
            loopAdditionalSlides: 2,
            parallax: true
        });
    }
}
