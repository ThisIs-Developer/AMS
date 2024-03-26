const sideMenu=document.querySelector(".dashboard");
const menuBtn=document.querySelector("#menu-btn");
const closeBtn=document.querySelector(".close");

menuBtn.addEventListener('click',()=> {
    sideMenu.style.display ='block';
})

closeBtn.addEventListener('click',()=> {
    sideMenu.style.display ='none';
})