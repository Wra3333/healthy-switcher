let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
function burgerMenu() {

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
    function toggleMenu({target}) {
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
function slider() {
    let slider = document.querySelector(".slider"),
        sliderLine = document.querySelector(".slider__line"),
        sliderItem = [...document.querySelectorAll(".slider__item")],
        next = document.querySelector(".slider__next"),
        prev = document.querySelector(".slider__prev");

    let tabletLess = window.matchMedia("(min-width: 991.98px)"),
        tabletMore = window.matchMedia("(max-width: 991.98px)"),
        mobile = window.matchMedia("(max-width: 479.98px)");

    let allowShift = true;
        
    let itemShow, itemScroll, itemWidth, itemsLength, scrollWidth, sliderWidth, offset, firstClone, lastClone;
    init()
        
    setInterval(() => slideMove(1), 6000)
    tabletLess.addEventListener("change", resize)
    tabletMore.addEventListener("change", resize)
    mobile.addEventListener("change", resize)
    next.addEventListener("click", () => slideMove(1))
    prev.addEventListener("click", () => slideMove(-1))
    sliderLine.addEventListener("transitionend", checkPos)

    function checkPos() {
        sliderLine.classList.remove("shifting")
        if (offset == sliderWidth) {
            offset = -itemShow * itemWidth;
            scroll()
        }
        if (offset == 0) {
            offset = sliderWidth + itemShow * itemWidth;
            scroll()
        }
        allowShift = true
    }
    function slideMove(number) {
        sliderLine.classList.add("shifting")
        if (allowShift) {
            let currentItems;
            if (number == 1) {
                currentItems = itemsLength - (Math.abs(offset) + itemShow * itemWidth) / itemWidth;
                currentItems >= itemScroll ? offset -= scrollWidth : offset -= itemWidth * currentItems;
            }
            if (number == -1) {
                currentItems = Math.abs(offset) / itemWidth;
                currentItems >= itemScroll ? offset += scrollWidth : offset += itemWidth * currentItems;
            }
            scroll();
                   allowShift = false;
        }
    }
    function resize() {
        firstClone.forEach(item => item.remove())
        lastClone.forEach(item => item.remove())
        init()
    }
    function scroll() {
        slider.style.setProperty("--offset", offset + "px")
    }
    function init() {
        if (tabletLess.matches) {
            itemShow = 2;
            itemScroll = 1;
        }
        else {
            itemShow = 1
            itemScroll = 1
        }
        
        firstClone = sliderItem.reduce((arr, item, index) => {
            if (index < itemShow) {
                arr.push(item.cloneNode(true));
            }
            return arr;
        }, [])
        lastClone = sliderItem.reduce((arr, item, index) => {
            if (index > (sliderItem.length - 1 - itemShow)) {
                arr.push(item.cloneNode(true));
            }
            return arr;
        }, [])
        sliderLine.append(...firstClone)
        sliderLine.prepend(...lastClone)

        itemsLength = document.querySelectorAll(".slider__item").length
        itemWidth = document.querySelector(".slider__item").clientWidth
        scrollWidth = itemWidth * itemScroll
        sliderWidth = (itemsLength - itemShow) * -itemWidth
        offset = -itemWidth * itemShow
        scroll()
    }
}
burgerMenu()
slider()
let button = document.querySelectorAll(".button")
button.forEach(item => item.addEventListener("click", () => item.classList.toggle("button_active")))
let drop = document.querySelectorAll(".header__button"),
    dropdown = document.querySelector(".header__dropdown");
    
let media = window.matchMedia("(min-width: 991.98px)");

drop.forEach(item => item.addEventListener("click", () => {
        dropdown.classList.toggle("header__dropdown_active")
}))
media.addEventListener("change", () => dropdown.classList.remove("header__dropdown_active")) 
AOS.init({duration: 1500});
