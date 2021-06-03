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
})

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
    console.log(event.target.dataset.link);// data-link value target 
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior: "smooth"});
});