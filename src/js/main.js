import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import masks from './masks';
import fileUpload from './fileUpload';
import anchorLinks from './anchorLinks';
import mediaPlayer from './mediaPlayer';
import datepicker from './datepicker';
import accordions from './accordions';
import modals from './modals';
import latestNews from './latestNews';
import headerProjectSlider from './headerSlider';
import menu from './menu';
import scrollAnimations from './scrollAnimations';
import cookies from './cookies';
import calculateSideGaps from './calculateSideGaps';
import refreshOnResize from './refreshOnResize';
import mobileFullheightBlocks from './mobileFullheightBlocks';
import mobileFeatures from './mobileFeatures';
import { loader } from './loader';

import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import animatedHeadings from './animatedHeaders';
import tabs from './tabs';
import contactForms from './contactForms';

gsap.registerPlugin(SplitText);

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    calculateSideGaps();
    loader();
    validation();
    customSelects();
    masks();
    fileUpload();
    mobileFeatures();
    anchorLinks();
    accordions();
    mediaPlayer();
    modals();
    datepicker();
    latestNews();
    headerProjectSlider();
    menu();
    scrollAnimations();
    cookies();

    refreshOnResize();
    mobileFullheightBlocks();
    tabs();
    contactForms();

    setTimeout(() => {
        document.body.classList.add('animatable');
        homeIntro();
    }, 3000);
});


let homeIntroAnimated = false;

function homeIntro() {
  
    const homeIntro = document.querySelector('.home-intro');
    if (!homeIntro || homeIntroAnimated || window.matchMedia("(max-width: 640px)").matches) return;
    homeIntroAnimated = true;
    const heading = document.querySelector('.home-intro__main-heading');

    const tl = gsap.timeline();

    new SplitText(heading, { type: 'lines', linesClass: 'lineChild' });

    const lines = Array.from(heading.querySelectorAll('.lineChild'));

    tl.from(lines, {
        autoAlpha: 0,
        yPercent: 50,
        stagger: 0.2,
        duration: 0.4
    });

    const otherElements = [
        document.querySelector('.page-header__logo'),
        document.querySelector('.page-header__nav-wrapper'),
        document.querySelector('.page-header__projects'),
        document.querySelector('.page-header__info'),
        document.querySelector('.home-intro__cookies'),
        document.querySelector('.home-intro__scroll-down-link')
    ];

    tl.from(otherElements, {
        autoAlpha: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.4,
        clearProps: 'all'
    });
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    animatedHeadings();
    setTimeout(() => {
        document.body.classList.add('animatable');
        homeIntro();
    }, 300);
});
