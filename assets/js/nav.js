const elem = document.querySelector('#nav-bg'),
    toggleBtn = document.querySelector('#toggle-btn'),
    elemH = elem.getBoundingClientRect().height,
    elemW = elem.getBoundingClientRect().width;

let open = false;
let scale, offsetX, offsetY;

const calculateValues = (() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offsetValue = Number(getComputedStyle(elem).getPropertyValue('--offset-value'));

    offsetX = (w/2) - (elemW/2) - offsetValue;
    offsetY = (h/2) - (elemH/2) - offsetValue;

    const radius = Math.sqrt((h ** 2)+(w ** 2));
    scale = radius/(elemW/2)/2 + .1;
    return scale;
})


const openMenu = () => {
    elem.style.setProperty("--translate-x", `${offsetX}px`);
    elem.style.setProperty("--translate-y", `-${offsetY}px`);
    elem.style.setProperty("--scale", scale);
}
const closeMenu = () => {
    elem.style.setProperty("--scale", 1);
    elem.style.setProperty("--translate-x", 0);
    elem.style.setProperty("--translate-y", 0);
}
const animateMenu = () => {
    open ? openMenu() : closeMenu();
};

const toggleMenu = () => {
    open = !open;
    animateMenu();
    toggleBtn.classList.toggle('shown');
}

const resizeHandler = () => {
    window.requestAnimationFrame(() => {
        calculateValues();
        animateMenu();
    });
}

calculateValues();

toggleBtn.addEventListener('click', toggleMenu, false);
window.addEventListener("resize", resizeHandler, false);
