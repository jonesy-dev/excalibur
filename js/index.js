/********** VARIABLES **********/
//Left to right scroll pages
const articleTitleArray = document.querySelectorAll(".article-title");
const articleTitleSingle = document.querySelector(".article-title");

/********** FUNCTIONS **********/
//Function that automatically add "article-title-" class for each element you add inside the ARTICLE-SLIDER to avoid repetion in the code and assign to that a property left
articleTitleArray.forEach((articleTitleSingle, i) => {
  i = 1 + i;
  articleTitleSingle.classList.add("article-title-" + i);
  document.querySelector(".article-title-" + i).style.left = (i - 1) * 98 + "px";
});

/********** EXTERNAL FUNCTIONS **********/
const scrollContainer = document.querySelector(".main-article-template");

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});
