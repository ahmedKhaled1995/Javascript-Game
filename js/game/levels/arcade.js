import GAME_CONFIG from "../configuration.js";
import Game from "../game.js";
import GameObject from "../gameObject.js";
import Player from "../player.js";
import Controls from "../controls.js";
import HighObstaclesGenerator from "../upperObstcaleGenerator.js";
import LowObstaclesGenerator from "../lowerObstcaleGenerator.js";
import ProjectileGenerator from "../projectileGenerator.js";


// Creating the game world
let game = new Game(document.createElement("canvas"));
game.startGameWorld();

// Creaing the player controlled character
let player = new Player(
  game.getContext(),
  GAME_CONFIG.PLAYER_STARTING_X,
  GAME_CONFIG.PLAYER_STARTING_Y,
  GAME_CONFIG.PLAYER_WIDTH,
  GAME_CONFIG.PLAYER_HEIGHT,
  "crimson",
  GAME_CONFIG.PLAYER_SPEED,
  document.querySelector("#player")
);
const playerCollisionHeight = player.height - (2 * (0.4 * player.height));
const playerCollisionStartY = player.startY + (0.4 * player.height);
player.setCollisionHeightAndStartY(playerCollisionHeight, playerCollisionStartY);

// Initializing controls on the player character
let controls = new Controls(player);
controls.setControls();

// Creating the upper walls
let higherObstacle = new GameObject(
  game.getContext(),
  GAME_CONFIG.GAME_WORLD_WIDTH,
  GAME_CONFIG.HEIGHER_OBSTCALE_STARTING_POINT,
  GAME_CONFIG.OBSTCALE_WIDTH, 
  GAME_CONFIG.OBSTCALE_MAX_HEIGHT - GAME_CONFIG.SAFE_FACTOR,
  GAME_CONFIG.OBSTCALE_COLOR,
  GAME_CONFIG.OBSTCALE_SPEED,
  document.querySelector("#laser")
);
let higherObstcaleGenerator = new HighObstaclesGenerator(game.getContext(), higherObstacle, true);
higherObstcaleGenerator.normalDifficulty();
higherObstcaleGenerator.startGeneration(GAME_CONFIG.OBSTCALE_GENERATION_SPEED);

// Creating the lower walls
let lowerObstacle = new GameObject(
  game.getContext(),
  GAME_CONFIG.GAME_WORLD_WIDTH,
  GAME_CONFIG.LOWER_OBSTCALE_STARTING_POINT,
  GAME_CONFIG.OBSTCALE_WIDTH,
  GAME_CONFIG.OBSTCALE_MAX_HEIGHT - GAME_CONFIG.SAFE_FACTOR,
  GAME_CONFIG.OBSTCALE_COLOR,
  GAME_CONFIG.OBSTCALE_SPEED,
  document.querySelector("#laser")
);
let lowerObstcaleGenerator = new LowObstaclesGenerator(game.getContext(), lowerObstacle, true);
lowerObstcaleGenerator.normalDifficulty();
lowerObstcaleGenerator.startGeneration(GAME_CONFIG.OBSTCALE_GENERATION_SPEED);

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
const rocketCollisionHeight = rocket.height - (2 * (0.4 * rocket.height));
const rocketCollisionStartY = rocket.startY + (0.4 * rocket.height);
rocket.setCollisionHeightAndStartY(rocketCollisionHeight, rocketCollisionStartY);
let rocketGenerator = new ProjectileGenerator(game.getContext(), rocket, false);
rocketGenerator.normalDifficulty();
rocketGenerator.startGeneration(GAME_CONFIG.PROJECTILE_GENERATION_SPEED);

// Updating the game world at the specified fps in the configuration file
game.update(() => {
    // Checking collisions
    if(lowerObstcaleGenerator.collisionHappened(player) ||
     higherObstcaleGenerator.collisionHappened(player) ||
     rocketGenerator.collisionHappened(player)){
        game.stop();
        return;
    }

    // Handling collision between player projectiles and enemy projectiles
    player.handleShotsCollision(rocketGenerator.objectMap);
    
    // Clearing game world
    game.clearGameWorld();

    // Updating the game world
    player.checkAcceleration();
    player.accelerate();
    player.resetAcceleration();
    player.drawSprite();
    player.moveShots();

    lowerObstcaleGenerator.moveAndStretch("-x");

    higherObstcaleGenerator.moveAndStretch("-x");

    rocketGenerator.moveObjects("-x");
});