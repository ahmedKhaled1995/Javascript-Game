import GAME_CONFIG from "../configuration.js";
import Game from "../game.js";
import GameObject from "../gameObject.js";
import Controls from "../controls.js";
import HighObstaclesGenerator from "../upperObstcaleGenerator.js";
import LowObstaclesGenerator from "../lowerObstcaleGenerator.js";
import ProjectileGenerator from "../projectileGenerator.js";


// Creating the game world
let game = new Game(document.createElement("canvas"));
game.startGameWorld();

// Creaing the player controlled character
let player = new GameObject(
  game.getContext(),
  GAME_CONFIG.PLAYER_STARTING_X,
  GAME_CONFIG.PLAYER_STARTING_Y,
  GAME_CONFIG.PLAYER_WIDTH,
  GAME_CONFIG.PLAYER_HEIGHT,
  "crimson",
  GAME_CONFIG.PLAYER_SPEED,
  document.querySelector("#player")
);

// Initializing controls on the player character
let controls = new Controls(player);
controls.setControls();

// Creating the lower walls
let lowerObstacle = new GameObject(
  game.getContext(),
  GAME_CONFIG.OBSTCALE_STARTING_X,
  GAME_CONFIG.LOWER_OBSTCALE_STARTING_POINT,
  GAME_CONFIG.OBSTCALE_WIDTH,
  GAME_CONFIG.OBSTCALE_MAX_HEIGHT - GAME_CONFIG.SAFE_FACTOR,
  GAME_CONFIG.OBSTCALE_COLOR,
  GAME_CONFIG.OBSTCALE_SPEED,
  document.querySelector("#laser")
);
let lowerObstcaleGenerator = new LowObstaclesGenerator(game.getContext(), lowerObstacle, true);
lowerObstcaleGenerator.normalDifficulty();
lowerObstcaleGenerator.startGeneration(GAME_CONFIG.OBSTCALE_GENERATION_SPEED, true);

// Creating the rockets attacking the player
let rocket = new GameObject(
  game.getContext(),
  GAME_CONFIG.GAME_WORLD_WIDTH, 
  GAME_CONFIG.GAME_WORLD_HEIGHT/2,
  GAME_CONFIG.PROJECTILE_WIDTH,
  GAME_CONFIG.PROJECTILE_HEIGHT,
  "green",
  GAME_CONFIG.PROJECTILE_SPEED,
  document.querySelector("#rocket")
);
let rocketGenerator = new ProjectileGenerator(game.getContext(), rocket, false);
rocketGenerator.normalDifficulty();
rocketGenerator.startGeneration(GAME_CONFIG.PROJECTILE_GENERATION_SPEED);

// Updating the game world at 30 fps
game.update(() => {
    // Checking collisions
    if(lowerObstcaleGenerator.collisionHappened(player) || rocketGenerator.collisionHappened(player)){
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

    rocketGenerator.moveObjects("-x");
});