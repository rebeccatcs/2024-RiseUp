// MENU MOBILE
let btnAbrirMenu = document.getElementById('btn-abrir-menu')
let btnFecharMenu = document.getElementById('btn-fechar-menu')
let itensMenu = document.getElementById('itens-menu')
let overlay = document.getElementById('overlay-menu')
let menu = document.getElementById('menu-mobile')

btnAbrirMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

btnFecharMenu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

itensMenu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})