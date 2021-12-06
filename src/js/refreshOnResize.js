import { debounce } from 'lodash';

export default function refreshOnResize() {
    let prevWidth = window.innerWidth;

    window.addEventListener(
        'resize',
        debounce(() => {
            if (window.innerWidth !== prevWidth) {
                location.reload();
            }
        }, 300)
    );
}
