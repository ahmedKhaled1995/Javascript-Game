const GAME_WORLD_WIDTH = 1280;
const GAME_WORLD_HEIGHT = 720;
const PLAYER_HEIGHT = 100;
const OBSTCALE_MAX_HEIGHT = (GAME_WORLD_HEIGHT - PLAYER_HEIGHT) / 2;

const GAME_CONFIG = {
    FPS: 60,
    TIME_FOR_DIFFICULTY_TO_SPIKE: 10,
    
    GAME_WORLD_WIDTH,
    GAME_WORLD_HEIGHT,
    
    PLAYER_STARTING_X: 50,
    PLAYER_STARTING_Y: GAME_WORLD_HEIGHT / 2,
    PLAYER_SPEED: 3,
    PLAYER_WIDTH: 75,
    PLAYER_HEIGHT,
    PLAYER_PROJECTILE_WIDTH: 40,
    PLAYER_PROJECTILE_HEIGHT: 50,
    PLAYER_PROJECTILE_SPEED: 3,
    PLAYER_PROJECTILE_COOLDOWNTIME: 0.5, 
    PLAYER_LIFES: 3,
    PLAYER_SCORE_BONUS: 50,
    PLAYER_TAKEN_DAMAGE: 1, 
    PLAYER_INVINCIBILITY_TIME: 1,
    
    OBSTCALE_SPEED: 1,
    OBSTCALE_GENERATION_SPEED: 1000,
    OBSTCALE_COLOR: "crimson",
    OBSTCALE_STARTING_X: 300,
    OBSTCALE_WIDTH: 18,
    OBSTCALE_MAX_HEIGHT,
    OBSTCALE_MIN_HEIGHT: 20,
    OBSTCALE_VERTICAL_INCREMENT: 3,
    LOWER_OBSTCALE_STARTING_POINT: GAME_WORLD_HEIGHT - OBSTCALE_MAX_HEIGHT,
    HEIGHER_OBSTCALE_STARTING_POINT: 0,
    SAFE_FACTOR: 12,
    
    PROJECTILE_SPEED: 1,
    PROJECTILE_GENERATION_SPEED: 2000,
    PROJECTILE_WIDTH: 50,
    PROJECTILE_HEIGHT: 50,
};

export default GAME_CONFIG;