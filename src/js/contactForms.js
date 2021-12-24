import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function contactForms() {
    const elements = Array.from(document.querySelectorAll('.js-form'));

    elements.forEach(element => {
        element.addEventListener('submit', event => {
            event.preventDefault();
            if (
                $(element)
                    .parsley()
                    .isValid()
            ) {
                const formData = new FormData(element);

                element.reset();
                $(element)
                    .parsley()
                    .reset();
                const url = element.action;
                element.querySelector('.form__layer:nth-child(1)').classList.remove('active');
                element.querySelector('.form__layer:nth-child(2)').classList.add('active');
                ScrollTrigger.refresh();

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Ответ сети был не ok.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });

        const backBtn = element.querySelector('.js-form-send-again');

        backBtn.addEventListener('click', event => {
            event.preventDefault();
            element.querySelector('.form__layer:nth-child(1)').classList.add('active');
            element.querySelector('.form__layer:nth-child(2)').classList.remove('active');
            ScrollTrigger.refresh();
        });
    });
}
