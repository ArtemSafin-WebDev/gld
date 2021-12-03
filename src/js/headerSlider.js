import { Swiper, EffectFade } from 'swiper';

Swiper.use([EffectFade]);

export default function headerProjectSlider() {
    const elements = Array.from(document.querySelectorAll('.js-header-projects-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        let animationShown = false;

        new Swiper(container, {
            slidesPerView: 1,
            watchOverflow: true,
            // effect: 'fade',
            // fadeEffect: {
            //     crossFade: true
            // }
        });


        element.addEventListener('mouseenter', () => {
            if (!animationShown) {
                element.classList.add('show-work');
                animationShown = true;
            }
        })
    });
}
