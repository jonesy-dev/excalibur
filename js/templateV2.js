/********** VARIABLES **********/
//Left to right scroll pages
const section = document.querySelector("section");
const articleGridBox = document.querySelector(".article-grid-box");
const articleBoxArray = document.querySelectorAll(".article-box");
const articleTitleArray = document.querySelectorAll(".article-title");
const articleImagesArray = document.querySelectorAll(".article-image");

//medlemslogin page
let box1 = document.querySelector("#box1"),
  box1Title = document.querySelector("#box1Title"),
  box1Content = document.querySelector("#box1Content"),
  att1 = document.querySelector("#attValue-1"),
  att2 = document.querySelector("#attValue-2"),
  att3 = document.querySelector("#attValue-3"),
  att4 = document.querySelector("#attValue-4"),
  gate = document.querySelector("#portcullis"),
  modal = document.querySelector("#loginModal"),
  overlay = document.querySelector("#overlay"),
  loginWrap = document.querySelector("#loginWrap"),
  userBox = document.querySelector("#userName"),
  userPwd = document.querySelector("#userPwd"),
  submitBtn = document.querySelector("#submitBtn"),
  tryAgain = document.querySelector("#tryAgain"),
  formComps = document.querySelectorAll(".formComps"),
  wrapKey = document.querySelector("#wrapKey"),
  svgKey = document.querySelector("#svgKey"),
  pathKey = document.querySelector("#pathKey"),
  titles = document.querySelector("#titles"),
  h2Title = document.querySelector(".title"),
  theOthersArray,
  loggedInUserObj,
  username,
  password;
// users array
let dbUsers = [
  { navn: "Aske", pass: "letmein", character: "Sir Galahad", race: "menneske", styrke: 18, vitalitet: 15, forsvar: 14, agility: 15 },
  { navn: "Sami", pass: "openplease", character: "Merlin", race: "trollmand", styrke: 16, vitalitet: 14, forsvar: 19, agility: 18 },
  { navn: "Craig", pass: "password", character: "Elrond", race: "elvere", styrke: 12, vitalitet: 20, forsvar: 13, agility: 17 },
  { navn: "Nina", pass: "password", character: "Legolas", race: "elvere", styrke: 12, vitalitet: 20, forsvar: 13, agility: 17 },
  { navn: "Amalie", pass: "password", character: "Gandalf", race: "trollmand", styrke: 12, vitalitet: 20, forsvar: 13, agility: 17 },
  { navn: "Liv", pass: "password", character: "Eowyn", race: "menneske", styrke: 12, vitalitet: 20, forsvar: 13, agility: 17 },
  { navn: "Amanda", pass: "password", character: "Galadriel", race: "elvere", styrke: 12, vitalitet: 20, forsvar: 13, agility: 17 },
  { navn: "Betina", pass: "password", character: "Frodo", race: "hobbits", styrke: 12, vitalitet: 20, forsvar: 13, agility: 17 },
];

/********** FUNCTIONS **********/

//medlemslogin open gate with credentials
function medlemEntry() {
  KUTE.allTo(formComps, { opacity: 0 }, { duration: 1000, offset: 750, easing: "linear" }).start();
  h2Title.innerHTML = `Velkommen hjem <br> ${username}`;
  theOthersArray = theOthers(dbUsers, loggedInUserObj);
  attPopulate();
  boxCellsTextML();

  setTimeout(function () {
    for (let i = 0; i < formComps.length; i++) {
      formComps[i].style.display = "none";
    }
    wrapKey.style.display = "block";
    KUTE.to(wrapKey, { opacity: 1 }, { duration: 2000 }).start();
  }, 1000);

  setTimeout(function () {
    KUTE.fromTo(pathKey, { attr: { fill: "#93833e" } }, { attr: { fill: "#1d301d" } }, { duration: 750, yoyo: true, repeat: 3 }).start();
  }, 2000);

  setTimeout(function () {
    KUTE.to(modal, { opacity: 0 }, { duration: 2000, easing: "easingCubicIn" }).start();
    KUTE.fromTo(gate, { translate: [0, 0] }, { translate: [0, -850] }, { delay: 2000, duration: 3000, easing: "easingExponentialIn" }).start();
    KUTE.to(loginWrap, { opacity: 0 }, { delay: 5500, duration: 2000, easing: "easingCubicIn" }).start();
    titles.style.display = "block";
    KUTE.to(titles, { opacity: 1 }, { delay: 5500, duration: 2000, easing: "easingCubicIn" }).start();
  }, 4500);
}
//medlemslogin deny entry pga credentials
function denyEntry() {
  modal.style.filter = "grayscale(100%)";
  KUTE.to(submitBtn, { opacity: 0 }).start();
  submitBtn.style.display = "none";
  userBox.placeholder = "Åh nej!";
  userBox.disabled = true;
  userBox.value = "";
  userPwd.placeholder = "Er du kendt her, fremmed?";
  userPwd.disabled = true;
  userPwd.value = "";
  tryAgain.style.display = "flex";
  tryAgain.focus();
  KUTE.to(tryAgain, { opacity: 1 }).start();
}
//reset login modal after failed attempt
function resetLogin() {
  KUTE.to(tryAgain, { opacity: 0 }).start();
  tryAgain.style.display = "none";
  userPwd.disabled = false;
  userPwd.placeholder = "Kodeord";
  userPwd.value = "";
  userBox.disabled = false;
  userBox.placeholder = "Brugernavn";
  userBox.value = "";
  userBox.focus();
  submitBtn.style.display = "flex";
  KUTE.to(submitBtn, { opacity: 1 }).start();
  modal.style.filter = "grayscale(0%)";
}
//check user/pass against dbUser array at top of script
function loginAuth() {
  //credential variables
  username = document.querySelector("#userName").value;
  password = document.querySelector("#userPwd").value;

  //conditions
  let empty = username == "" || password == "";
  function dbCheck() {
    //console.log("PASS empty");
    for (let i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].navn == username && dbUsers[i].pass == password) {
        //console.log("PASS in dbCheck", `${username + password}`);
        loggedInUserObj = i;
        return "pass";
      } else {
        //console.log("FAIL in dbCheck");
      }
    }
  }

  //processing
  if (empty) {
    //console.log("FAIL empty");
    denyEntry();
  } else if (dbCheck()) {
    //console.log("PASS after dbCheck");
    medlemEntry();
  } else {
    //console.log("FAIL after dbCheck");
    denyEntry();
  }
}
//event listeners for enter in the login form
function useEnter() {
  userPwd.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      submitBtn.click();
    }
  });
  userBox.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      userPwd.focus();
    }
  });
}
//add user attributes to editable card
function attPopulate() {
  box1Title.innerHTML = dbUsers[loggedInUserObj].character;
  att1.innerHTML = dbUsers[loggedInUserObj].styrke;
  att2.innerHTML = dbUsers[loggedInUserObj].vitalitet;
  att3.innerHTML = dbUsers[loggedInUserObj].forsvar;
  att4.innerHTML = dbUsers[loggedInUserObj].agility;
}
//filter new array to not include logged in user
function theOthers(dbUsers, n) {
  return dbUsers.filter((elem, i) => i !== n);
}

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

// same loop but for medlemslogin
function boxCellsTextML() {
  let memberTitle = document.querySelectorAll(".article-title");
  document.querySelector(".article-grid-box").innerHTML = `<div class="article-grid-box-cell active-cell">${memberTitle[0].innerText}</div>`;

  for (i = 0; i < theOthersArray.length; i++) {
    document.querySelector(".article-grid-box").innerHTML += `<div class="article-grid-box-cell">${theOthersArray[i].character}</div>`;
    //articleTitleArray[i].innerHTML += `${theOthersArray[i].character}`;
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
function animFadeNecro() {
  window.addEventListener("wheel", () => {
    document.querySelector(".necro").style.animationName = "animFade";
    setTimeout(() => (document.querySelector(".necro").style.animationName = ""), 1000);
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
//window.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });

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
  //e.preventDefault();
});

// /* WIDTH CALCULATOR */
// window.addEventListener("scroll", function () {
//   console.log(window.pageXOffset);
// });

/// page transition
window.transPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 1000);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});
