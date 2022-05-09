var context;
var shape = new Object();
var board;
var score;
var pac_color;
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

// var upKey = 38;
// var downKey = 40;
// var leftKey = 37;
// var rightKey = 39;
// var threeColors = new Array();
// var ballsAmount = 55;
// var gameTime = 70;
// var monsterAmount = 1;

$(document).ready(function () {
	context = canvas.getContext("2d");
});

function Start() {
	console.log("start game")
	gameOn = true;
	life = 5;
	prev = 0;
	ghostList = new Array();
	timeLeft = gameTime
	board = new Array();
	score = 0;
	pac_color = "yellow";
	ballLeft = ballsAmount;

	Images = new Array();
	Images[0] = new Image();
	Images[1] = new Image();
	Images[0].src = 'packman.png';
	Images[1].src = 'ghost.png';

	var cnt = 100;// ?
	var food_remain = 50;
	var smallFood = Math.floor(ballsAmount * 0.6);
	var largeFood = Math.floor(ballsAmount * 0.3);
	var bigFood = Math.floor(ballsAmount * 0.1);
	var pacman_remain = 1;
	start_time = new Date();

	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 20; j++) {
			if (i == 0 || j == 0) {
				continue;
			}
			if (//put obstacles
				(i == 2 && j == 3) || (i == 3 && j == 3) || (i == 4 && j == 3) ||
				(i == 2 && j == 4) || (i == 2 && j == 5) || (i == 2 && j == 6)
			) {
				board[i][j] = 4; // 4 -> wall
			} else {
				var randomNum = Math.random();
				if (pacman_remain != 0 && randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) { // 2-> pacman
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else { //0 -> empty 
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	for (var i = 0; i < 20; i++) {
		board[i][0] = 4;
		board[i][19] = 4;
	}
	for (var i = 0; i < 20; i++) {
		board[0][i] = 4;
		board[19][i] = 4;
	}

	// console.log(smallFood, largeFood, bigFood);
	while (smallFood > 0 && food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 11; //11 -> food small
		food_remain--;
		smallFood--;
	}
	while (largeFood > 0 && food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 12; //12 -> food large
		food_remain--;
		largeFood--;
	}
	while (bigFood > 0 && food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 13; //13 -> food Big
		food_remain--;
		bigFood--;
	}

	//monster Amount , use distance function.
	while (monsterAmount > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (distance(emptyCell[0], emptyCell[1]) > 3) {
			board[emptyCell[0]][emptyCell[1]] = 6; // 6 -> monster!
			let pos = [emptyCell[0], emptyCell[1]];
			ghostList.push(pos);// new monxter add to the ghost list !
			monsterAmount--;
		}
	}


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
	interval1 = setInterval(updateGhost, 800);
}

function distance(x, y) {
	let yy = Math.abs(shape.i - x) + Math.abs(shape.j - y);
	// console.log(yy);
	return yy;
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 19 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 19 + 1);
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

function endGame() {
	gameOn = false;
	ShowDialogGameOver();
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	timeLeft = Math.floor(gameTime - time_elapsed);
	lblTime.value = timeLeft;
	if (timeLeft <= 0) {
		console.log("end of time");
		endGame();
	}
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { //draw pacman
				context.drawImage(Images[0], center.x - 30, center.y - 30, 30, 30)
			}
			else if (board[i][j] == 11) { //draw food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = threeColors[0]; //color
				context.fill();
			} else if (board[i][j] == 12) { //draw food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = threeColors[1]; //color
				context.fill();
			} else if (board[i][j] == 13) { //draw food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = threeColors[2]; //color
				context.fill();
			}
			else if (board[i][j] == 4) { // wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[i][j] == 6) { // ghost
				context.drawImage(Images[1], center.x - 30, center.y - 30, 30, 30)
			}
		}
	}
}

function UpdatePosition() {
	if (gameOn) {
		board[shape.i][shape.j] = 0;
		var x = GetKeyPressed();
		if (x == 1) {// up
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
				shape.j--;
			}
		}
		if (x == 2) { // down
			if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) {
				shape.j++;
			}
		}
		if (x == 3) { // left
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
				shape.i--;
			}
		}
		if (x == 4) {//right
			if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
				shape.i++;
			}
		}

		if (board[shape.i][shape.j] == 11) {
			score += 5; ballLeft--;
		}
		if (board[shape.i][shape.j] == 12) {
			score += 15; ballLeft--;
		}
		if (board[shape.i][shape.j] == 13) {
			score += 25; ballLeft--;
		}
		board[shape.i][shape.j] = 2;
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;

		// ghost eat the packman?
		for (let i = 0; i < ghostList.length; i++) {
			if (ghostList[i][0] == shape.i && ghostList[i][1] == shape.j) {
				life--;
				if (life == 0) {
					console.log("game over......");
					window.clearInterval(interval);
					window.clearInterval(interval1);
					window.alert("Game completed");
				} else {
					let pos = findRandomEmptyCell(board);
					shape.i = pos[0];
					shape.j = pos[1];
				}
			}
		}
		// player win the game?
		if (ballLeft == 0) {
			console.log("game over......");
			window.clearInterval(interval);
			window.clearInterval(interval1);
			window.alert("Game completed");
		} else {
			Draw();
		}
	}
}

function calcNextStepGhost(x, y) {
	// x,y - current location of the ghost.
	let lstNextmove = checkMoveGhost(x, y);
	dlst = [];
	lstNextmove.forEach(element => {
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
	var newlst = new Array(monsterAmount);
	for (let k = 0; k < ghostList.length; k++) {
		
		let mon = ghostList[k];
		let x = mon[0]; // x of ghost
		let y = mon[1]; // y of ghost

		let pos = calcNextStepGhost(x, y);
		let i = pos[0]
		let j = pos[1]

		board[x][y] = prev;

		prev = board[i][j];

		if (prev == 2){
			prev = 0;
		}
		board[i][j] = 6; // make it ghost.
		newlst.push([i, j]);
	}
	ghostList = newlst;
}