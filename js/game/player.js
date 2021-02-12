import GAME_CONFIG from "./configuration.js";
import GameObject from "./gameObject.js";


class Player extends GameObject {

    static player_laser = document.querySelector("#player_laser");

    constructor(context, startX, startY, width, height, color, speed, img){
        super(context, startX, startY, width, height, color, speed, img);

        // Objects generation maps 
        this.shotsCount = 1;
        this.shotMap = {};   // index : shot

        this.allowFire = true;

        this.lifes = GAME_CONFIG.PLAYER_LIFES;
        this.invisible = false;

        this.score = 0;
    }

    increaseScore(score){
        this.score += score;
    }

    accelerate(){
        this.startX += this.speedX;
        this.startY += this.speedY;
        this.collisionStartY += this.speedY;
    }

    checkAcceleration(){
        if (this.keys && this.keys[37] && this.startX >= 0) { // left arrow
            this.speedX = -this.speed; 
        }if (this.keys && this.keys[39] && this.startX + GAME_CONFIG.PLAYER_WIDTH <= GAME_CONFIG.GAME_WORLD_WIDTH) { // right arrow
            this.speedX = this.speed; 
        }if (this.keys && this.keys[38] && this.startY >= 0) { // up arrow
            this.speedY = -this.speed; 
        }if (this.keys && this.keys[40] && this.startY + GAME_CONFIG.PLAYER_HEIGHT <= GAME_CONFIG.GAME_WORLD_HEIGHT) { // down arrow
            this.speedY = this.speed; 
        }if (this.keys && this.keys[32]) { // space
            this.fire();
        }   
    }

    resetAcceleration() {
        this.speedX = 0;
        this.speedY = 0;
    }

    fire(){
        if(this.allowFire){
            this.allowFire = false;
            const shot = new GameObject(
                this.context,
                this.startX + this.width,
                this.startY + (0.5 * this.height),
                GAME_CONFIG.PROJECTILE_WIDTH,
                GAME_CONFIG.PROJECTILE_HEIGHT,
                this.color,
                GAME_CONFIG.PLAYER_PROJECTILE_SPEED,
                player_laser
            );
            this.shotMap[this.shotsCount] = shot; 
            this.shotsCount += 1;
            setTimeout(()=>this.allowFire = true, GAME_CONFIG.PLAYER_PROJECTILE_COOLDOWNTIME * 1000)
        }
    }

    moveShots(){
        for (const index in this.shotMap) {
            this.shotMap[index].autoMoveOneDirection("+x");
            this.shotMap[index].drawSprite();
        }
    }

    takeDamage(){
        if(!this.invisible){
            this.lifes -= GAME_CONFIG.PLAYER_TAKEN_DAMAGE;
            this.invisible = true;
            setTimeout(() => this.invisible = false, 1 * 1000);
        }
    }

    getPlayerShotCollisionInfo(gameObjects){
        for (const indexShot in this.shotMap) {
            for (const indexObject in gameObjects) {
                if(this.shotMap[indexShot].hasCrashed(gameObjects[indexObject])){
                    return {
                        indexShot,
                        indexObject
                    }; 
                }
            }
        }
        return null;
    }
}

export default Player;