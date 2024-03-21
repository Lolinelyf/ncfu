document.addEventListener("DOMContentLoaded", function () {
  // меню
  const hamburgerBtn = document.querySelector(".js-hamburger-btn");
  const navigationEl = document.querySelector(".js-navigation");
  const overlay = document.querySelector(".js-menu-overlay");

  function toggleMenu() {
    if (!navigationEl.classList.contains("open")) {
      navigationEl.classList.add("open");
      document.documentElement.style.overflow = "hidden";
      return;
    }
    navigationEl.classList.remove("open");
    document.documentElement.style.overflow = "auto";
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  window.addEventListener("resize", () => {
    navigationEl.classList.remove("open");
    document.documentElement.style.overflow = "auto";
  });

  // закрытие меню при клике по пункту
  const menuLinkEls = document.querySelectorAll(".navigation__link");
  for (let i = 0; i < menuLinkEls.length; i++) {
    menuLinkEls[i].addEventListener("click", toggleMenu);
  }

  window.addEventListener(
    "click",
    (event) => {
      if (event.target === overlay) {
        toggleMenu();
      }
    },
    true
  );

  // меню
  // const hamburgerBtnEl = document.querySelector('.js-hamburger-btn');
  // const menuEl = document.querySelector('.js-menu');
  // hamburgerBtnEl.addEventListener('click', function () {
  //   hamburgerBtnEl.classList.toggle('hamburger_status_opened');
  //   menuEl.classList.toggle('navigation__menu_status_opened');
  // })

  // версия для слабовидящих
  // new isvek.Bvi();

  // // уведомление о куках
  // const jsCookieNoticeEl = document.querySelector('.js-cookie-notice');
  // const btnAccept = document.querySelector('.js-btn-accept');

  // const checkCookie = function() {
  //   const name = "cookieInfoHidden=";
  //   const cookies = document.cookie.split(';');

  //   for (let i = 0; i < cookies.length; i++) {
  //     let cookie = cookies[i];
  //     while (cookie.charAt(0) === ' ') {
  //       cookie = cookie.substring(1);
  //     }

  //     if (cookie.indexOf(name) === 0) {
  //       return cookie.substring(name.length, cookie.length);
  //     }
  //   }
  //   return '';
  // };

  // // Сохранить куки
  // const saveAcceptInCookies = function(daysOfValidity) {
  //   const now = new Date();
  //   const time = now.getTime() + (daysOfValidity * 24 * 60 * 60 * 1000);
  //   let newTime = new Date(now.setTime(time));

  //   newTime = newTime.toUTCString();

  //   document.cookie = "cookieInfoHidden=1; expires=" + newTime + "; path=/";
  // }

  // // Проверка принимались ли куки
  //  const wasAccepted = function() {
  //   return checkCookie() === "1";
  // }

  // // Если не принимал куки, то показываем уведомление
  // if (!wasAccepted()) {
  //   jsCookieNoticeEl.classList.remove('cookie-notice_hidden');
  // }

  // //При нажатии принять
  // btnAccept.addEventListener('click', function (e) {
  //   e.preventDefault();
  //   jsCookieNoticeEl.classList.add('cookie-notice_hidden');
  //   saveAcceptInCookies(70);
  // });
});
