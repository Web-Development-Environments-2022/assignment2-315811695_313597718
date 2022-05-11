var upKey = 38;
var downKey = 40;
var leftKey = 37;
var rightKey = 39;
var threeColors = new Array();
var ballsAmount = 55;
var gameTime = 70;
var monsterAmount = 1;

function upKeyFunc(event) {
  upKey = event.keyCode;
}
function downKeyFunc(event) {
  downKey = event.keyCode;
}
function leftKeyFunc(event) {
  leftKey = event.keyCode;
}
function rightKeyFunc(event) {
  rightKey = event.keyCode;
}
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getColor(num) {
  switch (num) {
    case 0:
      return "Red";
    case 1:
      return "Blue";
    case 2:
      return "Green";
    case 3:
      return "White";
    case 4:
      return "Purple";
    case 5:
      return "Pink";
  }
}
function randomSetting() {
  ballsAmount = getRandomArbitrary(55, 70);
  gameTime = getRandomArbitrary(60, 120);
  monsterAmount = getRandomArbitrary(1, 5);

  let i = 0;
  while (i < 3) {
    let x = getColor(getRandomArbitrary(0, 6));
    if (x != threeColors[0] && x != threeColors[1] && x != threeColors[2]) {
      threeColors[i] = x;
      i++;
    }
  }

  $("#ballsAmount").val(ballsAmount);
  $("#gameTime").val(gameTime);
  $("#mosterAmount").val(monsterAmount);
  $("#small_balls_amount").val(threeColors[0]);
  $("#medium_balls_amount").val(threeColors[1]);
  $("#big_balls_amount").val(threeColors[2]);
}

$(document).ready(function () {
  $("#settingForm").submit(function (e) {
    e.preventDefault();
    ballsAmount = $("#ballsAmount").val();
    gameTime = $("#gameTime").val();
    monsterAmount = $("#mosterAmount").val();
    if (
      $("#small_balls_amount").val() == $("#medium_balls_amount").val() ||
      $("#small_balls_amount").val() == $("#big_balls_amount").val() ||
      $("#big_balls_amount").val() == $("#medium_balls_amount").val()
    ) {
      alert("Must be 3 different colors");
      isValidForm = false;
    }

    threeColors[0] = $("#small_balls_amount").val();
    threeColors[1] = $("#medium_balls_amount").val();
    threeColors[2] = $("#big_balls_amount").val();

    if (
      upKey == downKey ||
      upKey == leftKey ||
      upKey == rightKey ||
      downKey == leftKey ||
      downKey == rightKey ||
      leftKey == rightKey
    ) {
      alert("Cant play with same keys");
    }
    changeDiv('gamePage');
    Start();// ohad - bug check me !
  });
});