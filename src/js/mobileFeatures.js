export default function mobileFeatures() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;

    const elements = Array.from(document.querySelectorAll('.js-mobile-features'));

    elements.forEach(element => {
        const mobileGrid = document.createElement('div');
        mobileGrid.className = 'project-footer__mobile-features-grid';

        const firstCol = document.createElement('div');
        firstCol.classList = 'project-footer__mobile-features-grid-col';

        const secondCol = document.createElement('div');
        secondCol.classList = 'project-footer__mobile-features-grid-col';

        mobileGrid.append(firstCol, secondCol);

        element.prepend(mobileGrid);

        const items = Array.from(element.querySelectorAll('.projects-footer__features-list-item'));

        items.forEach(item => {
            const top = item.querySelector('.projects-footer__features-card-top');
            const bottom = item.querySelector('.projects-footer__features-card-bottom');

            firstCol.append(top);
            secondCol.append(bottom);
        });

        const list = element.querySelector('ul');
        if (list) {
            list.remove();
        }

        
    });
}
