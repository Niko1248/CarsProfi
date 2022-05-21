// Слайдер
window.onload = function () {
  let position = 0;
  const slidesToShow = 1; //сколько элементов из всеЙ линии отображается на экране
  const slidesToScroll = 1; //сколько элементов будет проскроливаться
  const container = document.querySelector(".gallery-wrapper");
  const line = document.querySelector(".gallery-line");
  const item = document.querySelectorAll(".item");
  const btn_back = document.querySelector(".btn__back");
  const btn_next = document.querySelector(".btn__next");
  const itemsCount = item.length;
  const itemWidth = container.offsetWidth / slidesToShow;
  const scrollWidth = itemWidth * slidesToShow;
  const movePosition = slidesToScroll * itemWidth;
  const itemsLeft =
    itemsCount - (Math.abs(position) + slidesToScroll * itemWidth) / itemWidth;
  const WrPic1 = document.querySelectorAll(".wrapper-pic1");
  const WrPic2 = document.querySelectorAll(".wrapper-pic2");
  const pic1 = document.querySelectorAll(".filter1");
  const pic2 = document.querySelectorAll(".filter2");
  const body = document.querySelector("body");
  //определение количества элеентов в видимой части слайдера
  item.forEach(function (el) {
    el.style.minWidth = itemWidth + "px";
  });
  // end

  btn_next.addEventListener("click", function () {
    position -=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    Checkbtn();
  });

  btn_back.addEventListener("click", function () {
    position +=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    Checkbtn();
  });

  const setPosition = function () {
    line.style.transform = "translateX(" + position + "px)";
  };
  const Checkbtn = function () {
    btn_back.disabled = position === 0;
    btn_next.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
  };

  pic1.forEach(function (el) {
    el.addEventListener("mouseover", function (event) {
      pic2.forEach(function (i) {
        i.classList.add("filter__under");
      });
      WrPic2.forEach(function (e) {
        e.classList.add("wrapper-pic__under");
      });
    });
  });
  pic1.forEach(function (el) {
    el.addEventListener("mouseout", function (event) {
      pic2.forEach(function (i) {
        i.classList.remove("filter__under");
      });
      WrPic2.forEach(function (e) {
        e.classList.remove("wrapper-pic__under");
      });
    });
  });

  pic2.forEach(function (el) {
    el.addEventListener("mouseover", function (event) {
      pic1.forEach(function (i) {
        i.classList.add("filter__under");
      });
      WrPic1.forEach(function (e) {
        e.classList.add("wrapper-pic__under");
      });
    });
  });
  pic2.forEach(function (el) {
    el.addEventListener("mouseout", function (event) {
      pic1.forEach(function (i) {
        i.classList.remove("filter__under");
      });
      WrPic1.forEach(function (e) {
        e.classList.remove("wrapper-pic__under");
      });
    });
  });

  ////////////////////////////////////////////swipe__start////////////////////////////////
  var logBlock = document.querySelectorAll(".gallery-line");
  logBlock.forEach(function (el) {
    el.addEventListener("touchstart", handleTouchStart, false);
    el.addEventListener("touchmove", handleTouchMove, false);
  });

  let x1 = null;
  let y1 = null;

  function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  }

  function handleTouchMove(event) {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;
    /* console.log(x2, y2); */
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        position +=
          itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        Checkbtn();
      } else {
        position -=
          itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        Checkbtn();
      }
    } else {
      if (yDiff > 0) {
        console.log("down");
      } else {
        console.log("top");
      }
    }
    x1 = null;
    y1 = null;
  }
  ////////////////////////////////////////// swipe end /////////////////////////////////////////////////////////

  Checkbtn();

  // Плавающий header
  (function () {
    const header = document.querySelector(".header");
    window.onscroll = () => {
      if (window.pageYOffset > 50) {
        header.classList.add("header_active");
      } else {
        header.classList.remove("header_active");
      }
    };
  })();
  // Плавный скролл
  (function () {
    const smoothScroll = function (targetEl, duration) {
      const headerElHeight = document.querySelector(".header").clientHeight;
      let target = document.querySelector(targetEl);
      let targetPosition = target.getBoundingClientRect().top - headerElHeight;
      let startPosition = window.pageYOffset;
      let startTime = null;

      const ease = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animation = function (currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    };
    const scrollTo = function () {
      const links = document.querySelectorAll(".js-scroll");
      links.forEach((each) => {
        each.addEventListener("click", function () {
          const currentTarget = this.getAttribute("data-href");
		  console.log(currentTarget);
          smoothScroll(currentTarget, 1000);
        });
      });
    };
    scrollTo();
  })();

  // Бургер, меню ico
  const line_i__1 = document.querySelector(".line-i__1");
  const line_i__2 = document.querySelector(".line-i__2");
  const line_i__3 = document.querySelector(".line-i__3");
  const ico__menu = document.querySelector(".ico-menu");
  const menu = document.querySelector(".header__nav");
  const item_service = document.querySelectorAll(".header__link");

  function menu__active() {
    menu.classList.toggle("header__nav_active");
    line_i__1.classList.toggle("line-i__1-active");
    line_i__2.classList.toggle("line-i__2-active");
    line_i__3.classList.toggle("line-i__3-active");
  }

  ico__menu.addEventListener("click", () => {
    menu__active();
    ico__menu.classList.toggle("ico-menu__wrapper--active");
    body.classList.toggle("body__fixed");
  });

  item_service.forEach(function (a) {
    a.addEventListener("click", () => {
      menu__active();
      body.classList.remove("body__fixed");
    });
  });

  //end

  //popup start
  const popup = document.querySelector(".popup-bg");
  const popup_ = document.querySelector(".popup");
  const footer_btn = document.querySelector("#booking__footer-btn");

  function btnBookin__mobileAdd() {
    popup.classList.add("popup_animate");
    popup_.classList.add("popup-a");
    body.classList.add("body__fixed");
  }
  function btnBookin__mobileRemove() {
    popup.classList.remove("popup_animate");
    popup_.classList.remove("popup-a");
    body.classList.remove("body__fixed");
  }

  document
    .querySelector(".button__center")
    .addEventListener("click", function () {
      btnBookin__mobileAdd();
    });
  footer_btn.addEventListener("click", function () {
    btnBookin__mobileAdd();
  });
  document
    .querySelector(".header__containerButton--mobile")
    .addEventListener("click", function () {
      btnBookin__mobileAdd();
    });
  document.querySelector(".close__img").addEventListener("click", function () {
    btnBookin__mobileRemove();
  });
  //popup end

  // Карточки

  const service__item = document.querySelectorAll(".service__item");
  const service_bg = document.querySelector(".service_bg");

  function remover() {
    service__item.forEach(function (e) {
      if (e.classList.contains("service__item-active")) {
        e.classList.remove("service__item-active");
      }
    });
  }

  service__item.forEach(function (e) {
    e.addEventListener("click", () => {
      remover();
      if (!e.classList.contains("service__item-active")) {
        e.classList.toggle("service__item-active");
      }
    });
  });
  service_bg.addEventListener('click', () =>{
    remover();
  })
};

