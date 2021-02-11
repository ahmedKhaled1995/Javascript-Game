import GAME_CONFIG from "./configuration.js";
import ObjectGenerator from "./objectGenerator.js";
import GameObject from "./gameObject.js";


class LowObstaclesGenerator extends ObjectGenerator{

    constructor(context, gameObject, randmoizeShape){
        super(context, gameObject, randmoizeShape);
    }

    /* Note that method is overriden */ 
    moveAndStretch(direction){
        for (const index in this.objectMap) {
            this.objectMap[index].autoMoveOneDirection(direction);
            this.objectMap[index].stretchVertically(GAME_CONFIG.OBSTCALE_MIN_HEIGHT, GAME_CONFIG.OBSTCALE_MAX_HEIGHT,
                GAME_CONFIG.OBSTCALE_VERTICAL_INCREMENT);
            // Correcting the start point of the lower obstacle
            this.objectMap[index].startY = GAME_CONFIG.GAME_WORLD_HEIGHT - this.objectMap[index].height;
            this.objectMap[index].collisionStartY = GAME_CONFIG.GAME_WORLD_HEIGHT - this.objectMap[index].height;
            this.objectMap[index].drawSprite();
        }
        // super.moveAndStretch(direction);
        // //Correcting the start point of the lower obstacle
        // object.startY = gameWorldHeight - object.height;
    }

    startGeneration(timeInMilliseconds){
        this.generationTime = timeInMilliseconds;
        this.generationInterva = setInterval(()=>{
            const startX = GAME_CONFIG.GAME_WORLD_WIDTH;  
            let startY, width, height;
            width = this.gameObject.width; 
            if(this.randmoizeShape){
                height = this.getRandomHeight() - GAME_CONFIG.SAFE_FACTOR;
                startY = GAME_CONFIG.GAME_WORLD_HEIGHT - height;
            }else{  
                height = this.gameObject.height - GAME_CONFIG.SAFE_FACTOR;
                startY = this.gameObject.startY;
            }
            const generatedObject = new GameObject(this.context, startX, startY,
                width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img);
            this.objectMap[this.generationCount] = generatedObject;
            this.generationCount += 1;
            // Checking out of boundries objects
            this.removeOutOfBoundriesObjects();
        }, timeInMilliseconds);
    }
}

export default LowObstaclesGenerator;
