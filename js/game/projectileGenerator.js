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
            const startY = this.getRandomStartingY();

            const rocket = new GameObject(
                this.context,
                startX,
                startY,
                GAME_CONFIG.PROJECTILE_WIDTH,
                GAME_CONFIG.PROJECTILE_HEIGHT,
                this.gameObject.color,
                this.gameObject.speed,
                this.gameObject.img
            );
            const rocketCollisionHeight = rocket.height - (2 * (0.4 * rocket.height));
            const rocketCollisionStartY = rocket.startY + (0.4 * rocket.height);
            rocket.setCollisionHeightAndStartY(rocketCollisionHeight, rocketCollisionStartY);

            this.objectMap[this.generationCount] = rocket;
            this.generationCount += 1;
            
            // Checking out of boundries objects
            this.removeOutOfBoundriesObjects();
        }, timeInMilliseconds);
    }
}

export default ProjectileGenerator;