import GAME_CONFIG from "./configuration.js";
import GameObject from "./gameObject.js";


class Player extends GameObject {

    constructor(context, startX, startY, width, height, color, speed, img){
        super(context, startX, startY, width, height, color, speed, img);

        this.shots = [];
        this.allowFire = true;
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
        }if (this.keys && this.keys[32]) { // space
            this.fire();
        }   
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
        //console.log(this.shots);
        for(let i = 0; i < this.shots.length; i++){
            //console.log("foo");
            for(let j = 0; j < gameObjects.length; j++){
                if(this.shots[i].hasCrashed(gameObjects[j])){
                    this.shots[i].clearObject();
                    gameObjects[j].clearObject();
                    //console.log("collision happened");
                }
            }
        }
    }
}

export default Player;