let link = document.querySelectorAll(".header__link")
link.forEach(item => item.addEventListener("click", (e) => {
    let a = document.querySelector(".header__dropdown")
    if (window.innerWidth < 991.98) {
        e.preventDefault();
        a.classList.toggle("header__dropdown_active")
    }
}))