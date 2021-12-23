import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function tabs() {
    const elements = Array.from(document.querySelectorAll('.js-tabs-container'));

    elements.forEach(element => {
        const btns = Array.from(element.querySelectorAll('.js-tabs-btn'));
        const items = Array.from(element.querySelectorAll('.js-tabs-item'));

        const setActiveItem = index => {
            btns.forEach(btn => btn.classList.remove('active'));
            items.forEach(item => item.classList.remove('active'));

            btns[index].classList.add('active');
            items[index].classList.add('active');

            ScrollTrigger.refresh();
        };

        btns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                setActiveItem(btnIndex);
            });
        });
    });
}
