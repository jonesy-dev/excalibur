// declaring variables

let theShire = document.querySelector("#audioInt");
let logo = document.querySelector("#logo");
let transInt = document.querySelector("#transInt");
let townLinks = document.getElementsByClassName("townLinks");
let logoMain = document.querySelector("#logoMain");
let scrollPrompt = document.querySelector("#scrollPrompt");
let skipBtn = document.querySelector("#skipBtn");

// calling functions

function intro() {
  setTimeout(function () {
    theShire.play();
  }, 500);
  setTimeout(function () {
    logo.classList.add("xyz-in");
  }, 4500);
  setTimeout(function () {
    logo.classList.add("shine");
    logo.style.filter = "grayscale(80%)";
  }, 6000);
  setTimeout(function () {
    logo.style.filter = "grayscale(0%)";
  }, 6500);
  setTimeout(function () {
    logo.classList.remove("shine");
    logo.classList.replace("xyz-in", "xyz-out");
  }, 10000);
  setTimeout(function () {
    transInt.classList.add("xyz-out");
  }, 12000);
  setTimeout(function () {
    for (let i = 0; i < townLinks.length; i++) {
      townLinks[i].style.display = "block";
      townLinks[i].classList.add("xyz-in");
    }
    logo.style.display = "none";
  }, 14000);
  setTimeout(function () {
    transInt.style.display = "none";
    logoMain.style.display = "block";
    logoMain.classList.add("xyz-in");
  }, 22000);
  setTimeout(function () {
    scrollPrompt.classList.add("xyz-in");
    scrollPrompt.style.display = "block";
  }, 26000);
  setTimeout(function () {
    scrollPrompt.classList.replace("xyz-in", "xyz-out");
  }, 32000);
}

function skipIntro() {
  skipBtn.style.display = "none";
  theShire.pause();
  logo.style.display = "none";
  transInt.style.display = "none";
  for (let i = 0; i < townLinks.length; i++) {
    townLinks[i].style.display = "block";
  }
  logoMain.style.display = "block";
}

window.addEventListener("wheel", function (e) {
  console.log(e.deltaY);
});
