let theShire = document.querySelector("#audioInt");
let logo = document.querySelector("#logo");
let transInt = document.querySelector("#transInt");
let townLinks = document.getElementsByClassName("townLinks");
let logoMain = document.querySelector("#logoMain");

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
}
