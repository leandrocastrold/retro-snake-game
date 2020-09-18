const stage = document.querySelector('#canvasStage');
const ctx = stage.getContext('2d');
const resolutionSelect = document.querySelector('#resolutionSet');

const pixelQuantity = stage.width/ 20;
let pixelSize = 0; 

const FPS = 60;

const snake = {
    speed: 1,
    velX: 0,
    velY: 0,
    posX: 0,
    posY: 0,
    score: 0,
    draw: function () {
        ctx.fillStyle = "red";
        ctx.fillRect((this.posX += this.velX) * pixelSize, (this.posY += this.velY) * pixelSize, pixelSize, pixelSize);
    },
}

const food = {
    posX: 0,
    posY: 0,
    draw: function () {
        ctx.fillStyle = "green";
        ctx.fillRect(this.posX, this.posY, pixelSize, pixelSize);
    },

}

const changeFoodPosition = () => {
    food.posX = Math.floor(Math.random() * pixelSize),
    food.posY = Math.floor(Math.random() * pixelSize)
}

const setStageResolution = () => {
    let values = resolutionSelect.value.split('x');
    stage.width = parseInt(values[0]),
        stage.height = parseInt(values[1])
    pixelSize = stage.width / 40;
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
    }
}

    const game = () => {
        checkCollision();
        updateScreen();
        snake.draw();
        food.draw();
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

    document.addEventListener("keydown", evento => {
        const keyPressed = evento.key;
        switch (keyPressed) {
            case "ArrowUp":
                console.log("Subindo...");
                snake.velX = 0;
                snake.velY = -snake.speed;
                break;

            case "ArrowRight":
                console.log("Descendo...");
                snake.velX = snake.speed;
                snake.velY = 0;
                break;

            case "ArrowDown":
                console.log("Descendo...");
                snake.velX = 0;
                snake.velY = snake.speed;
                break;

            case "ArrowLeft":
                console.log("Descendo...");
                snake.velX = -snake.speed;
                snake.velY = 0;
                break;
        }
    })

setStageResolution();
createStage();
showScore();
setInterval(game, FPS)