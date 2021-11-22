/********** VARIABLES **********/
//Left to right scroll pages
const article = document.querySelector("article");
const articleBoxArray = document.querySelectorAll(".article-box");
const articleTitleArray = document.querySelectorAll(".article-title");
const articleSlider = document.querySelector(".article-slider");
const section = document.querySelector("section");
const widthArticleBoxPlusMargin = document.querySelector(".article-box").offsetWidth + 100;

/********** FUNCTIONS **********/
boxCells();
wheel();

//loop that create cells inside the article-grid-box and place the name of each article-title inside
function boxCells() {
  document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell active-cell">${articleTitleArray[0].innerHTML}</div>`;
  for (i = 1; i < articleTitleArray.length; i++) {
    document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell">${articleTitleArray[i].innerHTML}</div>`;
  }
  // const articleGridBoxCellSingle = document.querySelector(".article-grid-box-cell");
  const articleGridBoxCellArray = document.querySelectorAll(".article-grid-box-cell");
  articleGridBoxCellArray.forEach((articleGridBoxCellSingle, i = 0) => {
    articleGridBoxCellSingle.addEventListener("click", () => {
      window.scroll(articleSlider.offsetLeft + widthArticleBoxPlusMargin * i, 0);
    });
  });
}

//dynamic section width
section.style.width = section.scrollWidth + "px";

//Slide Event
window.addEventListener("scroll", function () {
  for (let i = 0; i < articleBoxArray.length; i++) {
    if (window.pageXOffset <= articleSlider.offsetLeft + 0 * widthArticleBoxPlusMargin) {
      articleBoxArray[0].classList.add("active");
      articleBoxArray[0 + 1].classList.add("active-next");
    }
    if (window.pageXOffset > (articleSlider.offsetLeft + 50) + i * widthArticleBoxPlusMargin) {
      articleBoxArray[i].classList.remove("active");
      articleBoxArray[i + 1].classList.add("active");
      articleBoxArray[i + 1].classList.remove("active-next");
      if (articleBoxArray[i + 2] != undefined) {
        articleBoxArray[i + 2].classList.add("active-next");
      }
    } else {
      if (articleBoxArray[i + 1] != undefined) {
        articleBoxArray[i + 1].classList.remove("active");
      }
      if (articleBoxArray[i + 2] != undefined) {
        articleBoxArray[i + 2].classList.remove("active-next");
      }
    }
  }
});

window.addEventListener("scroll", function () {
  const articleGridBoxCellArray = document.querySelectorAll(".article-grid-box-cell");
  for (let i = 0; i < articleBoxArray.length, i < articleGridBoxCellArray.length; i++) {
    if (articleBoxArray[i].classList.contains("active")) {
      articleGridBoxCellArray[i].classList.add("active-cell");
    } else {
      articleGridBoxCellArray[i].classList.remove("active-cell");
    }
  }
});

/********** EXTERNAL FUNCTIONS **********/
//Important no overflow on Y axis
function wheel() {
  document.addEventListener("wheel", function (e) {
    if (e.type != "wheel") {
      return;
    }
    let delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
    
    if (window.pageXOffset < article.offsetWidth) {
      delta = delta * -article.offsetWidth;
    } else {
      delta = delta * -widthArticleBoxPlusMargin;
    }
    // delta = delta * -600;
    document.documentElement.scrollLeft -= delta;
    // safari needs also this
    document.body.scrollLeft -= delta;
    // e.preventDefault();
  });
}

// // /* WIDTH CALCULATOR */
// window.addEventListener("scroll", function () {
//   console.log(window.pageXOffset);
// });

// var scrollTimeout = null;
// window.scroll(function () {
//   if (scrollTimeout) clearTimeout(scrollTimeout);
//   scrollTimeout = setTimeout(function () {
//     wheel();
//   }, 500);
// });