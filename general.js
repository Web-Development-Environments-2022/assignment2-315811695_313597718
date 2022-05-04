
    function changeDiv(val) {
      val += "1";

      var mainScreen = document.getElementById(val);

      var gamePageScreen = document.getElementById("gamePage1");
      var loginPageScreen = document.getElementById("loginPage1");
      var registerPageScreen = document.getElementById("registerPage1");
      var welcomePageScreen = document.getElementById("welcomePage1");
      var settingPageScreen = document.getElementById("settingPage1");

      gamePageScreen.style.display = "none";
      loginPageScreen.style.display = "none";
      registerPageScreen.style.display = "none";
      welcomePageScreen.style.display = "none";
      settingPageScreen.style.display = "none";

      mainScreen.style.display = "block";
    }
  