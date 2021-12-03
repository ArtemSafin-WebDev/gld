export default function cookies() {
    const cookies = document.querySelector('.home-intro__cookies');
    const closeBtn = document.querySelector('.home-intro__cookies-close');

    if (cookies) {
        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            cookies.classList.add('hidden');
        });
    }
}
