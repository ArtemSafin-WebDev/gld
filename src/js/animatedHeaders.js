import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function animatedHeadings() {
    const animatedHeadings = Array.from(document.querySelectorAll('.js-animated-header'));

    animatedHeadings.forEach(element => {
        new SplitText(element, { type: 'lines', linesClass: 'lineChild' });

        const lines = Array.from(element.querySelectorAll('.lineChild'));

        let scrollerOptions = {};

        if (window.locoScroll) {
            scrollerOptions = {
                scroller: '.smooth-scroll'
            };
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=80',
                ...scrollerOptions
            }
        });

        tl.from(lines, {
            autoAlpha: 0,
            yPercent: 50,
            stagger: 0.2,
            duration: 0.6
        });
    });
}
