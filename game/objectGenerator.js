import GAME_CONFIG from "./configuration.js";


class ObjectGenerator{
    constructor(context, gameObject, randmoizeShape){
        this.context = context;
        this.gameObject = gameObject;
        this.randmoizeShape = randmoizeShape;

        this.objects = [this.gameObject];
        this.speed = this.gameObject.speed;

        this.waveOneSpeedFactorNormal = 1;
        this.waveOneGenerationFactorNormal = 1;
        this.waveTwoSpeedFactorNormal = 1; 
        this.waveTwoGenerationFactorNormal = 1;

        this.waveOneSpeedFactorHard = 1;
        this.waveOneGenerationFactorHard = 1;
        this.waveTwoSpeedFactorHard = 1;
        this.waveTwoGenerationFactorHard = 1;
    }

    getRandomWidth(){
        const minWidth =  this.gameObject.width;
        const maxWidth = minWidth * 5;
        return Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
    }

    getRandomHeight(){
        const maxHeight = GAME_CONFIG.OBSTCALE_MAX_HEIGHT;
        const minHeight = 0.25 * maxHeight;
        return Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    }

    moveObjects(direction){
        this.objects.forEach((object)=>{
            object.autoMoveOneDirection(direction);
            object.drawSprite();
        });
    }

    stretchObjectsVertically(){
        this.objects.forEach((object)=>{
            object.stretchVertically(GAME_CONFIG.OBSTCALE_MIN_HEIGHT, GAME_CONFIG.OBSTCALE_MAX_HEIGHT,
                GAME_CONFIG.OBSTCALE_VERTICAL_INCREMENT);
            object.drawSprite();
        });
    }

    moveAndStretch(direction){
        this.objects.forEach((object)=>{
            object.autoMoveOneDirection(direction);
            object.stretchVertically(GAME_CONFIG.OBSTCALE_MIN_HEIGHT, GAME_CONFIG.OBSTCALE_MAX_HEIGHT,
                GAME_CONFIG.OBSTCALE_VERTICAL_INCREMENT);
            object.drawSprite();
        });
    }

    collisionHappened(gameObject){
        for(let i = 0; i < this.objects.length; i++){
            if(gameObject.hasCrashed(this.objects[i])){
                return true;
            }
        }
        return false;
    }

    normalDifficulty(){
        const timeToDifficultySpike = 5 * 1000;
        // Difficulty spike one
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveOneSpeedFactorNormal, this.waveOneGenerationFactorNormal);
        }, timeToDifficultySpike);
        // Difficulty spike two
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveTwoSpeedFactorNormal, this.waveTwoGenerationFactorNormal);
        }, timeToDifficultySpike*2);
    }

    hardDifficulty(){
        const timeToDifficultySpike = 5 * 1000;
        // Difficulty spike one
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveOneSpeedFactorHard, this.waveOneGenerationFactorHard);
        }, timeToDifficultySpike);
        // Difficulty spike two
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveTwoSpeedFactorHard, this.waveTwoGenerationFactorHard);
        }, timeToDifficultySpike*2);
    }

    modifyGameDifficulty(speedFactor, generationFactor){
        console.log("difficulty increased");
        // Increase projectile spped
        this.speed *= speedFactor;
        this.objects.forEach((item)=>{
            item.speed = this.speed;
        });
        // Increase projectile generation
        clearInterval(this.generationInterva);
        this.startGeneration(this.generationTime/generationFactor);
    }
}

export default ObjectGenerator;