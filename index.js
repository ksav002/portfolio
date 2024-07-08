const headerLogo = document.querySelector('.header__logo-container')
const menuButtonCont = document.querySelector('.header__nav-res');
const menuButtonOpen = document.querySelector('.menu-open');
const menuButtonClose = document.querySelector('.menu-close');

headerLogo.addEventListener('click',()=>{
    window.location.href = 'index.html';
});

menuButtonCont.addEventListener('click',()=>{

    

    if (menuButtonOpen.classList.contains('menu-d-none')) {
        menuButtonOpen.classList.remove('menu-d-none');
        menuButtonClose.classList.add('menu-d-none');
    } else{
        menuButtonOpen.classList.add('menu-d-none');
        menuButtonClose.classList.remove('menu-d-none');
    }
});