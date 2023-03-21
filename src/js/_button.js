let button = document.querySelectorAll(".button")
button.forEach(item => item.addEventListener("click", () => item.classList.toggle("button_active")))
