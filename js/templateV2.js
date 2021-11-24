/********** VARIABLES **********/
//Left to right scroll pages
const section = document.querySelector("section");
const articleGridBox = document.querySelector(".article-grid-box");
const articleBoxArray = document.querySelectorAll(".article-box");
const articleTitleArray = document.querySelectorAll(".article-title");
const articleImagesArray = document.querySelectorAll(".article-image");
//medlemslogin page
let gate = document.querySelector("#portcullis"),
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
  username,
  password;
// users array
let dbUsers = [
  { navn: "Aske", pass: "letmein" },
  { navn: "Sami", pass: "openplease" },
  { navn: "Craig", pass: "password" },
];

/********** FUNCTIONS **********/

//medlemslogin open gate with credentials
function medlemEntry() {
  KUTE.allTo(formComps, { opacity: 0 }, { duration: 1000, offset: 750, easing: "linear" }).start();

  setTimeout(function () {
    for (let i = 0; i < formComps.length; i++) {
      formComps[i].style.display = "none";
    }
    wrapKey.style.display = "block";
    KUTE.to(wrapKey, { opacity: 1 }, { duration: 2000 }).start();
  }, 1000);

  setTimeout(function () {
    KUTE.fromTo(pathKey, { attr: { fill: "#93833e" } }, { attr: { fill: "#1d301d" } }, { duration: 1000, yoyo: true, repeat: 3 }).start();
  }, 3000);

  setTimeout(function () {
    KUTE.to(modal, { opacity: 0 }, { duration: 2000, easing: "easingCubicIn" }).start();
    KUTE.fromTo(gate, { translate: [0, 0] }, { translate: [0, -850] }, { delay: 2000, duration: 3000, easing: "easingExponentialIn" }).start();
    KUTE.to(loginWrap, { opacity: 0 }, { delay: 5500, duration: 2000, easing: "easingCubicIn" }).start();
    titles.style.display = "block";
    KUTE.to(titles, { opacity: 1 }, { delay: 5500, duration: 2000, easing: "easingCubicIn" }).start();
  }, 6500);
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

function loginAuth() {
  username = document.querySelector("#userName").value;
  password = document.querySelector("#userPwd").value;
  for (let i = 0; i < dbUsers.length; i++) {
    ///
    if (dbUsers[i].navn.includes(username) && dbUsers[i].pass.includes(password) && username != "" && password != "") {
      console.log("PASS");
      medlemEntry();
      return;
    } else {
      console.log("FAIL");
      denyEntry();
      return;
    }
  }
}

// event listeners for enter in the login form
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

// page transitions
window.transPage = function (href) {
  debugger;
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 1000);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});
