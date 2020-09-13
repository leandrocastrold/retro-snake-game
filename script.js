 const stage = document.querySelector('#canvasStage'); 
 const ctx = stage.getContext('2d');
 const resolutionSelect = document.querySelector('#resolutionSet');

const setStageResolution = () => {
    let values = resolutionSelect.value.split('x');
       stage.width = parseInt(values[0]),
       stage.height = parseInt(values[1])
    console.log(ctx);
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
