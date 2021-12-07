import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function latestNews() {
    const elements = Array.from(document.querySelectorAll('.js-latest-news-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 10,
            slidesPerView: 'auto',
            navigation: {
                nextEl: element.querySelector('.latest-news__slider-arrow--next'),
                prevEl: element.querySelector('.latest-news__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    });
}
