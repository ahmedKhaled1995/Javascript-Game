import GAME_CONFIG from "./configuration.js";
import GameObject from "./gameObject.js";


class Player extends GameObject {

    constructor(context, startX, startY, width, height, color, speed, img){
        super(context, startX, startY, width, height, color, speed, img);
        this.collisionHeight = 0.6 * this.height;

        this.shots = [];
        this.allowFire = true;
    }

    accelerate(){
        this.startX += this.speedX;
        this.startY += this.speedY;
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
            this.shots.push(new GameObject(
                this.context,
                this.startX + this.width,
                this.startY + (0.5 * this.height),
                GAME_CONFIG.PROJECTILE_WIDTH,
                GAME_CONFIG.PROJECTILE_HEIGHT,
                this.color,
                GAME_CONFIG.PLAYER_PROJECTILE_SPEED,
                document.querySelector("#player_laser")
            ));
            setTimeout(()=>this.allowFire = true, GAME_CONFIG.PLAYER_PROJECTILE_COOLDOWNTIME * 1000)
        }
        
    }

    moveShots(){
        this.shots.forEach((shot)=>{
            shot.autoMoveOneDirection("+x");
            shot.drawSprite();
        });
    }

    handleShotsCollision(gameObjects){
        for(let i = 0; i < this.shots.length; i++){
            for(let j = 0; j < gameObjects.length; j++){
                if(this.shots[i].hasCrashed(gameObjects[j])){
                    this.shots[i].clearObject();
                    gameObjects[j].clearObject();
                }
            }
        }
    }
}

export default Player;