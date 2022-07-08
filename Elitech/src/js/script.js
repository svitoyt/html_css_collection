"use strict";

const crosses = document.querySelectorAll('.cross_del'),
    btns = document.querySelectorAll('.btn-open'),
    overlay = document.querySelector('.overlay');


for (const cross of crosses) {
    cross.addEventListener('click', function onClick() {
        overlay.classList.add('overlay_no_active');
        document.body.style.overflow = 'visible';
    })
}

window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.overlay__card') && !target.closest('.overlay__card__shops__block__field') && !target.closest('.btn-open')) {
        overlay.classList.add('overlay_no_active');
        document.body.style.overflow = 'visible';
    }
})

for (const btn of btns) {
    btn.addEventListener('click', function onClick() {
        if (overlay.classList.contains('overlay_no_active')) {
            overlay.classList.toggle('overlay_no_active');
            document.body.style.overflow = 'hidden';
        }
    })
}