// declaring variables

// intro vars
let theShire = document.querySelector("#audioInt"),
  skipIntroBeat = document.querySelector("#skipIntroBeat"),
  logo = document.querySelector("#logo"),
  transInt = document.querySelector("#transInt");
// map vars
let townLinks = document.getElementsByClassName("townLinks"),
  townLinksActive = document.getElementsByClassName("townLinksActive"),
  town1 = document.querySelector("#town-1"),
  town2 = document.querySelector("#town-2"),
  town3 = document.querySelector("#town-3"),
  town4 = document.querySelector("#town-4"),
  town5 = document.querySelector("#town-5"),
  town6 = document.querySelector("#town-6"),
  town7 = document.querySelector("#town-7"),
  flag1 = document.querySelector("#flag-1"),
  flag2 = document.querySelector("#flag-2"),
  flag3 = document.querySelector("#flag-3"),
  flag4 = document.querySelector("#flag-4"),
  flag5 = document.querySelector("#flag-5"),
  flag6 = document.querySelector("#flag-6"),
  flag7 = document.querySelector("#flag-7"),
  logoMain = document.querySelector("#logoMain"),
  compass = document.querySelector("#compass"),
  pathStart = document.querySelector("#pathStart"),
  scrollPrompt = document.querySelector("#scrollPrompt");
// skip intro vars
let skipBtn = document.querySelector("#skipBtn"),
  skipIntroCalled;
// scrolly vars
let wheelTimer,
  pathPositionStart = 0,
  pathPosition,
  pathDir,
  pathLive,
  pathMarkAnim;
// page referrers
let lastPage = document.referrer,
  lastPageFormat = lastPage.includes("/pages/");

// calling functions

// cinematic intro timeline with return statements fired by the 'skipIntro' function
function intro() {
  document.body.style.background = "radial-gradient(circle, #252f33 0%, #1a1c1a 69%)";
  // start audio
  setTimeout(function () {
    theShire.play();
  }, 500);
  // logo fade in
  setTimeout(function () {
    logo.classList.add("xyz-in");
  }, 4500);
  // logo effects
  setTimeout(function () {
    logo.classList.add("shine");
    logo.style.filter = "grayscale(80%)";
  }, 6000);
  // logo effects
  setTimeout(function () {
    logo.style.filter = "grayscale(0%)";
  }, 6500);
  // logo fade out
  setTimeout(function () {
    logo.classList.remove("shine");
    logo.classList.replace("xyz-in", "xyz-out");
  }, 10000);
  // transition screen fade out
  setTimeout(function () {
    transInt.classList.add("xyz-out");
  }, 12000);
  // add classes to towns(links) for staggered fade-in
  setTimeout(function () {
    if (skipIntroCalled == true) {
      return;
    } else {
      for (let i = 0; i < townLinks.length; i++) {
        townLinks[i].style.display = "block";
        townLinks[i].classList.add("xyz-in");
      }
      logo.style.display = "none";
    }
  }, 14000);
  // fade-in smaller logo
  setTimeout(function () {
    if (skipIntroCalled == true) {
      return;
    } else {
      transInt.style.display = "none";
      logoMain.style.display = "block";
      logoMain.classList.add("xyz-in");
    }
  }, 22000);
  // fade-in scroll prompt and fade-out skip button
  setTimeout(function () {
    if (skipIntroCalled == true) {
      return;
    } else {
      skipBtn.classList.add("xyz-out");
      pathStart.classList.add("xyz-in");
      pathStart.style.display = "block";
      scrollPrompt.classList.add("xyz-in");
      scrollPrompt.style.display = "block";
      compass.classList.add("xyz-in");
      compass.style.display = "block";
    }
  }, 26000);
  // fade-out scroll prompt and initialise svg path starting point and draw
  setTimeout(function () {
    if (skipIntroCalled == true) {
      return;
    } else {
      scrollPrompt.classList.replace("xyz-in", "xyz-out");
      // pathPositionStart = 0;
      // KUTE.to("#pathLine", { opacity: 1 }).start();
      // KUTE.fromTo("#pathLine", { draw: "0% 0%" }, { draw: "0% 1%" }, { duration: 2000 }).start();
    }
  }, 32000);
}

function skipIntro() {
  skipIntroCalled = true;
  skipBtn.style.display = "none";
  theShire.pause();
  skipIntroBeat.play();
  logo.style.display = "none";
  compass.style.display = "block";
  transInt.style.display = "none";
  for (let i = 0; i < townLinks.length; i++) {
    townLinks[i].style.display = "block";
    townLinks[i].classList.remove("xyz-in");
  }
  logoMain.classList.add("xyz-in");
  logoMain.style.display = "block";
  pathStart.classList.add("xyz-in");
  pathStart.style.display = "block";
  scrollPrompt.classList.add("xyz-in");
  scrollPrompt.style.display = "block";
  setTimeout(function () {
    scrollPrompt.classList.add("xyz-out");
  }, 6000);
  // pathPositionStart = 0;
  // KUTE.to("#pathLine", { opacity: 1 }).start();
  // KUTE.fromTo("#pathLine", { draw: "0% 0%" }, { draw: "0% 1%" }, { duration: 2000 }).start();
}

function landingFrom() {
  if (lastPageFormat === true) {
    skipIntro();
    logoMain.classList = "";
    logoMain.display = "block";
  } else {
    intro();
  }
}

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

// scrolly time
window.addEventListener(
  "wheel",
  function (e) {
    let deltaYdata = e.deltaY;
    let wheelDir;
    pathMarkAnim = KUTE.fromTo("#mapMark", { path: "#mapMark" }, { path: "#sign" }, { duration: 500, yoyo: 3 });

    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () {
      wheelDir = deltaYdata / 102;
      if (wheelDir >= 0) {
        pathPosition = pathPositionStart++;
        pathDir = "go";
      } else {
        pathPosition = pathPositionStart--;
        pathDir = "back";
      }

      pathLive = pathPosition + pathDir;
      console.log(pathLive);

      switch (pathLive) {
        case "0go":
          KUTE.to("#pathLine", { opacity: 1 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 0%" }, { draw: "0% 9%" }, { duration: 1000 }).start();
          pathMarkAnim.stop();
          setTimeout(function () {
            town1.classList.add("townLinksActive");
            KUTE.to("#flag-1", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "0back":
          KUTE.fromTo("#pathLine", { draw: "0% 9%" }, { draw: "0% 0%" }, { duration: 1000 }).start();
          KUTE.to("#flag-1", { opacity: 0 }, { duration: 100 }).start();
          town1.classList.remove("townLinksActive");
          setTimeout(function () {
            pathMarkAnim.start();
          }, 1000);
          setTimeout(function () {
            KUTE.to("#pathStart", {
              transform: {
                translate3d: [150, 100, 0],
                rotate3d: [0, 0, 45],
                skew: [15, 20],
                scale3d: [1.5, 1.5, 1],
              },
            }).start();
          }, 2000);
          break;
        case "1go":
          KUTE.fromTo("#pathLine", { draw: "0% 9%" }, { draw: "0% 9%" }, { duration: 100 }).start();
          break;
        case "1back":
          KUTE.to("#flag-2", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 9%" }, { draw: "0% 9%" }, { duration: 100 }).start();
          setTimeout(function () {
            town1.classList.add("townLinksActive");
            KUTE.to("#flag-1", { opacity: 1 }, { duration: 350 }).start();
          }, 100);
          break;
        case "2go":
          town1.classList.remove("townLinksActive");
          KUTE.to("#flag-1", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 9%" }, { draw: "0% 25%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town2.classList.add("townLinksActive");
            KUTE.to("#flag-2", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "2back":
          town2.classList.remove("townLinksActive");
          KUTE.to("#flag-2", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 25%" }, { draw: "0% 9%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town1.classList.add("townLinksActive");
            KUTE.to("#flag-1", { opacity: 1 }, { duration: 350 }).start();
          }, 100);
          break;
        case "3go":
          town2.classList.remove("townLinksActive");
          KUTE.to("#flag-2", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 25%" }, { draw: "0% 34%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town3.classList.add("townLinksActive");
            KUTE.to("#flag-3", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "3back":
          town3.classList.remove("townLinksActive");
          KUTE.to("#flag-3", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 34%" }, { draw: "0% 25%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town2.classList.add("townLinksActive");
            KUTE.to("#flag-2", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "4go":
          town3.classList.remove("townLinksActive");
          KUTE.to("#flag-3", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 34%" }, { draw: "0% 43%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town4.classList.add("townLinksActive");
            KUTE.to("#flag-4", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "4back":
          town4.classList.remove("townLinksActive");
          KUTE.to("#flag-4", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 50%" }, { draw: "0% 34%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town3.classList.add("townLinksActive");
            KUTE.to("#flag-3", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "5go":
          town4.classList.remove("townLinksActive");
          KUTE.to("#flag-4", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 43%" }, { draw: "0% 70%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town5.classList.add("townLinksActive");
            KUTE.to("#flag-5", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "5back":
          town5.classList.remove("townLinksActive");
          KUTE.to("#flag-5", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 70%" }, { draw: "0% 50%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town4.classList.add("townLinksActive");
            KUTE.to("#flag-4", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "6go":
          town5.classList.remove("townLinksActive");
          KUTE.to("#flag-5", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 70%" }, { draw: "0% 80%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town6.classList.add("townLinksActive");
            KUTE.to("#flag-6", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "6back":
          town6.classList.remove("townLinksActive");
          KUTE.to("#flag-6", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 80%" }, { draw: "0% 70%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town5.classList.add("townLinksActive");
            KUTE.to("#flag-5", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "7go":
          town6.classList.remove("townLinksActive");
          KUTE.to("#flag-6", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 80%" }, { draw: "0% 100%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town7.classList.add("townLinksActive");
            KUTE.to("#flag-7", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
        case "7back":
          town7.classList.remove("townLinksActive");
          KUTE.to("#flag-7", { opacity: 0 }, { duration: 100 }).start();
          KUTE.fromTo("#pathLine", { draw: "0% 100%" }, { draw: "0% 80%" }, { duration: 1000 }).start();
          setTimeout(function () {
            town6.classList.add("townLinksActive");
            KUTE.to("#flag-6", { opacity: 1 }, { duration: 350 }).start();
          }, 1000);
          break;
      }
    });
  },
  100
);
