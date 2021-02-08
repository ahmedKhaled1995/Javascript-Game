import GAME_CONFIG from "./configuration.js";
import ObjectGenerator from "./objectGenerator.js";
import GameObject from "./gameObject.js";


class HighObstaclesGenerator extends ObjectGenerator{

    constructor(context, gameObject, randmoizeShape){
        super(context, gameObject, randmoizeShape);
    }


    startGeneration(timeInMilliseconds){
        this.generationTime = timeInMilliseconds;
        this.generationInterva = setInterval(()=>{
            const startX = GAME_CONFIG.GAME_WORLD_WIDTH;  
            let startY, width, height;
            startY = this.gameObject.startY;
            width = this.gameObject.width; 
            if(this.randmoizeShape){
                height = this.getRandomHeight() - GAME_CONFIG.SAFE_FACTOR;
            }else{  
                height = this.gameObject.height - GAME_CONFIG.SAFE_FACTOR;
            }
            this.objects.push(new GameObject(this.context, startX, startY,
                 width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img));
        }, timeInMilliseconds);
    }
}

export default HighObstaclesGenerator;