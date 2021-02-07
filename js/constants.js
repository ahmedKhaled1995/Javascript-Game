const FPS = 60;

const gameWorldWidth = 960;
const gameWorldHeight = 540;

const playerStartingX = 50;
const playerStartingY = gameWorldHeight / 2;
const playerSpeed = 3;
const playerWidth = 30;
const playerHeight = 30;

const obstcaleSpeed = 1;
const obstacleStartingX = 300;
const obstacleWidth = 10;
const obstacleMaxHeight = (gameWorldHeight - playerHeight) / 2;
const obstacleMinHeight = 20;
const obstacleVerticalIncrement = 3;
const lowObstaleStartingPoint = gameWorldHeight - obstacleMaxHeight;
const hightObstaleStartingPoint = 0;
const safeFactor = 5;