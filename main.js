'use strict';

/*Make navbar change color when it is move */
// get navbar id 
const navbar = document.querySelector('#navbar');
// querySelector<E extends Element = Element>(selectors: string): E | null;  Element return
//navbar heigh
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=>{
    // console.log(window.scrollY); //scroll size 
    // console.log(navbarHeight); //navbar height

    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark'); //add class in navbar
    }else{
        navbar.classList.remove('navbar--dark')
    }
});

/* Handle scrolling when tapping on the navbar menu*/
//navba__menu
const navbarMenu = document.querySelector('.navbar__menu');
//click event to navbar
navbarMenu.addEventListener('click', (event)=>{

    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    // console.log(event.target.dataset.link);// data-link value target 
    scrollIntoView(link);
});

/* Handle click on "Contact Me" button on home*/
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click',(event)=>{
    const link = event.target.dataset.link;
    scrollIntoView(link);
});


/* Make home slowly fate to trasparent as the window scrolls down*/
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity = 1-window.scrollY / homeHeight;
});

/* Show "arrow up" button when scrolling down */
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    }else{;
        arrowUp.classList.remove('visible');
    }
});

/*Handle click on the "arrow up" button*/
arrowUp.addEventListener('click',(event)=>{
    //link : i class : data-set="#home"
    // const target = event.target;
    // const link = target.dataset.link;
    // const goHome = document.querySelector(link);
    // goHome.scrollIntoView({behavior:"smooth"});
    scrollIntoView("#home");
});


function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}




