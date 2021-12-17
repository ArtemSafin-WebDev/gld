import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import imagesLoaded from 'imagesloaded';
import { convertRemToPixels } from './utils';
import { primaryInput } from 'detect-it';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function scrollAnimations() {
    let locoScroll = null;

    if (primaryInput !== 'touch') {
        document.body.classList.add('loco-scroll-active');
        locoScroll = new LocomotiveScroll({
            el: document.querySelector('.smooth-scroll'),
            smooth: true,
            multiplier: 0.8
        });

        window.locoScroll = locoScroll;

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
    }

    let scrollerOptions = {};

    if (locoScroll) {
        scrollerOptions = {
            scroller: '.smooth-scroll'
        };
    }

    const scrollByHash = hash => {
        const elementToScroll = document.querySelector(hash);
        if (elementToScroll) {
            if (window.menuOpen) {
                window.closeMenu();
            } else {
                console.log('menu not open');
            }

            if (locoScroll) {
                locoScroll.scrollTo(elementToScroll);
            } else {
                gsap.to(window, {
                    duration: 1,
                    ease: 'power2.out',
                    scrollTo: {
                        y: elementToScroll,
                        autoKill: false,
                        offsetY: 0
                    }
                });
            }
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

    const blocksToReveal = Array.from(document.querySelectorAll('.js-block-to-reveal'));

    blocksToReveal.forEach(element => {
        ScrollTrigger.matchMedia({
            '(min-width: 1025px)': function() {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom-=80',
                        end: 'center center',
                        scrub: true,
                        ...scrollerOptions
                    }
                });

                tl.from(element, {
                    autoAlpha: 0,
                    duration: 0.6
                });
            }
        });
    });

    const investors = Array.from(document.querySelectorAll('.js-investors'));

    investors.forEach(element => {
        const topText = element.querySelector('.investors__top-heading-part-text');
        const bottomText = element.querySelector('.investors__bottom-heading-part-text');

        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.page-header',
                        start: 'top+=80 top',
                        end: () => `+=${window.innerHeight}`,
                        scrub: true,
                        markers: false,
                        ...scrollerOptions
                    }
                });

                tl.to(topText, {
                    x: () => -1 * convertRemToPixels(10),
                    duration: 0.6
                });
                tl.to(
                    bottomText,
                    {
                        x: () => convertRemToPixels(10),
                        duration: 0.6
                    },
                    0
                );
            }
        });
    });
    const projectSlidingWords = Array.from(document.querySelectorAll('.js-project-sliding-words'));

    projectSlidingWords.forEach(element => {
        const topText = element.querySelector('.project-gallery__words-top');
        const bottomText = element.querySelector('.project-gallery__words-bottom');

        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                        markers: false,
                        ...scrollerOptions
                    }
                });

                tl.to(topText, {
                    x: () => -1 * convertRemToPixels(7),
                    duration: 0.6
                });
                tl.to(
                    bottomText,
                    {
                        x: () => convertRemToPixels(7),
                        duration: 0.6
                    },
                    0
                );
            }
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
                    ...scrollerOptions
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

    function projectGalleryParallax() {
        const cards = Array.from(document.querySelectorAll('.project-gallery__card'));

        cards.forEach(element => {
            const parallaxWrapper = element.querySelector('.project-gallery__card-parallax-wrapper');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    ...scrollerOptions
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

    projectGalleryParallax();

    const removeOverlays = Array.from(document.querySelectorAll('.js-remove-overlay'));

    removeOverlays.forEach(element => {
        const overlay = element.querySelector('.js-overlay');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=80',
                ...scrollerOptions
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

        ScrollTrigger.matchMedia({
            '(min-width: 641px)': function() {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'bottom bottom-=40',
                        ...scrollerOptions
                    }
                });

                tl.to(play, {
                    autoAlpha: 1,
                    duration: 0.6
                });
            }
        });
    });

    const pageHeader = document.querySelector('.page-header');

    if (pageHeader) {
        ScrollTrigger.create({
            trigger: pageHeader,
            start: () => (!window.matchMedia('(max-width: 640px)').matches ? 'top+=5 top' : 'top top'),

            end: 99999999999999,
            pin: true,
            pinSpacing: false,
            toggleClass: 'sticky-header',
            ...scrollerOptions
        });

        if (document.querySelector('[data-biege-header-start]')) {
            ScrollTrigger.create({
                trigger: '[data-biege-header-start]',
                start: () => `top-=${document.querySelector('.page-header__row').offsetHeight} top`,
                endTrigger: '[data-biege-header-end]',
                end: 'top top',
                pinSpacing: false,
                ...scrollerOptions,
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

    const onFootIllustrations = Array.from(document.querySelectorAll('.js-project-proximity'));

    onFootIllustrations.forEach(element => {
        const human = element.querySelector('.project-location__proximity-illustration-scale-human');
        const scale = element.querySelector('.project-location__proximity-illustration-scale-rule');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                ...scrollerOptions
            }
        });

        tl.to(scale, {
            duration: 0.4,
            '--progress': 1
        });

        tl.to(
            human,
            {
                duration: 0.4,
                x: () => scale.offsetWidth
            },
            0
        );
    });
    const projectFooters = Array.from(document.querySelectorAll('.js-project-footer'));

    projectFooters.forEach(element => {
        const wrapper = element.querySelector('.project-footer__bg-parallax-wrapper');
        const inner = element.querySelector('.project-footer__inner');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
                ...scrollerOptions
            }
        });

        tl.from(inner, {
            yPercent: -100,
            duration: 0.4,
            ease: 'none'
        });

        tl.from(
            wrapper,
            {
                yPercent: 14,
                duration: 0.4,
                ease: 'none'
            },
            0
        );
    });

    const homeIntro = document.querySelector('.home-intro');

    if (homeIntro) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: homeIntro,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                ...scrollerOptions
            }
        });

        tl.to('.home-intro__bg-parallax-wrapper', {
            yPercent: 10,
            duration: 0.4
        });
    }
    const projectIntro = document.querySelector('.project-intro');

    if (projectIntro) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectIntro,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                ...scrollerOptions
            }
        });

        tl.to('.project-intro__bg-parallax-wrapper', {
            yPercent: 10,
            duration: 0.4
        });
    }
    const selectedImage = document.querySelector('.js-selected-image');

    if (selectedImage) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: selectedImage,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                ...scrollerOptions
            }
        });

        const wrapper = selectedImage.querySelector('.project-gallery__selected-image-parallax-wrapper');

        tl.to(wrapper, {
            yPercent: 20,
            duration: 0.4
        });
    }

    ScrollTrigger.addEventListener('refresh', () => {
        if (locoScroll) {
            locoScroll.update();
        }
    });
    ScrollTrigger.refresh();
    window.addEventListener('load', function() {
        ScrollTrigger.refresh();
    });

    const imgLoad = imagesLoaded('.smooth-scroll');

    imgLoad.on('always', () => {
        ScrollTrigger.refresh();
    });
}
