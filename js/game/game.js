import GAME_CONFIG from "./configuration.js";


class Game  {

    constructor(canvas){
        this.canvas = canvas;

        this.context = this.canvas.getContext("2d");
    }

    startGameWorld(){
        this.canvas.width = GAME_CONFIG.GAME_WORLD_WIDTH;
        this.canvas.height = GAME_CONFIG.GAME_WORLD_HEIGHT;
        //this.canvas.style.backgroundColor = "#eee";
        document.querySelector(".canvas-area").appendChild(this.canvas);
        //const img = document.querySelector("#background");
        //this.context.drawImage(img, 0, 0, GAME_CONFIG.GAME_WORLD_WIDTH, GAME_CONFIG.GAME_WORLD_HEIGHT);
    }

    clearGameWorld(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //const img = document.querySelector("#background");
        //this.context.drawImage(document.querySelector("#background"), 0, 0, GAME_CONFIG.GAME_WORLD_WIDTH, GAME_CONFIG.GAME_WORLD_HEIGHT);
    }

    getContext(){
        return this.context;
    }

    /* Heart of the program, we pass a function that will be called 30 fps */
    update(callback){
        this.interval = setInterval(callback, (1000/GAME_CONFIG.FPS));
    }

    stop(){
        clearInterval(this.interval);
    }
}

export default Game;