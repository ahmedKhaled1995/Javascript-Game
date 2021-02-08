// Creating the game world
let game = new Game(document.createElement("canvas"));
game.startGameWorld();

// Creaing the player controlled character
const playerCharacter = document.querySelector("#player");
let player = new GameObject(game.getContext(), PLAYER_STARTING_X, PLAYER_STARTING_Y, PLAYER_WIDTH, PLAYER_HEIGHT,
 "crimson", PLAYER_SPEED, playerCharacter);

// Initializing controls on the player character
let controls = new Controls(player);
controls.setControls();

// Creating the upper walls
let higherObstacle = new GameObject(game.getContext(), OBSTCALE_STARTING_X, HEIGHER_OBSTCALE_STARTING_POINT,
 OBSTCALE_WIDTH, (OBSTCALE_MAX_HEIGHT-SAFE_FACTOR),
  "crimson", OBSTCALE_SPEED, undefined);

let higherObstcaleGenerator = new HighObstaclesGenerator(game.getContext(), higherObstacle, true);
higherObstcaleGenerator.startGeneration(OBSTCALE_GENERATION_SPEED);

// Creating the lower walls
let lowerObstacle = new GameObject(game.getContext(), OBSTCALE_STARTING_X, LOWER_OBSTCALE_STARTING_POINT,
 OBSTCALE_WIDTH, OBSTCALE_MAX_HEIGHT-SAFE_FACTOR,
  "crimson", OBSTCALE_SPEED, undefined);
let lowerObstcaleGenerator = new LowObstaclesGenerator(game.getContext(), lowerObstacle, true);
lowerObstcaleGenerator.startGeneration(OBSTCALE_GENERATION_SPEED);

// Creating the rockets attacking the player
let rocket = new GameObject(game.getContext(), GAME_WORLD_WIDTH, GAME_WORLD_HEIGHT/2, PROJECTILE_WIDTH, PROJECTILE_HEIGHT,
 "green", PROJECTILE_SPEED, document.querySelector("#rocket"));
let rocketGenerator = new ProjectileGenerator(game.getContext(), rocket, false);
//rocketGenerator.hardDifficulty();
rocketGenerator.startGeneration(projectileGenerationSpeed);

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