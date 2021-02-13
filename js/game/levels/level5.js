import GAME_CONFIG from "../configuration.js";
import Game from "../game.js";
import GameObject from "../gameObject.js";
import Player from "../player.js";
import Controls from "../controls.js";
import HighObstaclesGenerator from "../upperObstcaleGenerator.js";
import LowObstaclesGenerator from "../lowerObstcaleGenerator.js";
import ProjectileGenerator from "../projectileGenerator.js";
import Engine from "../engine.js";


// Creating engine
const engine = new Engine();


// Creating the game world
let game = new Game(document.createElement("canvas"));
game.startGameWorld();

// Creaing the player controlled character
let player = new Player(
  game.context,
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
  game.context,
  GAME_CONFIG.GAME_WORLD_WIDTH,
  GAME_CONFIG.HEIGHER_OBSTCALE_STARTING_POINT,
  GAME_CONFIG.OBSTCALE_WIDTH, 
  GAME_CONFIG.OBSTCALE_MAX_HEIGHT - GAME_CONFIG.SAFE_FACTOR,
  GAME_CONFIG.OBSTCALE_COLOR,
  GAME_CONFIG.OBSTCALE_SPEED,
  document.querySelector("#laser")
);
let higherObstcaleGenerator = new HighObstaclesGenerator(game.context, higherObstacle, true);
higherObstcaleGenerator.normalDifficulty();
higherObstcaleGenerator.startGeneration(GAME_CONFIG.OBSTCALE_GENERATION_SPEED);

// Creating the lower walls
let lowerObstacle = new GameObject(
  game.context,
  GAME_CONFIG.GAME_WORLD_WIDTH,
  GAME_CONFIG.LOWER_OBSTCALE_STARTING_POINT,
  GAME_CONFIG.OBSTCALE_WIDTH,
  GAME_CONFIG.OBSTCALE_MAX_HEIGHT ,
  GAME_CONFIG.OBSTCALE_COLOR,
  GAME_CONFIG.OBSTCALE_SPEED,
  document.querySelector("#laser")
);
let lowerObstcaleGenerator = new LowObstaclesGenerator(game.context, lowerObstacle, true);
lowerObstcaleGenerator.normalDifficulty();
lowerObstcaleGenerator.startGeneration(GAME_CONFIG.OBSTCALE_GENERATION_SPEED);

// Creating the rockets attacking the player
let rocket = new GameObject(
  game.context,
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
let rocketGenerator = new ProjectileGenerator(game.context, rocket, false);
rocketGenerator.normalDifficulty();
rocketGenerator.startGeneration(GAME_CONFIG.PROJECTILE_GENERATION_SPEED);

// Used to limit draw damage to every 1000 milliseconds
let drawDamage = true;

// Updating the game world at the specified fps in the configuration file
engine.update(() => {
    // Clearing game world
    game.clearGameWorld();

    // Checking game over
    if(player.lifes <= 0){
      engine.stop();
      game.gameOver();
    }

    // Checking collisions
    if(rocketGenerator.collisionHappened(player) ||
      higherObstcaleGenerator.collisionHappened(player) ||
      lowerObstcaleGenerator.collisionHappened(player)){
        player.takeDamage();
        if(player.lifes > 0 && drawDamage){  // We check because when the player dies, I don't want to draw the bonus
          drawDamage = false;
          game.drawDamageTaken();
          setTimeout(() => drawDamage = true, 1000);          
        }
    }

    // Handling collision between player projectiles and enemy projectiles
    const playerShotCollisionInfo = player.getPlayerShotCollisionInfo(rocketGenerator.objectMap);
    if(playerShotCollisionInfo != null){
      player.shotMap[playerShotCollisionInfo.indexShot].clearObject();
      rocketGenerator.objectMap[playerShotCollisionInfo.indexObject].clearObject();
      delete player.shotMap[playerShotCollisionInfo.indexShot];
      player.increaseScore(GAME_CONFIG.PLAYER_SCORE_BONUS);
      game.drawBonus(GAME_CONFIG.PLAYER_SCORE_BONUS);
    }

    // Updating rocket generator and obstcales 
    rocketGenerator.moveObjects("-x");
    higherObstcaleGenerator.moveAndStretch("-x");
    lowerObstcaleGenerator.moveAndStretch("-x");

    // Updating player
    player.checkAcceleration();
    player.accelerate();
    player.resetAcceleration();
    player.drawSprite();
    player.moveShots();
    player.increaseScore(.05);

    // Updating UI
    game.drawScore(player);
    game.drawLifes(player);
});