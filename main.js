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
// const activeMenu = document.querySelector('.navbar__menu__item.active');//avtive인것을 찾는다. 1)
navbarMenu.addEventListener('click', (event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    // activeMenu.classList.remove('active'); //border지우기 2)
    // target.classList.add('active'); //클릭한 곳에 border 넣기 3)

    scrollIntoView(link); //scroll
    // selectNavItemFunc(target); //wheel로 했기 때문에 직접 그려 줘야한다 - scrollIntoView로 이동   
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

/* intersection observer를 이용한 nav active 변경*/
/* William version
const sections = document.querySelectorAll('.section');//1.모든 section tag 호출
//2.intersection object 선언 및 설정 값/intersection observer를 호출 및 option 설정
const options ={
    root:null,
    rootMargin: '0px',
    threshold: 0.5,
};
const callback =(entries,observer) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            // targetNav.target.classList.add('active');
        }else{
            // targetNav.target.classList.add('active');
        }
    });
};
const observer = new IntersectionObserver(callback, options);
// 3.각 section을 돌리면서 observer 심기
sections.forEach(section=>observer.observe(section));
*/

/*요구사항 -기능 : 1. 해당 섹션의 메뉴 아이템 활성화 
2. 메뉴 클릭시 이동하는것에 문제가 되지 않게 구현
3. 윈도우 창이 작아지거나 모바일 모드에서도 동작

스크롤시 성능에 문제 되지 않도록 만들어야 한다 : 사용자 실시간 인터렉션할때 성능에 문제가 되면 안된다. */

//1. 모든 섹션 요소들을 가지고 온다
//2. InterscectionObserver를 이용해서 모든 섹션들을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonior',
    '#contact',
]; //배열 돌면서 , 각각의 아이디를 섹션 돔 요소로 변환하는 새로운 배열 만듬 == map 이 새로운 배열 만든다.
const sections = sectionIds.map(id => document.querySelector(id)); // section 가져옴
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`)); // datalink 속성'[속성="a"]'이용해서 nav 가져옴

let selectedNavIndex = 0;
let selectedNavItem = navItems[0]; //nav active 활성화 지우기(1),초기화 첫 값은 home으로 지정

function selectNavItemFunc(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector); //section으로 이동
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItemFunc(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root : null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer)=>{
    entries.forEach(entry =>{
        /* isIntersecting을 true로 할때 코딩 더 간단해짐
        if(entry.isIntersecting){ 
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            selectedNavItem.classList.remove('active');
            selectedNavItem = navItems[index];
            const navItem = navItems[index].classList.add('active');
        }*/
        if(!entry.isIntersecting && entry.intersectionRatio > 0 ){ //요소가 윈도우로 들어오는 상태 true 나가는 상태 false - 나가는 상태이면
            const index = sectionIds.indexOf(`#${entry.target.id}`); // id에 해당하는 sectionIds에 인덱스 값을 가지고 온다.

            //아래로 스크롤 페이지 올라옴 = content y =minus
            if(entry.boundingClientRect.y <0){
                selectedNavIndex = index +1;
            }else{
                selectedNavIndex = index -1;
            }
            /* 함수로 처리
            selectedNavItem.classList.remove('active');//nav active 활성화 지우기(2);
            selectedNavItem = navItems[selectedNavIndex];//nav active 활성화 지우기(3)- 해당 section id에 (active 된)인덱스의 nav를 넣는다.;
            selectedNavItem.classList.add('active');// const navItem = navItems[selectedIndex].classList.add('active');*/
            //selectNavItemFunc(navItems[selectedNavIndex]); 스크롤이 될때 마다 해당하는 메뉴를 선택하게 만들기
        }
    });
}

const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section => observer.observe(section));

//콜백함수와 이벤트 리스너 안에선 아주 간단한 계산만 진행한다
window.addEventListener('wheel',() =>{ //모든 scroll 시에 등록'scroll' // 사용자가 스스로 스크롤 할때는 'wheel'을 사용한다
    if(window.scrollY === 0){ // 스크롤이 가장 위에 있을경우
        selectedNavIndex = 0;
    }else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHiegnt){
    //스크롤이 가장 아래 있을 경우, 스크롤 된 높이>=전체높이 
        selectedNavIndex = navItems.length -1;
    } 
    selectNavItemFunc(navItems[selectedNavIndex]); 

})
