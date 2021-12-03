import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import imagesLoaded from 'imagesloaded';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function scrollAnimations() {
    
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".smooth-scroll"),
        smooth: true,
        multiplier: 0.8
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, 
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
    });


    




    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    window.addEventListener('load', function() {
        ScrollTrigger.refresh();
    })

    imagesLoaded.on('always', () => {
        ScrollTrigger.refresh();
    })
}