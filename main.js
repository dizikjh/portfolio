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