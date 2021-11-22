/********** VARIABLES **********/
//Left to right scroll pages
const articleTitleArray = document.querySelectorAll(".article-title");
const articleTitleSingle = document.querySelector(".article-title");
const articleContentArray = document.querySelectorAll(".article-content");
const articleContentSingle = document.querySelector(".article-content");
const articleSlider = document.querySelector(".article-slider");
const section = document.querySelector("section");
const widthTitlePlusContent = document.querySelector(".article-title").offsetWidth + document.querySelector(".article-content").offsetWidth;

/********** FUNCTIONS **********/
//Function that automatically add "article-title-" class for each element you add inside the ARTICLE-SLIDER to avoid repetion in the code and assign to that a property left
articleTitleArray.forEach((articleTitleSingle, i) => {
  i = 1 + i;
  articleTitleSingle.classList.add("article-title-" + i);
  articleTitleSingle.addEventListener("click", () => {
    window.scroll(articleSlider.offsetLeft - widthTitlePlusContent + widthTitlePlusContent * (i - 1), 0);
  });
  document.querySelector(".article-title-" + i).style.opacity = 1;
  document.querySelector(".article-title-" + i).style.transition = "opacity 400ms ease-out";
});

articleContentArray.forEach((articleContentSingle, i) => {
  i = 1 + i;
  articleContentSingle.classList.add("article-content-" + i);
  articleContentSingle.id = "article" + i;
  document.querySelector(".article-content-" + i).style.opacity = 1;
  document.querySelector(".article-content-" + i).style.transition = "opacity 400ms ease-out";
});

//dynamic section width
section.style.width = section.scrollWidth + "px";

// // /* WIDTH CALCULATOR */
// window.addEventListener("scroll", function () {
//   console.log(window.pageXOffset);
// });

//Minimaze title
window.addEventListener("scroll", function () {
  const articleSliderHeight = articleSlider.offsetHeight;
  let itemXCol = 5;

  for (let i = 1; i <= articleTitleArray.length; i++) {
    if (window.pageXOffset >= articleSlider.offsetLeft + (i - 1) * widthTitlePlusContent - articleContentSingle.offsetWidth) {
      document.querySelector(".article-content-" + i).style.opacity = 0;
      document.querySelector(".article-title-" + i).style.height = articleSliderHeight / itemXCol + "px";
      document.querySelector(".article-title-" + i).style.position = "sticky";
      if (i <= itemXCol) {
        document.querySelector(".article-title-" + i).style.left = 0;
        document.querySelector(".article-title-" + i).style.top = ((i - 1) * articleSliderHeight) / itemXCol + "px";
      } else if (i <= itemXCol * 2) {
        document.querySelector(".article-title-" + i).style.left = 100 + "px";
        document.querySelector(".article-title-" + i).style.top = ((i - itemXCol - 1) * articleSliderHeight) / itemXCol + "px";
      } else if (i <= itemXCol * 3) {
        document.querySelector(".article-title-" + i).style.left = 200 + "px";
        document.querySelector(".article-title-" + i).style.top = ((i - itemXCol * 2 - 1) * articleSliderHeight) / itemXCol + "px";
      } else if (i <= itemXCol * 4) {
        document.querySelector(".article-title-" + i).style.left = 300 + "px";
        document.querySelector(".article-title-" + i).style.top = ((i - itemXCol * 3 - 1) * articleSliderHeight) / itemXCol + "px";
      }
    } else {
      document.querySelector(".article-content-" + i).style.opacity = null;
      document.querySelector(".article-title-" + i).style.height = null;
      document.querySelector(".article-title-" + i).style.position = null;
      document.querySelector(".article-title-" + i).style.left = null;
      document.querySelector(".article-title-" + i).style.top = null;
    }
  }
});

/********** EXTERNAL FUNCTIONS **********/
//Important no overflow on Y axis
document.addEventListener("wheel", function (e) {
  if (e.type != "wheel") {
    return;
  }
  let delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
  delta = delta * -300;
  document.documentElement.scrollLeft -= delta;
  // safari needs also this
  document.body.scrollLeft -= delta;
  e.preventDefault();
});

//page transitions
window.transPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 500);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});
