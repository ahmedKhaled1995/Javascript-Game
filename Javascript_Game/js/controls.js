class Controls{

    constructor(gameObjectOne){
        this.gameObjectOne = gameObjectOne;
    }

    setControls(){
        window.addEventListener("keydown", (e)=>{
            this.gameObjectOne.keys = (this.gameObjectOne.keys || []);
            this.gameObjectOne.keys[e.keyCode] = true;   // (e.type == "keydown")
        });

        window.addEventListener("keyup", (e)=>{
            this.gameObjectOne.keys[e.keyCode] = false;
           
        });
    }

}