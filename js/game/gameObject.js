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
        this.collisionHeight = this.height;
        this.keys = [];
    }

    drawObject(){
        this.context.fillStyle = this.color;
        this.context.strokeStyle= this.color;
        this.context.beginPath();
        //this.context.fillRect(this.startX, this.startY, this.width, this.height);
        this.context.rect(this.startX, this.startY, this.width, this.height);
        this.context.stroke();
    }

    drawSprite(){
        if(this.img === undefined){
            this.drawObject();
        }else{
            this.context.drawImage(this.img, this.startX, this.startY, this.width, this.height);
            this.context.beginPath();
            //this.context.fillRect(this.startX, this.startY, this.width, this.height);
            this.context.rect(this.startX, this.startY, this.width, this.height);
            this.context.stroke();
        }
    }

    clearObject(){
        //this.context.clearRect(this.startX, this.startY, this.width, this.height);
        this.width = 0;
        this.height = 0;
        this.startX = 0;
        this.startY = 0;
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
            this.height = minHeight;
        }
        this.height += increment;
    }

    hasCrashed(otherGameObject){
        const thisLeft = this.startX;
        const thisRight = this.startX + this.width;
        const thisTop = this.startY;
        const thisBottom = this.startY + this.collisionHeight;
        const otherLeft = otherGameObject.startX;
        const otherRight = otherGameObject.startX + otherGameObject.width;
        const otherTop = otherGameObject.startY;
        const otherBottom = otherGameObject.startY + otherGameObject.collisionHeight;
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