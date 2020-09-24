const stage = document.querySelector('#canvasStage');
const ctx = stage.getContext('2d');
const resolutionSelect = document.querySelector('#resolutionSet');
let pixelQuantity;
const pixelSize = 20;
let direction = "";

let snake = []

snake[0] = {
    x: 0 * pixelSize,
    y: 15 * pixelSize,
}

const snakeVelocity = 1;

const food = {
    x: Math.floor(Math.random() * 15 + 1) * pixelSize,
    y: Math.floor(Math.random() * 15 + 1) * pixelSize
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

const createBackground = () => {
    pixelQuantity = 20 * pixelSize;
    stage.width = pixelQuantity;
    stage.height = pixelQuantity;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);
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
        snake[0].x = pixelQuantity - 20 ;
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

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        randomizeFoodPosition();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

const gameOver = () => {
    //clearInterval(jogo);
    direction = ""
    for (i = snake.length; i > 0; i--) {
        snake.pop();
        console.log("Snake Length: " + snake.length)
        createBackground();
        createSnake();
    }

    alert('Game Over :(');
}

const update = () => {
    createBackground();
    checkSnakePosition();
    drawSnake();
    
    checkSnakeCollision();
    drawFood();
    setSnakeMovement();
}


document.addEventListener("keydown", snakeControls);
let jogo = setInterval(update, 250);