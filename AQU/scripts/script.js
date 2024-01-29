let menu = document.querySelector('#menuBar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-angle-double-down');
    navbar.classList.toggle('active')
}

window.onscroll = () =>{
    menu.classList.remove('fa-angle-double-down');
    navbar.classList.remove('active')
}