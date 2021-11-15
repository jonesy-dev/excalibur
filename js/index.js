/********** VARIABLES **********/
//Left to right scroll pages
const articleTitleArray = document.querySelectorAll(".article-title");
const articleTitleSingle = document.querySelector(".article-title");
const articleContentArray = document.querySelectorAll(".article-content");
const articleContentSingle = document.querySelector(".article-content");
const articleSlider = document.querySelector(".article-slider");
const section = document.querySelector("section");

/********** FUNCTIONS **********/
//Function that automatically add "article-title-" class for each element you add inside the ARTICLE-SLIDER to avoid repetion in the code and assign to that a property left
articleTitleArray.forEach((articleTitleSingle, i) => {
  i = 1 + i;
  articleTitleSingle.classList.add("article-title-" + i);
  document.querySelector(".article-title-" + i).style.opacity = 1;
  document.querySelector(".article-title-" + i).style.transition = "opacity 400ms ease-out";
  // document.querySelector(".article-title-" + i).style.left = (i - 1) * articleTitleSingle.scrollWidth + "px";
});

articleContentArray.forEach((articleContentSingle, i) => {
  i = 1 + i;
  articleContentSingle.classList.add("article-content-" + i);
  document.querySelector(".article-content-" + i).style.opacity = 1;
  document.querySelector(".article-content-" + i).style.transition = "opacity 400ms ease-out";
  // document.querySelector(".article-title-" + i).style.left = (i - 1) * articleTitleSingle.scrollWidth + "px";
});

//dynamic section width
section.style.width = section.scrollWidth + "px";

// /* WIDTH CALCULATOR */
window.addEventListener("scroll", function () {
  console.log(window.scrollX);
});

//Minimaze title
window.addEventListener("scroll", function () {
  const articleSlider = document.querySelector(".article-slider");
  const articleTitle = document.querySelector(".article-title");
  const articleContent = document.querySelector(".article-content");

  if (window.scrollX >= articleSlider.offsetLeft - articleContent.offsetWidth) {
    document.querySelector(".article-title-1").style.opacity = 1;
    document.querySelector(".article-content-1").style.opacity = 0;
    document.querySelector(".article-title-1").style.height = 20 + "px";
    document.querySelector(".article-title-1").style.position = "sticky";
    document.querySelector(".article-title-1").style.left = 0;
    document.querySelector(".article-title-1").style.top = 0;

    if (window.scrollX >= articleSlider.offsetLeft + 600 - articleContent.offsetWidth) {
      document.querySelector(".article-title-2").style.opacity = 1;
      document.querySelector(".article-content-2").style.opacity = 0;
      document.querySelector(".article-title-2").style.height = 20 + "px";
      document.querySelector(".article-title-2").style.position = "sticky";
      document.querySelector(".article-title-2").style.left = 0;
      document.querySelector(".article-title-2").style.top = 20 + "px";

      if (window.scrollX >= articleSlider.offsetLeft + 1200 - articleContent.offsetWidth) {
        document.querySelector(".article-title-3").style.opacity = 1;
        document.querySelector(".article-content-3").style.opacity = 0;
        document.querySelector(".article-title-3").style.height = 20 + "px";
        document.querySelector(".article-title-3").style.position = "sticky";
        document.querySelector(".article-title-3").style.left = 0;
        document.querySelector(".article-title-3").style.top = 40 + "px";
      } else {
        document.querySelector(".article-content-3").style.opacity = null;
        document.querySelector(".article-title-3").style.height = null;
        document.querySelector(".article-title-3").style.position = null;
        document.querySelector(".article-title-3").style.left = null;
        document.querySelector(".article-title-3").style.top = null;
      }
    } else {
      document.querySelector(".article-content-2").style.opacity = null;
      document.querySelector(".article-title-2").style.height = null;
      document.querySelector(".article-title-2").style.position = null;
      document.querySelector(".article-title-2").style.left = null;
      document.querySelector(".article-title-2").style.top = null;
    }
  } else {
    
    document.querySelector(".article-content-1").style.opacity = null;
    document.querySelector(".article-title-1").style.height = null;
    document.querySelector(".article-title-1").style.position = null;
    document.querySelector(".article-title-1").style.left = null;
    document.querySelector(".article-title-1").style.top = null;
  }
});

/********** EXTERNAL FUNCTIONS **********/
//Important no overflow on Y axis
document.addEventListener("wheel", function (e) {
  if (e.type != "wheel") {
    return;
  }
  let delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
  delta = delta * -80;
  document.documentElement.scrollLeft -= delta;
  // safari needs also this
  document.body.scrollLeft -= delta;
  e.preventDefault();
});