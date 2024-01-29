
let menu = document.querySelector('.hamburger');
let navbar = document.querySelector('.menuList');

menu.onclick = () => {
    navbar.classList.toggle('active');
}

let subMenu = document.querySelector('.subMenu');
let subMenuList = document.querySelector('.subMenuList');

subMenu.onclick = () => {
    subMenuList.classList.toggle('active');
}