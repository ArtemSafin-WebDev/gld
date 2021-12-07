import { debounce } from 'lodash';

export default function mobileFullheightBlocks() {
    const elements = Array.from(document.querySelectorAll('.js-mobile-fullheight-block'));

    if (!window.matchMedia('(max-width: 640px)').matches) return;

    elements.forEach(element => {
        element.style.minHeight = document.documentElement.clientHeight + 'px';

        window.addEventListener(
            'resize',
            debounce(() => {
                element.style.minHeight = '';
                requestAnimationFrame(() => {
                    element.style.minHeight = document.documentElement.clientHeight + 'px';
                })
            }, 300)
        );
    });
}
