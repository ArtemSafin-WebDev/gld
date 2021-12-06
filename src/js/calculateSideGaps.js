import { debounce } from 'lodash';

export default function calculateSideGaps() {
    const container = document.querySelector('.container');

    if (!container) return;
    const calculate = () => {
        const documentWidth = document.documentElement.clientWidth;
        const containerWidth = container.offsetWidth;

        const gapWidth = (documentWidth - containerWidth) / 2;

        document.documentElement.style.setProperty('--side-gap', gapWidth + 'px');
    };

    calculate();

    window.addEventListener(
        'resize',
        debounce(() => {
            calculate();
        }, 300)
    );
}
