const stage = document.querySelector('#canvasStage');
const ctx = stage.getContext('2d');
const resolutionSelect = document.querySelector('#resolutionSet');

let pixelSize = 0; 

const FPS = 60;

const snake = {
    speed: 0.5,
    velX: 0,
    velY: 0,
    posX: 0,
    posY: 0,
    draw: function () {
        ctx.fillStyle = "red";
        ctx.fillRect((this.posX += this.velX) * pixelSize, (this.posY += this.velY) * pixelSize, pixelSize, pixelSize);
    },
}

const food = {
    size: 80,
    posX: Math.random() * 200,
    posY: Math.random() * 200,
    draw: function () {
        ctx.fillStyle = "green";
        ctx.fillRect(this.posX, this.posY, this.size, this.size);
    },

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

const render = () => {
    redrawScreen();
    snake.draw();
    food.draw();
}

const redrawScreen = () => {
    ctx.clearRect(0, 0, stage.width, stage.height)
    createStage();
}


resolutionSelect.addEventListener("change", () => {
    setStageResolution();
    redrawScreen();

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
setInterval(render, FPS);