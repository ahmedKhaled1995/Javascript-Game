import GAME_CONFIG from "./configuration.js";


class Game  {

    constructor(canvas){
        this.canvas = canvas;

        this.context = this.canvas.getContext("2d");
    }

    drawLifes(gameObject){
        this.context.fillStyle = gameObject.color;
        this.context.strokeStyle= gameObject.color;
        this.context.font = "30px Arial";
        this.context.fillText(
            `Lifes: ${gameObject.lifes}`,
            GAME_CONFIG.GAME_WORLD_WIDTH - (0.15 * GAME_CONFIG.GAME_WORLD_WIDTH ),
            0.1 * GAME_CONFIG.GAME_WORLD_HEIGHT
        );
    }

    drawDamageTaken(){
        this.context.fillStyle = "crimson";
        let count = 1;
        let id = setInterval(()=>{
            this.context.fillText(
                `-${parseInt(GAME_CONFIG.PLAYER_TAKEN_DAMAGE)}`,
                GAME_CONFIG.GAME_WORLD_WIDTH - (0.15 * GAME_CONFIG.GAME_WORLD_WIDTH ),
                0.18 * GAME_CONFIG.GAME_WORLD_HEIGHT
            );
            count += 1;            
            if(count >= GAME_CONFIG.FPS){
                clearInterval(id);
            }

        }, (1000/GAME_CONFIG.FPS));
    }

    drawScore(gameObject){
        this.context.fillStyle = gameObject.color;
        this.context.strokeStyle= gameObject.color;
        this.context.font = "30px Arial";
        this.context.fillText(
            `Score: ${parseInt(gameObject.score)}`,
            0.05 * GAME_CONFIG.GAME_WORLD_WIDTH,
            0.1 * GAME_CONFIG.GAME_WORLD_HEIGHT
        );
    }

    drawBonus(bonus){
        this.context.fillStyle = "crimson";
        let count = 1;
        let id = setInterval(()=>{
            this.context.fillText(
                `+${parseInt(bonus)}`,
                0.135 * GAME_CONFIG.GAME_WORLD_WIDTH,
                0.18 * GAME_CONFIG.GAME_WORLD_HEIGHT
            );
            count += 1;
            if(count >= GAME_CONFIG.FPS){
                clearInterval(id);
            }
        }, (1000/GAME_CONFIG.FPS));
    }

    gameOver(){
        let fontSize = 8;
        this.context.fillStyle = "crimson";
        this.context.strokeStyle= "crimson";
        this.context.font = `${fontSize}px Arial`;

        let id = setInterval(()=>{
            this.clearGameWorld();
            this.context.fillText(
                "Game Over",
                0.5 * GAME_CONFIG.GAME_WORLD_WIDTH - (0.08 * GAME_CONFIG.GAME_WORLD_WIDTH),
                0.5 * GAME_CONFIG.GAME_WORLD_HEIGHT
            );
            fontSize += 1;
            this.context.font = `${fontSize}px Arial`;
            
            if(fontSize >= 30){
                clearInterval(id);
            }

        }, 0.03 * 1000);
    }

    startGameWorld(){
        this.canvas.width = GAME_CONFIG.GAME_WORLD_WIDTH;
        this.canvas.height = GAME_CONFIG.GAME_WORLD_HEIGHT;
        //this.canvas.style.backgroundColor = "#eee";
        document.querySelector(".canvas-area").appendChild(this.canvas);
        document.querySelector(".canvas-area").setAttribute('style', `background-size: ${this.canvas.width}px ${this.canvas.height}px`);;
        //const img = document.querySelector("#background");
        //this.context.drawImage(img, 0, 0, GAME_CONFIG.GAME_WORLD_WIDTH, GAME_CONFIG.GAME_WORLD_HEIGHT);
    }

    clearGameWorld(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        //const img = document.querySelector("#background");
        //this.context.drawImage(document.querySelector("#background"), 0, 0, GAME_CONFIG.GAME_WORLD_WIDTH, GAME_CONFIG.GAME_WORLD_HEIGHT);
    }
}

export default Game;