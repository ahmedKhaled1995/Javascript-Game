import GAME_CONFIG from "./configuration.js";
import ObjectGenerator from "./objectGenerator.js";
import GameObject from "./gameObject.js";


class ProjectileGenerator extends ObjectGenerator{

    constructor(context, gameObject, randmoizeShape){
      super(context, gameObject, randmoizeShape);

      this.waveOneSpeedFactorNormal = 2;
      this.waveOneGenerationFactorNormal = 4;
      this.waveTwoSpeedFactorNormal = 2; 
      this.waveTwoGenerationFactorNormal = 1;

      this.waveOneSpeedFactorHard = 3;
      this.waveOneGenerationFactorHard = 4;
      this.waveTwoSpeedFactorHard = 3;
      this.waveTwoGenerationFactorHard = 2;
    }

    getRandomStartingY(){
        const minY =  0.1 * GAME_CONFIG.GAME_WORLD_HEIGHT;
        const maxY = 0.9 * GAME_CONFIG.GAME_WORLD_HEIGHT;
        return Math.floor(Math.random()*(maxY-minY+1)+minY);
    }

    startGeneration(timeInMilliseconds){
        this.generationTime = timeInMilliseconds;
        this.generationInterva = setInterval(()=>{
            const startX = GAME_CONFIG.GAME_WORLD_WIDTH;  
            let startY, width, height;
            startY = this.getRandomStartingY();
            width = this.gameObject.width; 
            height = this.gameObject.height;
            this.objects.push(new GameObject(this.context, startX, startY,
                    width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img));
        }, timeInMilliseconds);
    }
}

export default ProjectileGenerator;