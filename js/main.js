// Creating the game world
let game = new Game(document.createElement("canvas"));
game.startGameWorld();

// Creaing the player controlled character
const playerCharacter = document.querySelector("#player");
let player = new GameObject(game.getContext(), playerStartingX, playerStartingY, playerWidth, playerHeight,
 "crimson", playerSpeed, playerCharacter);

// Initializing controls on the player character
let controls = new Controls(player);
controls.setControls();

// Creating the upper walls
let higherObstacle = new GameObject(game.getContext(), obstacleStartingX, hightObstaleStartingPoint,
 obstacleWidth, (obstacleMaxHeight-safeFactor),
  "red", obstcaleSpeed, undefined);

let higherObstcaleGenerator = new HighObstaclesGenerator(game.getContext(), higherObstacle, true);
higherObstcaleGenerator.startGeneration(1000);

// Creating the lower walls
let lowerObstacle = new GameObject(game.getContext(), obstacleStartingX, lowObstaleStartingPoint,
 obstacleWidth, obstacleMaxHeight-safeFactor,
  "red", obstcaleSpeed, undefined);
let lowerObstcaleGenerator = new LowObstaclesGenerator(game.getContext(), lowerObstacle, true);
lowerObstcaleGenerator.startGeneration(1000);

// Creating the rockets attacking the player
let rocket = new GameObject(game.getContext(), gameWorldWidth, gameWorldHeight/2, 50, 30,
 "green", 1, document.querySelector("#rocket"));
let rocketGenerator = new ProjectileGenerator(game.getContext(), rocket, false);
rocketGenerator.startGeneration(2000);

// Updating the game world at 30 fps
game.update(() => {
    // Checking collisions
    if(lowerObstcaleGenerator.collisionHappened(player) ||
     higherObstcaleGenerator.collisionHappened(player) ||
     rocketGenerator.collisionHappened(player)){
        game.stop();
        return;
    }

    // Clearing game world
    game.clearGameWorld();

    // Updating the game world
    player.checkAcceleration();
    player.accelerate();
    player.resetAcceleration();
    player.drawSprite();

    lowerObstcaleGenerator.moveAndStretch("-x");

    higherObstcaleGenerator.moveObjects("-x");

    rocketGenerator.moveObjects("-x");
});