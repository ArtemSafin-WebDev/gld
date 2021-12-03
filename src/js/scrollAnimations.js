import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import imagesLoaded from 'imagesloaded';
import { convertRemToPixels } from './utils';


gsap.registerPlugin(ScrollTrigger, SplitText);



export default function scrollAnimations() {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('.smooth-scroll'),
        smooth: true,
        multiplier: 0.8
    });

    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('.smooth-scroll', {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector('.smooth-scroll').style.transform ? 'transform' : 'fixed'
    });

    const scrollByHash = hash => {
        const elementToScroll = document.querySelector(hash);
        if (elementToScroll) {
            if (window.menuOpen) {
                window.closeMenu();
            } else {
                console.log('menu not open');
            }

            locoScroll.scrollTo(elementToScroll);
        } else {
            console.error('No element to scroll');
        }
    };
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            console.log('Hash', hash);

            if (hash) {
                event.preventDefault();
                scrollByHash(hash);
            }
        }
    });

    const animatedHeadings = Array.from(document.querySelectorAll('.js-animated-header'));

    animatedHeadings.forEach(element => {
        new SplitText(element, { type: 'lines', linesClass: 'lineChild' });

        const lines = Array.from(element.querySelectorAll('.lineChild'));

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=80',
                scroller: '.smooth-scroll'
            }
        });

        tl.from(lines, {
            autoAlpha: 0,
            yPercent: 50,
            stagger: 0.2,
            duration: 0.6
        });
    });

    const blocksToReveal = Array.from(document.querySelectorAll('.js-block-to-reveal'));

    blocksToReveal.forEach(element => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=80',
                end: 'center center',
                scroller: '.smooth-scroll',
                scrub: true
            }
        });

        tl.from(element, {
            autoAlpha: 0,
            duration: 0.6
        });
    });

    function initializeParallaxForProjects() {
        const cards = Array.from(document.querySelectorAll('.projects__results-card'));

        cards.forEach(element => {
            const parallaxWrapper = element.querySelector('.projects__results-card-image-parallax-wrapper');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    scroller: '.smooth-scroll'
                }
            });

            tl.to(parallaxWrapper, {
                y: () => {
                    const pixels = convertRemToPixels(10);
                    console.log('10rem equals pixels: ', pixels);
                    return pixels;
                },
                duration: 0.4
            });
        });
    }

    initializeParallaxForProjects();

    const removeOverlays = Array.from(document.querySelectorAll('.js-remove-overlay'));

    removeOverlays.forEach(element => {
        const overlay = element.querySelector('.js-overlay');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=80',
                scroller: '.smooth-scroll'
            }
        });

        tl.to(overlay, {
            scaleY: 0,
            duration: 0.6
        });
    });

    const videoCards = Array.from(document.querySelectorAll('.js-video-card'));

    videoCards.forEach(element => {
        const play = element.querySelector('.about__film-video-play');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'bottom bottom-=40',
                scroller: '.smooth-scroll'
            }
        });

        tl.to(play, {
            autoAlpha: 1,
            duration: 0.6
        });
    });

    const pageHeader = document.querySelector('.page-header');

    if (pageHeader) {
       
        ScrollTrigger.create({
            trigger: pageHeader,
            start: 'top+=5 top',

            end: 99999999999999,
            pin: true,
            scroller: '.smooth-scroll',
            pinSpacing: false,
            toggleClass: 'sticky-header'
        });

        if (document.querySelector('[data-biege-header-start]')) {
            ScrollTrigger.create({
                trigger: '[data-biege-header-start]',
                start: 'top top',
                endTrigger: '[data-biege-header-end]',
                end: 'top top',
                scroller: '.smooth-scroll',
                pinSpacing: false,

                onToggle: self => {
                    if (self.isActive) {
                        document.body.classList.add('biege-header-mode');
                    } else {
                        document.body.classList.remove('biege-header-mode');
                    }
                }
            });
        }
    }

    const homeIntro = document.querySelector('.home-intro');

    if (homeIntro) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: homeIntro,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                scroller: '.smooth-scroll'
            }
        });

        tl.to('.home-intro__bg-parallax-wrapper', {
            yPercent: 10,
            duration: 0.4
        });
    }

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
    window.addEventListener('load', function() {
        ScrollTrigger.refresh();
    });

    const imgLoad = imagesLoaded('.smooth-scroll');

    imgLoad.on('always', () => {
        ScrollTrigger.refresh();
    });
}
