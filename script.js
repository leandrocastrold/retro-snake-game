const stage = document.querySelector('#canvasStage');
const ctx = stage.getContext('2d');
const resolutionSelect = document.querySelector('#resolutionSet');
let pixelQuantity;
const pixelSize = 20;
let direction = "";
let score = 0;
let snake = []

snake[0] = {
    x: 0 * pixelSize,
    y: 0 * pixelSize,
}

function wall(posX, posY) {
    this.x = posX,
        this.y = posY
}

const obstacles = [
    new wall(0, 1),
    new wall(0, 2),
    new wall(0, 3),
    new wall(0, 9),
    new wall(0, 10),
    new wall(0, 11),
    new wall(0, 12),
    new wall(19, 5),
    new wall(19, 6),
    new wall(19, 10),
    new wall(19, 11),
    new wall(19, 12),
    new wall(19, 13),
    new wall(19, 16),
    new wall(19, 17),
    new wall(19, 18),
    new wall(19, 19)
]

const snakeVelocity = 1;

const food = {
    x: Math.floor(Math.random() * 15 + 1) * pixelSize,
    y: Math.floor(Math.random() * 15 + 1) * pixelSize
}

const createBackground = () => {
    pixelQuantity = 20 * pixelSize;
    stage.width = pixelQuantity;
    stage.height = pixelQuantity;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);
}

const showScore = () => {
    ctx.fillStyle = "white"
    ctx.font = "30px Arial bold"
    ctx.fillText(`${score}`, 310, 30);
}

const createObstacles = () => {
    obstacles.forEach(item => {
        ctx.fillStyle = "grey";
        ctx.fillRect(item.x * pixelSize, item.y * pixelSize, pixelSize, pixelSize);
    })
}

const drawFood = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, pixelSize, pixelSize);
}

const randomizeFoodPosition = () => {
    valueX = Math.floor(Math.random() * 15 + 1) * pixelSize;
    valueY = Math.floor(Math.random() * 15 + 1) * pixelSize;

    if (!snake.some(item => item.x == valueX && item.y == valueY)) {
        food.x = valueX;
        food.y = valueY;
    } else {
        randomizeFoodPosition();
    }
}

const drawSnake = () => {
    for (i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, pixelSize, pixelSize);
    }
}

const snakeControls = (control) => {
    switch (control.key) {
        case "ArrowUp":
            if (direction != "down")
                direction = "up"
            break;

        case "ArrowLeft":
            if (direction != 'right')
                direction = "left"
            break;

        case "ArrowDown":
            if (direction != "up")
                direction = "down";
            break;
        case "ArrowRight":
            if (direction != 'left')
                direction = "right";
            break;
    }
}

const setSnakeMovement = () => {

    switch (direction) {
        case "up":
            snake[0].y -= pixelSize;
            break;

        case "right":
            snake[0].x += pixelSize;
            console.log("ss")
            break;

        case "left":
            snake[0].x -= pixelSize;
            break;

        case "down":
            snake[0].y += pixelSize;
            break;
    }
}

const checkSnakePosition = () => {
    if (snake[0].x >= pixelQuantity) {
        snake[0].x = 0
    } else if (snake[0].x < 0) {
        snake[0].x = pixelQuantity - 20;
    }
    if (snake[0].y >= pixelQuantity) {
        snake[0].y = 0
    } else if (snake[0].y < 0) {
        snake[0].y = pixelQuantity - 20;
    }
}

const checkSnakeCollision = () => {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            gameOver();
        }
    }

    if (obstacles.some(obst => (obst.x * pixelSize) == snake[0].x && (obst.y * pixelSize) == snake[0].y)) {
        gameOver();
    } else {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (snakeX != food.x || snakeY != food.y) {
            snake.pop(); 
        } else {
            score += 20
            randomizeFoodPosition();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }
        snake.unshift(newHead);
    }
}

const gameOver = () => {
    checkRecord();
    direction = ""
    for (i = snake.length; i > 1; i--) {
        snake.pop();
    }
    alert('Game Over :(');
    restartGame();
}


const restartGame = () => {
    snake[0].x = 0 * pixelSize;
    snake[0].y = 0 * pixelSize;
    score = 0;
    showRecord();
}

const update = () => {
    createBackground();
    createObstacles();
    checkSnakePosition();
    drawSnake();

    checkSnakeCollision();
    drawFood();
    setSnakeMovement();
    showScore();

}

const showRecord = () => {
    let recordDiv = document.querySelector('#container-record')
    if (localStorage.getItem('record')) {
        let bestScore = parseInt(localStorage.getItem('record'))
        recordDiv.innerHTML = `<p>Record atual: ${bestScore} </p>`
    }
}

const checkRecord = () => {
    if (localStorage.getItem('record')) {
        var currentScore = parseInt(localStorage.getItem('record'))
        if (score > currentScore) {
            localStorage.setItem('record', score)
            console.log(`Temos um novo record: ${score}`);
        }

    } else {
        localStorage.setItem('record', score)
    }
}


document.addEventListener("keydown", snakeControls);
let jogo = setInterval(update, 250);
showRecord();