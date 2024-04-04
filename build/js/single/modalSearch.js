document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".js-overlay");
  const search = document.querySelector(".modal-search");
  const searchBtnOpen = document.querySelector(".js-search-btn");
  const searchBtnClose = document.querySelector(".modal-search__button");

  function toggleSearchModal() {
    overlay.classList.toggle("active");
    search.classList.toggle("active");
    if (overlay.classList.contains("active")) {
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 576) {
        document.documentElement.style.paddingRight = "17px";
      }
    } else {
      document.body.style.overflow = "auto";
      if (window.innerWidth > 576) {
        document.documentElement.style.paddingRight = "";
      }
    }
  }

  [searchBtnOpen, searchBtnClose, overlay].forEach((el) => {
    el.addEventListener("click", toggleSearchModal);
  });
});
