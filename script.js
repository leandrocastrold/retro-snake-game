 const stage = document.querySelector('#canvasStage'); 
 const ctx = stage.getContext('2d');
 const resolutionSelect = document.querySelector('#resolutionSet');
 
const FPS = 60;

const snake = {
    headSize: 200,
    draw: function() {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 15, 15);
        console.log("Desenhou CObra" + this.headSize)
    }
}

const food = {
    size: 80,
        posX: Math.random() * 200,
        posY: Math.random() * 200,
    draw: function () {
        ctx.fillStyle = "green";
        ctx.fillRect(this.posX, this.posY, this.size, this.size);
        console.log("Desenhou CObra" + this.headSize)
    }
}

const setStageResolution = () => {
    let values = resolutionSelect.value.split('x');
       stage.width = parseInt(values[0]),
       stage.height = parseInt(values[1])
}

const createStage = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);
}

const redrawScreen = () => {
    ctx.clearRect(0, 0, stage.width, stage.height)
    createStage();
}



resolutionSelect.addEventListener("change", () => {
    setStageResolution();
    redrawScreen();
    
})

setStageResolution();
createStage();
snake.draw();
food.draw();

