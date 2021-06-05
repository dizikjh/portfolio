'use strict';

/*Make navbar change color when it is move */
// get navbar id 
const navbar = document.querySelector('#navbar');
// querySelector<E extends Element = Element>(selectors: string): E | null;  Element return
//navbar heigh
const navbarHeight = navbar.getBoundingClientRect().height;
//navba__menu -  navbar click event /toggle small screen
const navbarMenu = document.querySelector('.navbar__menu');

document.addEventListener('scroll', ()=>{
    // console.log(window.scrollY); //scroll size 
    // console.log(navbarHeight); //navbar height

    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark'); //add class in navbar
    }else{
        navbar.classList.remove('navbar--dark')
    }
    navbarMenu.classList.remove('open'); // navbar 움직일시 small screen toggle 제거
});

/* Handle scrolling when tapping on the navbar menu*/

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

/* Navbar toggle button for small screen */
const navbarToggleBtn = document.querySelector('.navbar__toggle-button');
navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle("open");
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
    //link : i class : data-link="#home"
    // const target = event.target;
    // const link = target.dataset.link;
    // const goHome = document.querySelector(link);
    // goHome.scrollIntoView({behavior:"smooth"});
    scrollIntoView("#home");
});

/* Show Projects in work*/
//button = document.querySelectorAll 로 받으면 event click시 forEach를 돌려야 한다.
const workBtnContainer = document.querySelector('.work__categories'); //Parents of button 
const ProjectContainer = document.querySelector('.work__projects'); //for animation
const projects = document.querySelectorAll('.project'); // array All project
workBtnContainer.addEventListener('click',(e)=>{
     // button 안에 span 이있다, parentNode로 처리
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    //Remove selction form previous item and select new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');
    // e.target.classList.add('selected'); //span에 할당 된다

    ProjectContainer.classList.add('anim-out'); // animation 
    setTimeout(() => { //browser 제공 api = 코드 다 실행 하고 이후 실행
        //for(let i =0; i <projects.length; i++){ project = projects[i]}
        //for(let project of projects){  }
        projects.forEach((project)=>{
            if(filter ==='*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });

        //시간 지난뒤에 애니메이션 ClassList 없애 준다.
        ProjectContainer.classList.remove('anim-out');
    },300)
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}




