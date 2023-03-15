AOS.init({
    duration: 1500,
    disabled: "mobile"
});

(function slider(){
    let sliderLine = document.querySelector(".slider__line"),
    sliderItem = [...document.querySelectorAll(".slider__item")],
    next = document.querySelector(".slider__next"),
    prev = document.querySelector(".slider__prev");
    
    let itemShow, itemScroll;
    let clock = setInterval(() => slideMove(1), 6000)

    media()
    let firstClone = sliderItem.reduce((arr, item, index) => {
        if(index < itemShow){
            arr.push(item.cloneNode(true));
        }
        return arr;
    },[]) 
    let lastClone = sliderItem.reduce((arr, item, index) => {
        if(index > (sliderItem.length - 1 - itemShow)){
            arr.push(item.cloneNode(true));
        }
        return arr;
    },[]) 
    sliderLine.append(...firstClone)
    sliderLine.prepend(...lastClone)

    let itemsLength = document.querySelectorAll(".slider__item").length,
        allowShift = true,
        itemWidth = sliderItem[0].clientWidth,
        scrollWidth = itemWidth * itemScroll,
        sliderWidth =  (itemsLength - itemShow) * -itemWidth,
        offset = -itemWidth *itemShow,
        currentItemShow = itemShow;

    sliderLine.style.transform = `translate3d(${offset}px,0px,0px)`

    window.addEventListener("resize", resize)
    next.addEventListener("click", () => slideMove(1))
    prev.addEventListener("click", () => slideMove(-1))
    sliderLine.addEventListener("transitionend",checkPos)

    function checkPos(){
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
    function slideMove(number){
        sliderLine.classList.add("shifting")
        if(allowShift){
            let currentItems;
            if(number == 1){
                currentItems = itemsLength - (Math.abs(offset) + itemShow *itemWidth) /itemWidth;
                currentItems >= itemScroll? offset -= scrollWidth: offset -= itemWidth*currentItems;    
            }
            if(number == -1){
                currentItems = Math.abs(offset) / itemWidth;
                currentItems >= itemScroll? offset += scrollWidth: offset += itemWidth*currentItems;
            }
            scroll();
            allowShift = false;
        }
    }
    function resize(){
        media();
        if( currentItemShow != itemShow){
            firstClone.forEach( item => item.remove())
            lastClone.forEach( item => item.remove())

            firstClone = sliderItem.reduce((arr, item, index) => {
                if(index < itemShow){
                    arr.push(item.cloneNode(true));
                }
                return arr;
            },[]) 
            lastClone = sliderItem.reduce((arr, item, index) => {
                if(index > (sliderItem.length - 1 - itemShow)){
                    arr.push(item.cloneNode(true));
                }
                return arr;
            },[]) 

            sliderLine.append(...firstClone)
            sliderLine.prepend(...lastClone)

            currentItemShow = itemShow;
        }
        itemWidth = document.querySelectorAll(".slider__item")[0].clientWidth 
        itemsLength = document.querySelectorAll(".slider__item").length
        offset = -itemWidth *itemShow;
        scrollWidth = itemWidth * itemScroll;
        sliderWidth =  (itemsLength - itemShow) * -itemWidth;
        scroll();
    }
    function scroll(){
        sliderLine.style.transform = `translate3d(${offset}px,0px,0px)`;
    }
    function media(){
        if(document.body.offsetWidth > 991.98){
            itemShow = 2;
            itemScroll = 1;
        }
        if(document.body.offsetWidth <= 991.98){
            itemShow = 1;
            itemScroll = 1;
        }

    }
})()
function burgerMenu(){
   

   let burgerBtn = document.querySelector(".burger"),
        menu = document.querySelector(".header__nav"),
        flag = true;
    burgerBtn.addEventListener("click", toggleMenu)


    function toggleMenu(){
        burgerBtn.classList.toggle("burger_active")
        menu.classList.toggle("header__nav_active")
        document.body.classList.toggle("lock")
        lock()
        flag = !flag
    }
    function lock(){
        let elem = document.createElement("div")
        elem.style.cssText = "width: 20px;  height:20px; overflow:scroll;"
        document.body.append(elem)
        let scrollBar = elem.offsetWidth - elem.clientWidth;
        elem.remove()

        document.body.style.paddingRight = flag?scrollBar +"px":"";
        document.querySelectorAll(".lock-padding").forEach(
          item => item.style.paddingRight = flag?scrollBar +"px":""
        )
    }
}
burgerMenu()