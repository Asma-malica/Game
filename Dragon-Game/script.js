function init() {
	// images
	dragon_ball_img = new Image();
	dragon_ball_img.src = "assets/dragon-ball.png";

	dragon_head = {
		up: new Image(),
		down: new Image(),
		left: new Image(),
		right: new Image(),
	};
	dragon_head.up.src = "assets/shenron-dragon-up.png";
	dragon_head.down.src = "assets/shenron-dragon-down.png";
	dragon_head.left.src = "assets/shenron-dragon-left.png";
	dragon_head.right.src = "assets/shenron-dragon-right.png";
	// global variables
	canvas = document.getElementById("game-canvas");
	canvas.width = canvas.height = 550;
	ctx = canvas.getContext("2d");
	cellSize = 35;
	gameOver = false;
	score = 0;

	canvas.width = canvas.height = Math.round(canvas.width / cellSize) * cellSize;

	food = getRandomFood();

	snake = {
		initialLength: 5,
		color: "rgba(10,10,10,0.5)",
		cells: [],
		direction: "right",
		cellGap: 1,
		create: function () {
			for (var i = this.initialLength; i > 0; i--) {
				this.cells.push({
					x: i,
					y: 0,
				});
			}
		},
		draw: function () {
			for (var i = 0; i < this.cells.length; i++) {
				ctx.fillStyle = this.color;
				// draw head
				if (i == 0) {
					ctx.drawImage(
						dragon_head[this.direction],
						this.cells[i].x * cellSize,
						this.cells[i].y * cellSize,
						cellSize - this.cellGap + 2,
						cellSize - this.cellGap + 2
					);
				} else {
					// draw body
					ctx.fillStyle = "rgb(14, 192, 58, 0.6)";
					let tail_itr = i < 25 ? i : 25;
					
					ctx.fillRect(
						// dragon_head,
						this.cells[i].x * cellSize,
						this.cells[i].y * cellSize,
						cellSize - this.cellGap - tail_itr,
						cellSize - this.cellGap - tail_itr
					);
				}
			}
		},
		update: function () {
			// var headX = this.cells[0].x;
			// var headY = this.cells[0].y;
			var head = this.cells[0];
			if (head.x == food.x && head.y == food.y) {
				console.log("food eaten");
				food = getRandomFood();
				score++;
			} else {
				this.cells.pop();
			}

			var nextCell = {
				x: head.x,
				y: head.y,
			};
			switch (this.direction) {
				case "right":
					nextCell.x += 1;
					break;
				case "left":
					nextCell.x -= 1;
					break;
				case "down":
					nextCell.y += 1;
					break;
				case "up":
					nextCell.y -= 1;
					break;
				default:
					break;
			}
			this.cells.unshift(nextCell);

			if (
				this.cells[0].y < 0 || // border left
				this.cells[0].x < 0 || // border Top
				this.cells[0].x > canvas.width / cellSize - 1 || // border Right
				this.cells[0].y > canvas.height / cellSize - 1 // border Bottom
				// cellSize - 1
				// reason behind -1, you can know that by removing -1 and play the game
			) {
				gameOver = true;
			}
		},
	};

	snake.create();

	document.addEventListener("keydown", function (event) {
		switch (event.key) {
			case "ArrowRight":
				snake.direction = "right";
				break;
			case "ArrowLeft":
				snake.direction = "left";
				break;
			case "ArrowDown":
				snake.direction = "down";
				break;
			case "ArrowUp":
				snake.direction = "up";
				break;
			default:
				break;
		}
	});
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	snake.draw();

	ctx.fillStyle = food.color;
	// ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
	ctx.drawImage(
		dragon_ball_img,
		food.x * cellSize,
		food.y * cellSize,
		cellSize,
		cellSize
	);

	ctx.fillStyle = "yellow";
	ctx.font = "25px serif";
	ctx.fillText(`${score}`, 150, 50);
}

function update() {
	snake.update();
}

function getRandomFood() {
	return {
		x: Math.round((Math.random() * (canvas.width - cellSize)) / cellSize),
		y: Math.round((Math.random() * (canvas.height - cellSize)) / cellSize),
		color: "red",
	};
}
function reset() {
	gameOverTag.style.display = "none";
	init();
	interval = setInterval(gameLoop, 140);
}

function gameLoop() {
	if (gameOver) {
		gameOverTag.style.display = "block";
		clearInterval(interval);
		// alert(`Your score is ${score}, click OK to repeat the game`);
		document.getElementById("score-text").innerText = score;
		
		return;
	}
	draw();
	update();
}

init();

var gameOverTag = document.getElementById('game-over');
gameOverTag.style.display = "none";
var interval = setInterval(gameLoop, 140);

