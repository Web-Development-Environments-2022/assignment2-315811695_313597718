var upKey=38;
var downKey=40;
var leftKey=37;
var rightKey=39;
var threeColors = new Array();

function upKeyFunc(event) {
  alert("work");
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

$(document).ready(function () {
  $("#settingForm").submit(function (e) 
  {
     e.preventDefault();
    ballsAmount = $("#ballsAmount").val();
    gameTime = $("#gameTime").val();

    if ($('#small_balls_amount').val() == $('#medium_balls_amount').val() || $('#small_balls_amount').val() == $('#big_balls_amount').val() || $('#big_balls_amount').val() == $('#medium_balls_amount').val()) {
        alert('Must be 3 different colors');
        isValidForm = false;
    }
    
		threeColors[0] = $('#small_balls_amount').val();
		threeColors[1] = $('#medium_balls_amount').val();
		threeColors[2] = $('#big_balls_amount').val();
 
        if (upKey == downKey || upKey == leftKey || upKey == rightKey || downKey == leftKey || downKey == rightKey || leftKey == rightKey) {
			alert("Cant play with same keys");
			
		}
        start();

 
    });
});
