let drop = document.querySelectorAll(".header__button"),
    dropdown = document.querySelector(".header__dropdown");
    
    let media = window.matchMedia("(min-width: 991.98px)");

drop.forEach(item => item.addEventListener("click", () => {
        dropdown.classList.toggle("header__dropdown_active")
}))
media.addEventListener("change", () => dropdown.classList.remove("header__dropdown_active")) 
