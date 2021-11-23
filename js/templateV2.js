/********** VARIABLES **********/
//Left to right scroll pages
const section = document.querySelector("section");
const articleGridBox = document.querySelector(".article-grid-box");
const articleBoxArray = document.querySelectorAll(".article-box");
const articleTitleArray = document.querySelectorAll(".article-title");
const articleImagesArray = document.querySelectorAll(".article-image");

/********** FUNCTIONS **********/

//opacityGridBox
window.addEventListener("scroll", showGridBox);

function showGridBox() {
  if (window.pageXOffset >= 1800) {
    articleGridBox.classList.add("show-grid-box");
  } else {
    articleGridBox.classList.remove("show-grid-box");
  }
}

//loop that create cells inside the article-grid-box and place the name of each article-title inside
function boxCellsText() {
  document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell active-cell">${articleTitleArray[0].innerHTML}</div>`;
  for (i = 1; i < articleTitleArray.length; i++) {
    document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell">${articleTitleArray[i].innerHTML}</div>`;
  }
  const articleGridBoxCellArray = document.querySelectorAll(".article-grid-box-cell");
  articleGridBoxCellArray.forEach((articleGridBoxCellSingle, i = 0) => {
    articleGridBoxCellSingle.addEventListener("click", () => {
      window.scroll(section.offsetWidth * (i + 1), 0);
    });
  });
}

function boxCellsImg() {
  document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell active-cell">${articleImagesArray[0].innerHTML}</div>`;
  for (i = 1; i < articleImagesArray.length; i++) {
    document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell">${articleImagesArray[i].innerHTML}</div>`;
  }
  const articleGridBoxCellArray = document.querySelectorAll(".article-grid-box-cell");
  articleGridBoxCellArray.forEach((articleGridBoxCellSingle, i = 0) => {
    articleGridBoxCellSingle.addEventListener("click", () => {
      window.scroll(section.offsetWidth * (i + 1), 0);
    });
  });
}

//Slide Event
window.addEventListener("scroll", function () {
  for (let i = 0; i < articleBoxArray.length; i++) {
    if (window.pageXOffset <= section.offsetWidth) {
      articleBoxArray[0].classList.add("active");
      // articleBoxArray[0 + 1].classList.add("active-next");
    }
    if (window.pageXOffset > section.offsetWidth * (i + 1)) {
      articleBoxArray[i].classList.remove("active");
      articleBoxArray[i + 1].classList.add("active");
      // articleBoxArray[i + 1].classList.remove("active-next");
      // if (articleBoxArray[i + 2] != undefined) {
      //   articleBoxArray[i + 2].classList.add("active-next");
      // }
    } else {
      if (articleBoxArray[i + 1] != undefined) {
        articleBoxArray[i + 1].classList.remove("active");
      }
      // if (articleBoxArray[i + 2] != undefined) {
      //   articleBoxArray[i + 2].classList.remove("active-next");
      // }
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
//Roll animation
function animRoll() {
  window.addEventListener("wheel", (evt) => {
    if (evt.wheelDelta < 0) {
      document.querySelector(".knight").style.animationName = "animRotate";
      setTimeout(() => (document.querySelector(".knight").style.animationName = ""), 500);
    }

    if (evt.wheelDelta > 0) {
      document.querySelector(".knight").style.animationName = "revAnimRotate";
      setTimeout(() => (document.querySelector(".knight").style.animationName = ""), 500);
    }
  });
}

//Teleport Animation
function animTeleport() {
  window.addEventListener("wheel", () => {
    document.querySelector(".mage").style.animationName = "animTeleport";
    setTimeout(() => (document.querySelector(".mage").style.animationName = ""), 1000);
  });
}

//Fade Animation
function animFade() {
  window.addEventListener("wheel", () => {
    document.querySelector(".elf").style.animationName = "animFade";
    setTimeout(() => (document.querySelector(".elf").style.animationName = ""), 1000);
  });
}

//Scale Animation
function animScale() {
  window.addEventListener("wheel", () => {
    document.querySelector(".orc").style.animationName = "animScale";
    setTimeout(() => (document.querySelector(".orc").style.animationName = ""), 1000);
  });
}

/********** EXTERNAL FUNCTIONS **********/
//Important no overflow on Y axis
document.addEventListener("wheel", function (e) {
  if (e.type != "wheel") {
    return;
  }
  let delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
  delta = delta * -section.offsetWidth;
  document.documentElement.scrollLeft -= delta;
  // safari needs also this
  document.body.scrollLeft -= delta;
  // e.preventDefault();
});

// /* WIDTH CALCULATOR */
// window.addEventListener("scroll", function () {
//   console.log(window.pageXOffset);
// });
