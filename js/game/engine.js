import GAME_CONFIG from "./configuration.js";


class Engine{

    constructor(){

    }

    /* Heart of the program, we pass a function that will be called X times per second. (X is number of frames in one second) */
    update(callback){
        this.interval = setInterval(callback, (1000/GAME_CONFIG.FPS));
    }

    stop(){
        clearInterval(this.interval);
    }

}

export default Engine;