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

        this.speedX = 0;
        this.speedY = 0;
        this.keys = [];
    }

    drawObject(){
        this.context.fillStyle = this.color;
        this.context.strokeStyle= this.color;
        this.context.beginPath();
        this.context.fillRect(this.startX, this.startY, this.width, this.height);
        //this.context.rect(this.startX, this.startY, this.width, this.height);
        //this.context.stroke();
    }

    drawSprite(){
        if(this.img === undefined){
            this.drawObject();
        }else{
            this.context.drawImage(this.img, this.startX, this.startY, this.width, this.height);
        }
    }

    accelerate(){
        this.startX += this.speedX;
        this.startY += this.speedY;
    }

    resetAcceleration() {
        this.speedX = 0;
        this.speedY = 0;
    }

    checkAcceleration(){
        if (this.keys && this.keys[37]) { // left arrow
            this.speedX = -this.speed; 
        }if (this.keys && this.keys[39]) { // right arrow
            this.speedX = this.speed; 
        }if (this.keys && this.keys[38]) { // up arrow
            this.speedY = -this.speed; 
        }if (this.keys && this.keys[40]) { // down arrow
            this.speedY = this.speed; 
        }   
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
    }
    
    moveDown() {
        this.startY += this.speed;
    }
    
    moveLeft() {
        this.startX -= this.speed;
    }
    
    moveRight() {
        this.startX += this.speed; 
    }

    stretchVertically(minHeight, maxHeight, increment){
        if(this.height > maxHeight){
            //increment *= -1;
            this.height = minHeight;
        }
        this.height += increment;
    }

    hasCrashed(otherGameObject){
        let thisLeft = this.startX;
        let thisRight = this.startX + this.width;
        let thisTop = this.startY;
        let thisBottom = this.startY + this.height;
        let otherLeft = otherGameObject.startX;
        let otherRight = otherGameObject.startX + otherGameObject.width;
        let otherTop = otherGameObject.startY;
        let otherBottom = otherGameObject.startY + otherGameObject.height;
        let crash = true;
        if ( thisBottom < otherTop) {
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