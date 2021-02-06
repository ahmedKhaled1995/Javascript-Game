class ObjectGenerator{
    constructor(context, gameObject, randmoizeShape){
        this.context = context;
        this.gameObject = gameObject;
        this.randmoizeShape = randmoizeShape;

        this.objects = [this.gameObject];
    }

    getRandomWidth(){
        const minWidth =  this.gameObject.width;
        const maxWidth = minWidth * 5;
        return Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
    }

    getRandomHeight(){
        const maxHeight = obstacleMaxHeight;
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
            object.stretchVertically(obstacleMinHeight, obstacleMaxHeight, obstacleVerticalIncrement);
            object.drawSprite();
        });
    }

    moveAndStretch(direction){
        this.objects.forEach((object)=>{
            object.autoMoveOneDirection(direction);
            object.stretchVertically(obstacleMinHeight, obstacleMaxHeight, obstacleVerticalIncrement);
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
            const startX = gameWorldWidth;  
            let startY, width, height;
            startY = this.gameObject.startY;
            width = this.gameObject.width; 
            if(this.randmoizeShape){
                height = this.getRandomHeight() - safeFactor;
            }else{  
                height = this.gameObject.height - safeFactor;
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
            object.stretchVertically(obstacleMinHeight, obstacleMaxHeight, obstacleVerticalIncrement);
            // Correcting the start point of the lower obstacle
            object.startY = gameWorldHeight - object.height;
            object.drawSprite();
        });
        // super.moveAndStretch(direction);
        // //Correcting the start point of the lower obstacle
        // object.startY = gameWorldHeight - object.height;
    }

    startGeneration(timeInMilliseconds){
        let intervalID = setInterval(()=>{
            const startX = gameWorldWidth;  
            let startY, width, height;
            width = this.gameObject.width; 
            if(this.randmoizeShape){
                height = this.getRandomHeight() - safeFactor;
                startY = gameWorldHeight - height;
            }else{  
                height = this.gameObject.height - safeFactor;
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

    getRandomStartingY(){
        const minY =  0.1 * gameWorldHeight;
        const maxY = 0.9 * gameWorldHeight;
        return Math.floor(Math.random()*(maxY-minY+1)+minY);
    }

    startGeneration(timeInMilliseconds){
        let intervalID = setInterval(()=>{
            const startX = gameWorldWidth;  
            let startY, width, height;
            startY = this.getRandomStartingY();
            width = this.gameObject.width; 
            height = this.gameObject.height;
            this.objects.push(new GameObject(this.context, startX, startY,
                 width, height, this.gameObject.color, this.gameObject.speed, this.gameObject.img));
        }, timeInMilliseconds);
    }
}