const stage = document.querySelector('#canvasStage');
const ctx = stage.getContext('2d');
const resolutionSelect = document.querySelector('#resolutionSet');

let pixelQuantity = 0;
let pixelSize = 0;

const FPS = 250;

const food = {
    posX: 0,
    posY: 0,
    draw: function () {
        ctx.fillStyle = "green";
        ctx.fillRect(this.posX * pixelSize, this.posY * pixelSize, pixelSize, pixelSize);
    },
}

const snake = {
    size: [3],
    speed: 1,
    velX: 0,
    velY: 0,
    posX: 0,
    posY: 0,
    score: 0,
    draw: function () {
        for (i = 0; i < snake.size.length; i++) {
            //ctx.fillStyle = "red";
           // ctx.fillRect((this.posX += this.velX) * pixelSize, (this.posY += this.velY) * pixelSize, pixelSize, pixelSize);
           ctx.fillStyle = "green";
           ctx.fillRect(snake.size[i].x, snake.size[i].y, pixelSize, pixelSize);
        }
    },
}


const changeFoodPosition = () => {
    food.posX = Math.floor(Math.random() * (pixelQuantity - 1)),
        food.posY = Math.floor(Math.random() * (stage.height / pixelSize - 1))
        console.log(`Food position: posX ${food.posX} posY ${food.posY}`)
}

const setStageResolution = () => {
    let values = resolutionSelect.value.split('x');
    stage.width = parseInt(values[0]),
    stage.height = parseInt(values[1])
    pixelSize = stage.width / 40;
    pixelQuantity = stage.width / pixelSize - 1;
}

const createStage = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);
}

const showScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial bold"
    ctx.fillText(snake.score, stage.width / 1.2, 30);
}

const checkCollision = () => {
    if (snake.posX == food.posX && snake.posY == food.posY) {
        changeFoodPosition();
        snake.score += 10;
    } else if (snake.posX > pixelQuantity || snake.posX < 0 || snake.posY > stage.height / pixelSize - 1 || snake.posY < 0) {
        console.log("Saiu da tela")
        snake.velX = 0;
        snake.velY = 0;
        clearInterval(interval)
        showGameOver();
    } 
}

const game = () => {
    console.log('rodando')
    updateScreen();
    snake.draw();
    food.draw();
    checkCollision();
}

const updateScreen = () => {
    ctx.clearRect(0, 0, stage.width, stage.height)
    createStage();
    showScore();
}


resolutionSelect.addEventListener("change", () => {
    setStageResolution();
    updateScreen();

})

const showGameOver = () => {
    ctx.clearRect(0, 0, stage.width, stage.height)
    createStage();
    ctx.fillStyle = "white";
    ctx.font = "50px Arial bold"
    ctx.fillText("GAME OVER", stage.width / 4, stage.height / 3);
    ctx.fillText(`Sua pontuação: ${snake.score} `, stage.width / 6, stage.height / 2);
    let button = document.createElement("button")
    stage.appendChild(button);
}

document.addEventListener("keydown", evento => {
    const keyPressed = evento.key;
    switch (keyPressed) {
        case "ArrowUp":
            if (snake.velY == 0) {
                snake.velX = 0;
                snake.velY = -snake.speed;
            }
            break;

        case "ArrowRight":
            if (snake.velX == 0) {
                snake.velX = snake.speed;
                snake.velY = 0;
            }
            break;

        case "ArrowDown":
            if (snake.velY == 0) {
                snake.velX = 0;
                snake.velY = snake.speed;
            }
            break;

        case "ArrowLeft":
            if (snake.velX == 0) {
                snake.velX = -snake.speed;
                snake.velY = 0;
            }
            break;
    }
})

setStageResolution();
createStage();
showScore();
snake.size = 8;
let interval = setInterval(game, FPS)