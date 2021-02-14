import GAME_CONFIG from "./configuration.js";


class GameObject{

    constructor(context, startX, startY, width, height, color, speed, img){
        this.context = context;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.img = img;

        this.collisionHeight = this.height;
        this.collisionStartY = this.startY; 

        this.speedX = 0;
        this.speedY = 0;
        this.keys = [];
    }

    setCollisionHeightAndStartY(collisionHeight, collisionStartY){
        this.collisionHeight = collisionHeight;
        this.collisionStartY = collisionStartY;
    }

    drawObject(){
        this.context.fillStyle = this.color;
        this.context.strokeStyle= this.color;
        this.context.beginPath();
        //this.context.fillRect(this.startX, this.startY, this.width, this.height);
        this.context.rect(this.startX, this.startY, this.width, this.height);
        this.context.stroke();
    }

    drawCollider(){
        this.context.fillStyle = this.color;
        this.context.strokeStyle= this.color;
        this.context.beginPath();
        //this.context.fillRect(this.startX, this.startY, this.width, this.height);
        this.context.rect(this.startX, this.collisionStartY, this.width, this.collisionHeight);
        this.context.stroke();
    }

    drawSprite(){
        if(this.img === undefined){
            this.drawObject();
        }else{
            this.context.drawImage(this.img, this.startX, this.startY, this.width, this.height);
            //this.drawCollider();   // debugging only
        }
    }

    clearObject(){
        this.width = 0;
        this.height = 0;
        this.startX = 0;
        this.startY = 0;
    }

    isOutOfBoundries(){
        let outOfBounds = false;
        if(this.startX > GAME_CONFIG.GAME_WORLD_WIDTH || 
            this.startX < 0 ||
            this.startY > GAME_CONFIG.GAME_WORLD_HEIGHT ||
            this.startY < 0){
                outOfBounds = true;
        }
        return outOfBounds;
    }

    autoMoveOneDirection(direction){
        if(direction === "+x"){
            this.moveRight();
        }else if(direction === "-x"){
            this.moveLeft();
        }else if(direction === "-y"){
            this.moveDown();
        }else if(direction === "+y"){
            this.moveUp();
        }
    }

    moveUp() {
        this.startY -= this.speed;
        this.collisionStartY -= this.speed; 
    }
    
    moveDown() {
        this.startY += this.speed;
        this.collisionStartY += this.speed; 
    }
    
    moveLeft() {
        this.startX -= this.speed;
    }
    
    moveRight() {
        this.startX += this.speed; 
    }

    stretchVertically(minHeight, maxHeight, increment){
        if(this.height > maxHeight){
            this.height = minHeight;
            this.collisionHeight = minHeight;
        }
        this.height += increment;
        this.collisionHeight += increment;
    }

    hasCrashed(otherGameObject){
        const thisLeft = this.startX;
        const thisRight = this.startX + this.width;
        const thisTop = this.collisionStartY;
        const thisBottom = this.collisionStartY + this.collisionHeight;
        const otherLeft = otherGameObject.startX;
        const otherRight = otherGameObject.startX + otherGameObject.width;
        const otherTop = otherGameObject.collisionStartY;
        const otherBottom = otherGameObject.collisionStartY + otherGameObject.collisionHeight;
        let crash = true;
        if (thisBottom < otherTop) {
            crash = false;
        } if(thisTop > otherBottom) {
            crash = false;
        } if(thisRight < otherLeft) {
            crash = false;
            this.crashedRight = true;
        } if(thisLeft > otherRight ) {
            crash = false;
        }
        return crash;
    }
}


export default GameObject;