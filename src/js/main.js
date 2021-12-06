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


document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    validation();
    customSelects();
    masks();
    fileUpload();
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
    calculateSideGaps();
    refreshOnResize();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(() => document.body.classList.add('animatable'), 300);
})
