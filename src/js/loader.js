export function loader() {
    document.addEventListener('click', event => {
        if (document.body.classList.contains('admin-bar')) return;
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');

            if (
                link.hostname !== location.hostname ||
                link.href.match(/^mailto\:/) ||
                link.href.match(/^tel\:/) ||
                link.matches('[data-fancybox]') ||
                link.hash ||
                link.matches("[href^='#']") ||
                link.matches('.case__content-quote-detail-link') ||
                link.matches('[download]') ||
                link.matches('[target="_blank"]')
            ) {
                // console.log('Link not internal', link);
                return;
            } else {
                event.preventDefault();

                document.body.classList.add('transition-loader');
                requestAnimationFrame(() => {
                    document.body.classList.add('transition-loader-active');
                });

                const DURATION = window.matchMedia('(max-width: 640px)').matches ? 500 : 1000;

                setTimeout(() => {
                    window.location = link.href;
                }, DURATION);
            }
        }
    });
}
