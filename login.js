localStorage.setItem("k", "k");

function checkLogin() {
  user = document.getElementById("userLogin").value;
  password = document.getElementById("passwordLogin").value;
  console.log("login: ",user, password);

  if (localStorage.getItem(user)== password) {
    console.log("login success");
    changeDiv("settingPage");
  } else alert("Wrong input..");
}
