export function burgerMenu() {

    let burgerBtn = document.querySelector(".burger"),
        menu = document.querySelector(".header__nav");

    let mediaBurger = window.matchMedia("(min-width: 991.98px)")

    let SCROLL_BAR,
        timeout = 900,
        unloack = true,
        togglerMenu = true;


    burgerBtn.addEventListener("click", toggleMenu)
    mediaBurger.addEventListener("change", clearBurger)
   
    function clearBurger() {
        burgerBtn.classList.remove("burger_active")
        menu.classList.remove("header__nav_active")
        document.body.classList.remove("lock")
        document.querySelector(":root").style.setProperty("--scroll-bar", 0+"px")
        togglerMenu = true;
    }
    function setScrollBar() {
        SCROLL_BAR = window.innerWidth - document.documentElement.clientWidth;
        document.querySelector(":root").style.setProperty("--scroll-bar", SCROLL_BAR + "px")
    }
    function toggleMenu() {
        if(unloack){
            burgerBtn.classList.toggle("burger_active")
            menu.classList.toggle("header__nav_active")
            lock()
            togglerMenu = !togglerMenu
        }
    }
    function lock() {
        if (togglerMenu) {
            setScrollBar();
            document.body.classList.add("lock")
        }
        else {
            unloack = false
            setTimeout(() => {
                setScrollBar();
                document.body.classList.remove("lock")
                unloack = true
            }, timeout);
        }
    }
}