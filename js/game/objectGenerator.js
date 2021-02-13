import GAME_CONFIG from "./configuration.js";


class ObjectGenerator{

    constructor(context, gameObject, randmoizeShape){
        this.context = context;
        this.gameObject = gameObject;
        this.randmoizeShape = randmoizeShape;

        // Objects generation maps 
        this.generationOver = false;
        this.generationCount = 1;
        this.objectMap = {};   // index : object
        this.objectMap[this.generationCount] = this.gameObject;
        this.generationCount += 1;

        this.speed = this.gameObject.speed;

        this.waveOneSpeedFactorNormal = 1.5;
        this.waveOneGenerationFactorNormal = 1;
        this.waveTwoSpeedFactorNormal = 2; 
        this.waveTwoGenerationFactorNormal = 1.25;

        this.waveOneSpeedFactorHard = 2;
        this.waveOneGenerationFactorHard = 1;
        this.waveTwoSpeedFactorHard = 3;
        this.waveTwoGenerationFactorHard = 2;
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
        for (const index in this.objectMap) {
            this.objectMap[index].autoMoveOneDirection(direction);
            this.objectMap[index].drawSprite();
        }
    }

    stretchObjectsVertically(){
        for (const index in this.objectMap) {
            this.objectMap[index].stretchVertically(GAME_CONFIG.OBSTCALE_MIN_HEIGHT, GAME_CONFIG.OBSTCALE_MAX_HEIGHT,
                GAME_CONFIG.OBSTCALE_VERTICAL_INCREMENT);
            this.objectMap[index].drawSprite();
        }
    }

    moveAndStretch(direction){
        for (const index in this.objectMap) {
            this.objectMap[index].autoMoveOneDirection(direction);
            this.objectMap[index].stretchVertically(GAME_CONFIG.OBSTCALE_MIN_HEIGHT, GAME_CONFIG.OBSTCALE_MAX_HEIGHT,
                GAME_CONFIG.OBSTCALE_VERTICAL_INCREMENT);
            this.objectMap[index].drawSprite();
        }
    }

    collisionHappened(gameObject){
        for (const index in this.objectMap) {
            if(gameObject.hasCrashed(this.objectMap[index])){
                return true;
            }
        }
        return false;
    }

    removeOutOfBoundriesObjects(){
        for (const index in this.objectMap) {
           if(this.objectMap[index].isOutOfBoundries()){
                delete this.objectMap[index];
                //console.log(Object.keys(this.objectMap).length);
           }
        }
    }

    easyDifficulty(){
        const timeToDifficultySpike = GAME_CONFIG.TIME_FOR_DIFFICULTY_TO_SPIKE * 1000;
        setTimeout(()=>{
            this.generationOver = true;
        }, timeToDifficultySpike*3);
    }

    normalDifficulty(){
        const timeToDifficultySpike = GAME_CONFIG.TIME_FOR_DIFFICULTY_TO_SPIKE * 1000;
        // Difficulty spike one
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveOneSpeedFactorNormal, this.waveOneGenerationFactorNormal);
        }, timeToDifficultySpike);
        // Difficulty spike two
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveTwoSpeedFactorNormal, this.waveTwoGenerationFactorNormal);
        }, timeToDifficultySpike*2);
        // Generation stopped (player won)
        setTimeout(()=>{
            this.generationOver = true;
        }, timeToDifficultySpike*3);
    }

    hardDifficulty(){
        const timeToDifficultySpike = GAME_CONFIG.TIME_FOR_DIFFICULTY_TO_SPIKE * 1000;
        // Difficulty spike one
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveOneSpeedFactorHard, this.waveOneGenerationFactorHard);
        }, timeToDifficultySpike);
        // Difficulty spike two
        setTimeout(()=>{
            this.modifyGameDifficulty(this.waveTwoSpeedFactorHard, this.waveTwoGenerationFactorHard);
        }, timeToDifficultySpike*2);
        // Generation stopped (player won)
        setTimeout(()=>{
            this.generationOver = true;
        }, timeToDifficultySpike*3);
    }

    modifyGameDifficulty(speedFactor, generationFactor){
        console.log("difficulty increased");
        // Increase projectile spped
        this.speed *= speedFactor;
        for (const index in this.objectMap) {
            this.objectMap[index].speed = this.speed;
        }
        // Increase projectile generation
        clearInterval(this.generationInterva);
        this.startGeneration(this.generationTime/generationFactor);
    }
}

export default ObjectGenerator;