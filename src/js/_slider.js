export function slider() {
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

