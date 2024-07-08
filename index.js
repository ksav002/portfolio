const headerLogo = document.querySelector('.header__logo-container');
const menuButtonCont = document.querySelector('.header__nav-res');
const menuButtonOpen = document.querySelector('.menu-open');
const menuButtonClose = document.querySelector('.menu-close');
const headerResContent = document.querySelector('.header__res-content');
const headerResContentLink = document.querySelectorAll('.header__res-content-links a');

headerLogo.addEventListener('click',()=>{
    window.location.href = 'index.html';
});

headerResContentLink.forEach(link => { 
    link.addEventListener('click',()=>{
        console.log('a');
        headerResContent.classList.remove('header__res-content--active');
        menuButtonOpen.classList.remove('menu-d-none');
        menuButtonClose.classList.add('menu-d-none');
    });
});

menuButtonCont.addEventListener('click',()=>{
    if (headerResContent.classList.contains('header__res-content--active')){
        headerResContent.classList.remove('header__res-content--active');
    } else {
        headerResContent.classList.add('header__res-content--active');
    }

    if (menuButtonOpen.classList.contains('menu-d-none')) {
        menuButtonOpen.classList.remove('menu-d-none');
        menuButtonClose.classList.add('menu-d-none');
    } else{
        menuButtonOpen.classList.add('menu-d-none');
        menuButtonClose.classList.remove('menu-d-none');
    }
});