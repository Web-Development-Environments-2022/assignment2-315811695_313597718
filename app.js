var context;
var shape = new Object();
var board;
var score;
var start_time;
var time_elapsed;
var interval;
var interval1;
var gameOn;
var ballLeft;
var ghostList;
var dLst = [];
var life;
var Images;
var prev;
var actualFoodAmout;
var keepGhosts;
var keepGameTime;
var smallFood;
var largeFood;
var bigFood;
var spcialFoodLocation;
var spcialFoodRemain;
// Music:
var gameMusic = new Audio("src/inGameSound.wav");
var gameMusicStop = false; //to play and pause the music in the game

// 0 - clean
// 1
//2-pacman
//4-wall
//6 ghost
//11-13 food
//50- cherry , 100 clock 60 specialFood

$(document).ready(function () {
  context = canvas.getContext("2d");
});

function Start() {
  // to fix the bug that after few times the pacman moves very fast.
  window.clearInterval(interval);
  window.clearInterval(interval1);

  gameMusic.currentTime = 0;
  //   gameMusic.play(); -----------------------------------------------------------> todo: change

  keepGameTime = gameTime;
  gameOn = true;
  life = 5;
  lblLife.value = life;
  console.log("start game, life: ", life);
  prev = 0;
  ghostList = new Array();
  timeLeft = gameTime;
  board = new Array();
  foodMatrix = new Array();
  score = 0;
  ballLeft = ballsAmount;
  keepGhosts = monsterAmount;

  Images = new Array();
  Images[0] = new Image();
  Images[1] = new Image();
  Images[2] = new Image();
  Images[3] = new Image();
  Images[4] = new Image();

  Images[0].src = "src/packman.png";
  Images[1].src = "src/cherry.png";
  Images[2].src = "src/clock.jpg";
  Images[3].src = "src/ghost.png";
  Images[4].src = "src/spcialFood.png";

  //var cnt = 100;// ?
  var food_remain = ballLeft;
  smallFood = Math.floor(ballsAmount * 0.6);
  largeFood = Math.floor(ballsAmount * 0.3);
  bigFood = Math.floor(ballsAmount * 0.1);
  actualFoodAmout = bigFood + largeFood + smallFood;
  var pacman_remain = 1;
  start_time = new Date();

  for (var i = 0; i < 20; i++) {
    board[i] = new Array();
    foodMatrix[i] = new Array();
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    for (var j = 0; j < 20; j++) {
      foodMatrix[i][j] = 0;
      if (i == 0 || j == 0) {
        continue;
      }
      // draw ghost in the corners only!
      if (keepGhosts > 0) {
        if (
          (i == 1 && j == 1) ||
          (i == 1 && j == 18) ||
          (i == 18 && j == 18) ||
          (i == 18 && j == 1)
        ) {
          board[i][j] = 6; // 6 -> ghost!
          let pos = [i, j];
          ghostList.push(pos); // new monster add to the ghost list !
          keepGhosts--;
        }
      }
      if (
        //put obstacles    (i== && j==)||
        (i == 2 && j == 2) ||
        (i == 3 && j == 2) ||
        (i == 4 && j == 2) ||
        (i == 2 && j == 3) ||
        (i == 3 && j == 3) ||
        (i == 4 && j == 3) ||
        (i == 2 && j == 5) ||
        (i == 2 && j == 7) ||
        (i == 3 && j == 5) ||
        (i == 3 && j == 7) ||
        (i == 4 && j == 5) ||
        (i == 4 && j == 7) ||
        (i == 6 && j == 2) ||
        (i == 7 && j == 2) ||
        (i == 8 && j == 2) ||
        (i == 6 && j == 3) ||
        (i == 7 && j == 3) ||
        (i == 8 && j == 3) ||
        (i == 2 && j == 12) ||
        (i == 3 && j == 12) ||
        (i == 2 && j == 14) ||
        (i == 3 && j == 14) ||
        (i == 4 && j == 12) ||
        (i == 4 && j == 14) ||
        (i == 2 && j == 16) ||
        (i == 2 && j == 17) ||
        (i == 3 && j == 16) ||
        (i == 3 && j == 17) ||
        (i == 4 && j == 16) ||
        (i == 4 && j == 17) ||
        (i == 12 && j == 2) ||
        (i == 13 && j == 2) ||
        (i == 14 && j == 2) ||
        (i == 12 && j == 3) ||
        (i == 13 && j == 3) ||
        (i == 14 && j == 3) ||
        (i == 6 && j == 16) ||
        (i == 6 && j == 17) ||
        (i == 7 && j == 16) ||
        (i == 7 && j == 17) ||
        (i == 8 && j == 16) ||
        (i == 8 && j == 17) ||
        (i == 12 && j == 16) ||
        (i == 13 && j == 16) ||
        (i == 14 && j == 16) ||
        (i == 12 && j == 17) ||
        (i == 13 && j == 17) ||
        (i == 14 && j == 17) ||
        (i == 1 && j == 9) ||
        (i == 1 && j == 10) ||
        (i == 2 && j == 9) ||
        (i == 2 && j == 10) ||
        (i == 3 && j == 9) ||
        (i == 3 && j == 10) ||
        (i == 4 && j == 9) ||
        (i == 4 && j == 10) ||
        (i == 5 && j == 9) ||
        (i == 5 && j == 10) ||
        (i == 14 && j == 9) ||
        (i == 14 && j == 10) ||
        (i == 15 && j == 9) ||
        (i == 15 && j == 10) ||
        (i == 16 && j == 9) ||
        (i == 16 && j == 10) ||
        (i == 17 && j == 9) ||
        (i == 17 && j == 10) ||
        (i == 18 && j == 9) ||
        (i == 18 && j == 10) ||
        (i == 10 && j == 2) ||
        (i == 10 && j == 3) ||
        (i == 10 && j == 16) ||
        (i == 10 && j == 17) ||
        (i == 16 && j == 2) ||
        (i == 16 && j == 3) ||
        (i == 17 && j == 2) ||
        (i == 17 && j == 3) ||
        (i == 16 && j == 5) ||
        (i == 16 && j == 7) ||
        (i == 17 && j == 5) ||
        (i == 17 && j == 7) ||
        (i == 16 && j == 12) ||
        (i == 16 && j == 14) ||
        (i == 17 && j == 12) ||
        (i == 17 && j == 14) ||
        (i == 6 && j == 5) ||
        (i == 6 && j == 6) ||
        (i == 6 && j == 7) ||
        (i == 6 && j == 12) ||
        (i == 6 && j == 13) ||
        (i == 6 && j == 14) ||
        (i == 14 && j == 5) ||
        (i == 14 && j == 6) ||
        (i == 14 && j == 7) ||
        (i == 14 && j == 12) ||
        (i == 14 && j == 13) ||
        (i == 14 && j == 14) ||
        (i == 8 && j == 5) ||
        (i == 9 && j == 5) ||
        (i == 10 && j == 5) ||
        (i == 11 && j == 5) ||
        (i == 12 && j == 5) ||
        (i == 8 && j == 10) ||
        (i == 9 && j == 10) ||
        (i == 10 && j == 10) ||
        (i == 11 && j == 10) ||
        (i == 12 && j == 10) ||
        (i == 8 && j == 14) ||
        (i == 9 && j == 14) ||
        (i == 10 && j == 14) ||
        (i == 11 && j == 14) ||
        (i == 12 && j == 14) ||
        (i == 10 && j == 6) ||
        (i == 10 && j == 7) ||
        (i == 10 && j == 12) ||
        (i == 10 && j == 13) ||
        (i == 8 && j == 9) ||
        (i == 12 && j == 9) ||
        (i == 8 && j == 11) ||
        (i == 12 && j == 11) ||
        (i == 16 && j == 16) ||
        (i == 16 && j == 17) ||
        (i == 17 && j == 16) ||
        (i == 17 && j == 17)
      ) {
        board[i][j] = 4; // 4 -> wall
      } else {
        //var randomNum = Math.random();
        // if (pacman_remain != 0 && randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
        //if (pacman_remain != 0 ) { // 2-> pacman
        // the initilize packman is in the middle: pos = [10,10]
        // shape.i = 10;
        // shape.j = 10;
        // pacman_remain--;
        // board[10][10] = 2;
        //} else { //0 -> empty
        board[i][j] = 0;
        //}
        //cnt--;
      }
    }
  }
  // 2-> draw pacman

  while (pacman_remain == 1) {
    var emptyCell = findRandomEmptyCell(board);
    ghostList.every((element) => {
      if (
        generalDistance(emptyCell[0], emptyCell[1], element[0], element[1]) < 3
      ) {
        return false;
      } else {
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        pacman_remain--;
        board[shape.i][shape.j] = 2;
        return true;
      }
    });
  }
  for (var i = 0; i < 20; i++) {
    board[i][0] = 4;
    board[i][19] = 4;
  }
  for (var i = 0; i < 20; i++) {
    board[0][i] = 4;
    board[19][i] = 4;
  }
  console.log("food:", smallFood, largeFood, bigFood);
  while (smallFood > 0 && food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 11; //11 -> food small
    foodMatrix[emptyCell[0]][emptyCell[1]] = 11;
    food_remain--;
    smallFood--;
  }
  while (largeFood > 0 && food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 12; //12 -> food large
    foodMatrix[emptyCell[0]][emptyCell[1]] = 12;
    food_remain--;
    largeFood--;
  }
  while (bigFood > 0 && food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 13; //13 -> food Big
    foodMatrix[emptyCell[0]][emptyCell[1]] = 13;
    food_remain--;
    bigFood--;
  }

  board[10][9] = 60;

  spcialFoodLocation = [10, 9];
  spcialFoodRemain = 1;
  //   special food
  var emptyCell2 = findRandomEmptyCell(board);
  board[emptyCell2[0]][emptyCell2[1]] = 100;
  foodMatrix[emptyCell2[0]][emptyCell2[1]] = 100;

  var emptyCell = findRandomEmptyCell(board);
  board[emptyCell[0]][emptyCell[1]] = 50;
  foodMatrix[emptyCell[0]][emptyCell[1]] = 50;

  // //monster Amount , use distance function.
  // while (keepGhosts > 0) {
  // 	var emptyCell = findRandomEmptyCell(board);
  // 	if (distance(emptyCell[0], emptyCell[1]) > 3) {
  // 		board[emptyCell[0]][emptyCell[1]] = 6; // 6 -> monster!
  // 		let pos = [emptyCell[0], emptyCell[1]];
  // 		ghostList.push(pos);// new monster add to the ghost list !
  // 		keepGhosts--;
  // 	}
  // }

  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.keyCode] = false;
    },
    false
  );

  interval = setInterval(UpdatePosition, 100);
  interval1 = setInterval(updateGhost, 1000);
}

function distance(x, y) {
  let yy = Math.abs(shape.i - x) + Math.abs(shape.j - y);
  // console.log(yy);
  return yy;
}

function generalDistance(x, y, i, j) {
  let yy = Math.abs(i - x) + Math.abs(j - y);
  // console.log(yy);
  return yy;
}

function findRandomEmptyCell(board) {
  var i = Math.floor(Math.random() * 18 + 1);
  var j = Math.floor(Math.random() * 18 + 1);
  while (board[i][j] != 0) {
    i = Math.floor(Math.random() * 18 + 1);
    j = Math.floor(Math.random() * 18 + 1);
  }
  return [i, j];
}

function GetKeyPressed() {
  // console.log(keysDown)
  if (keysDown[upKey]) {
    return 1;
  }
  if (keysDown[downKey]) {
    return 2;
  }
  if (keysDown[leftKey]) {
    return 3;
  }
  if (keysDown[rightKey]) {
    return 4;
  }
}

function Draw() {
  let text;
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  timeLeft = Math.floor(keepGameTime - time_elapsed);
  lblTime.value = timeLeft;
  if (timeLeft <= 0) {
    console.log("end of time");
    if (score < 100) {
      text = "you are better then  " + score + " points";
    } else {
      text = "winner";
    }
    endGame(text);
  }
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      if (board[i][j] == 2) {
        //draw pacman
        context.drawImage(Images[0], center.x - 30, center.y - 30, 40, 40);
      } else if (board[i][j] == 11) {
        //draw food
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = threeColors[0]; //color
        context.fill();
      } else if (board[i][j] == 12) {
        //draw food
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = threeColors[1]; //color
        context.fill();
      } else if (board[i][j] == 13) {
        //draw food
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = threeColors[2]; //color
        context.fill();
      } else if (board[i][j] == 4) {
        // wall
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = "grey"; //color
        context.fill();
      } else if (board[i][j] == 6) {
        // ghost
        context.drawImage(Images[3], center.x - 30, center.y - 30, 50, 50);
      } else if (board[i][j] == 100) {
        // cherry - Bonus !
        context.drawImage(Images[1], center.x - 30, center.y - 30, 50, 50);
      } else if (board[i][j] == 50) {
        // clock - Bonus !
        context.drawImage(Images[2], center.x - 30, center.y - 30, 50, 50);
      } else if (board[i][j] == 60) {
        // spcialfood
        context.drawImage(Images[4], center.x - 30, center.y - 30, 50, 50);
      }
    }
  }
}

function endGame(text) {
  gameOn = false;
  ShowDialogGameOver(text);
  gameMusic.pause();
}

function UpdatePosition() {
  if (gameOn) {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
      // up
      if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
        shape.j--;
        //Images[0].src = "src/cherry.png";-------------------------->>> todo : pacman derction
      }
    }
    if (x == 2) {
      // down
      if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) {
        shape.j++;
      }
    }
    if (x == 3) {
      // left
      if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
        shape.i--;
      }
    }
    if (x == 4) {
      //right
      if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
        shape.i++;
      }
    }
    if (board[shape.i][shape.j] == 11) {
      score += 5;
      ballLeft--;
      actualFoodAmout--;
      foodMatrix[shape.i][shape.j] = 0;
    }
    if (board[shape.i][shape.j] == 12) {
      score += 15;
      ballLeft--;
      actualFoodAmout--;
      foodMatrix[shape.i][shape.j] = 0;
    }
    if (board[shape.i][shape.j] == 13) {
      score += 25;
      ballLeft--;
      actualFoodAmout--;
      foodMatrix[shape.i][shape.j] = 0;
    }
    if (board[shape.i][shape.j] == 100) {
      // life bonus
      life += 1;
      lblLife.value -= -1;
      foodMatrix[shape.i][shape.j] = 0;
      console.log("+1 life");
    }
    if (board[shape.i][shape.j] == 50) {
      // time bonus
      //todo: add the time !
      foodMatrix[shape.i][shape.j] = 0;
      console.log("+ 20 second time bonus");
    }
    if (board[shape.i][shape.j] == 60) {
      foodMatrix[shape.i][shape.j] = 0;
      score += 50;
      spcialFoodRemain = 0;
    }

    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    board[shape.i][shape.j] = 2;
    // ghost eat the packman?
    for (let i = 0; i < ghostList.length; i++) {
      if (ghostList[i][0] == shape.i && ghostList[i][1] == shape.j) {
        life--;
        lblLife.value -= 1;
        score -= 10; // new -> every eat
        if (score < 0) {
          score = 0;
        }
        if (life == 0) {
          let text = "Loser! game over!";
          gameMusic.pause();
          gameMusic.currentTime = 0;
          window.clearInterval(interval);
          window.clearInterval(interval1);
          // window.alert("game over!, You lost");
          endGame(text);
        } else {
          // game not over, strat again difrrent postion
          let pos = findRandomEmptyCell(board);
          board[shape.i][shape.j] = 6;
          shape.i = pos[0];
          shape.j = pos[1];
          Draw();
        }
      }
    }
    // player win the game?
    if (ballLeft == 0 || actualFoodAmout == 0) {
      Draw();
      console.log("Winner !!");
      gameMusic.pause();
      gameMusic.currentTime = 0;
      window.clearInterval(interval);
      window.clearInterval(interval1);
      // window.alert("winner!");
      endGame();
    } else {
      Draw();
    }
  }
}

function calcNextStepGhost(x, y) {
  // x,y - current location of the ghost.
  let lstNextmove = checkMoveGhost(x, y);
  dlst = [];
  lstNextmove.forEach((element) => {
    let dis = distance(element[0], element[1]);
    dlst.push([element, dis]);
  });
  let min = 23;
  let indx;
  for (let k = 0; k < dlst.length; k++) {
    if (dlst[k][1] < min) {
      min = dlst[k][1];
      indx = dlst[k][0];
    }
  }
  // check best move, and maybe random ..
  return indx;
}
function randomNextStep(x, y) {
  let nextStep = [];
  if (y > 0 && board[x][y - 1] != 4 && board[x][y - 1] != 6) {
    nextStep.push([x, y - 1]);
  }
  if (y < 19 && board[x][y + 1] != 4 && board[x][y + 1] != 6) {
    nextStep.push([x, y + 1]);
  }
  if (shape.i > 0 && board[x - 1][y] != 4 && board[x - 1][y] != 6) {
    nextStep.push([x - 1, y]);
  }
  if (shape.i < 19 && board[x + 1][y] != 4 && board[x + 1][y] != 6) {
    nextStep.push([x + 1, y]);
  }
  return nextStep[Math.floor(Math.random() * nextStep.length)];
}

function checkMoveGhost(x, y) {
  let lstghostNextmove = [];
  if (y > 0 && board[x][y - 1] != 4 && board[x][y - 1] != 6) {
    lstghostNextmove.push([x, y - 1]);
  }
  if (y < 19 && board[x][y + 1] != 4 && board[x][y + 1] != 6) {
    lstghostNextmove.push([x, y + 1]);
  }
  if (shape.i > 0 && board[x - 1][y] != 4 && board[x - 1][y] != 6) {
    lstghostNextmove.push([x - 1, y]);
  }
  if (shape.i < 19 && board[x + 1][y] != 4 && board[x + 1][y] != 6) {
    lstghostNextmove.push([x + 1, y]);
  }
  return lstghostNextmove;
}

function updateGhost() {
  var newlst = new Array(); //new Array(monsterAmount)
  for (let k = 0; k < ghostList.length; k++) {
    let mon = ghostList[k];
    let x = mon[0]; // x of ghost
    let y = mon[1]; // y of ghost
    let i;
    let j;
    try {
      let pos = calcNextStepGhost(x, y);
      i = pos[0];
      j = pos[1];
    } catch (error) {
      console.log("This ghost can't move, check next ghost");
      i = x;
      j = y;
    }
    //drawing what have been before
    board[x][y] = foodMatrix[x][y];
    board[i][j] = 6; // make it ghost.
    newlst.push([i, j]);
  }
  ghostList = newlst;
  if (spcialFoodRemain == 1) {
    let pos = randomNextStep(spcialFoodLocation[0], spcialFoodLocation[1]);
    board[spcialFoodLocation[0]][spcialFoodLocation[1]] =
      foodMatrix[spcialFoodLocation[0]][spcialFoodLocation[1]];
    board[pos[0]][pos[1]] = 60;
    spcialFoodLocation = pos;
  }
  //   compareMatrix();
  //todo: make prevs as many as ghost number.
}

function soundSwitch() {
  if (!gameMusicStop) {
    gameMusicStop = true;
    gameMusic.pause();
  } else {
    gameMusicStop = false;
    gameMusic.play();
  }
}
