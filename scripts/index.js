const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#modal .content .header a");

buttonSearch.addEventListener('click', () => {
    modal.classList.remove("hide");
})

closeButton.addEventListener("click", () => {
    modal.classList.add("hide");
})