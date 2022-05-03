localStorage.setItem("k", "k");

function checkLogin() {
  user = document.getElementById("userLogin").value;
  password = document.getElementById("passwordLogin").value;
  console.log(user, password, "---------------------");
  if (localStorage.getItem(user) && localStorage.getItem(password)) {
    alert("great success !");
    console.log("login success");
    myFunction("gamePage");
  } else alert("Wrong input..");
}
