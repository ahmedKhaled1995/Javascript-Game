class ObjectGenerator{
    constructor(context, gameObject, randmoizeShape){
        this.context = context;
        this.gameObject = gameObject;
        this.randmoizeShape = randmoizeShape;

        this.objects = [this.gameObject];
        this.speed = this.gameObject.speed;
    }

    getRandomWidth(){
        const minWidth =  this.gameObject.width;
        const maxWidth = minWidth * 5;
        return Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
    }

    getRandomHeight(){
        const maxHeight = OBSTCALE_MAX_HEIGHT;
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
            object.stretchVertically(OBSTCALE_MIN_HEIGHT, OBSTCALE_MAX_HEIGHT, OBSTCALE_VERTICAL_INCREMENT);
            object.drawSprite();
        });
    }

    moveAndStretch(direction){
        this.objects.forEach((object)=>{
            object.autoMoveOneDirection(direction);
            object.stretchVertically(OBSTCALE_MIN_HEIGHT, OBSTCALE_MAX_HEIGHT, OBSTCALE_VERTICAL_INCREMENT);
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
}


/***********************************************************/

class HighObstaclesGenerator extends ObjectGenerator{

    constructor(context, gameObject, randmoizeShape){
        super(context, gameObject, randmoizeShape);
    }


    startGeneration(timeInMilliseconds){
        let intervalID = setInterval(()=>{
            const startX = GAME_WORLD_WIDTH;  
            let startY, width, height;
            startY = this.gameObject.startY;
            width = this.gameObject.width; 
            if(this.randmoizeShape){
                height = this.getRandomHeight() - SAFE_FACTOR;
            }else{  
                height = this.gameObject.height - SAFE_FACTOR;
            }
            this.objects.push(new GameObject(this.context, startX, startY,
                 width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img));
        }, timeInMilliseconds);
    }
}

/***********************************************************/

class LowObstaclesGenerator extends ObjectGenerator{

    constructor(context, gameObject, randmoizeShape){
        super(context, gameObject, randmoizeShape);
    }

    /* Note that method is overriden */ 
    moveAndStretch(direction){
        this.objects.forEach((object)=>{
            object.autoMoveOneDirection(direction);
            object.stretchVertically(OBSTCALE_MIN_HEIGHT, OBSTCALE_MAX_HEIGHT, OBSTCALE_VERTICAL_INCREMENT);
            // Correcting the start point of the lower obstacle
            object.startY = GAME_WORLD_HEIGHT - object.height;
            object.drawSprite();
        });
        // super.moveAndStretch(direction);
        // //Correcting the start point of the lower obstacle
        // object.startY = gameWorldHeight - object.height;
    }

    startGeneration(timeInMilliseconds){
        let intervalID = setInterval(()=>{
            const startX = GAME_WORLD_WIDTH;  
            let startY, width, height;
            width = this.gameObject.width; 
            if(this.randmoizeShape){
                height = this.getRandomHeight() - SAFE_FACTOR;
                startY = GAME_WORLD_HEIGHT - height;
            }else{  
                height = this.gameObject.height - SAFE_FACTOR;
                startY = this.gameObject.startY;
            }
            this.objects.push(new GameObject(this.context, startX, startY,
                 width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img));
        }, timeInMilliseconds);
    }

}


/***********************************************************/

class ProjectileGenerator extends ObjectGenerator{
    constructor(context, gameObject, randmoizeShape){
      super(context, gameObject, randmoizeShape);
    }

    normalDifficulty(){
        const timeToDifficultySpike = 5 * 1000;
        // Difficulty spike one
        setTimeout(()=>{
            this.modifyGameDifficulty(2, 4);
        }, timeToDifficultySpike);
        // Difficulty spike two
        setTimeout(()=>{
            this.modifyGameDifficulty(2, 1);
        }, timeToDifficultySpike*2);
    }

    hardDifficulty(){
        const timeToDifficultySpike = 5 * 1000;
        // Difficulty spike one
        setTimeout(()=>{
            this.modifyGameDifficulty(3, 4);
        }, timeToDifficultySpike);
        // Difficulty spike two
        setTimeout(()=>{
            this.modifyGameDifficulty(3, 2);
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

    getRandomStartingY(){
        const minY =  0.1 * GAME_WORLD_HEIGHT;
        const maxY = 0.9 * GAME_WORLD_HEIGHT;
        return Math.floor(Math.random()*(maxY-minY+1)+minY);
    }

    startGeneration(timeInMilliseconds){
        this.generationTime = timeInMilliseconds;
        this.generationInterva = setInterval(()=>{
            const startX = GAME_WORLD_WIDTH;  
            let startY, width, height;
            startY = this.getRandomStartingY();
            width = this.gameObject.width; 
            height = this.gameObject.height;
            this.objects.push(new GameObject(this.context, startX, startY,
                    width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img));
        }, timeInMilliseconds);
    }
}