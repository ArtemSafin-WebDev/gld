import { Swiper, EffectFade } from 'swiper';

Swiper.use([EffectFade]);

export default function headerProjectSlider() {
    const elements = Array.from(document.querySelectorAll('.js-header-projects-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        let animationShown = false;
        let instance = null;
        let timer = null;

        function initializeSlider() {
            instance = new Swiper(container, {
                slidesPerView: 1,
                watchOverflow: true
            });
        }

        initializeSlider();

        let prevWidth = window.innerWidth;

        window.addEventListener('resize', () => {
            if (window.innerWidth !== prevWidth) {
                location.reload();
            }
        });

        element.addEventListener('mouseenter', () => {
            if (!animationShown) {
                element.classList.add('show-work');
                animationShown = true;
            }
        });
    });
}
