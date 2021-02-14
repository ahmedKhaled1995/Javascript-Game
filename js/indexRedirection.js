const START_GAME = document.getElementById("game-mode");
const HOW_TO_PLAY = document.getElementById("how-to-play");
const CREDITS = document.getElementById("credits");
const BACK = document.getElementById('back');

function redirectGameMode() { START_GAME.setAttribute("href", `./views/game-mode.html`); }

function redirectHowToPlay() { HOW_TO_PLAY.setAttribute("href", `./views/howToPlay.html`); }

function redirectCredits() { CREDITS.setAttribute("href", `./views/credits.html`); }

function redirectBack() { BACK.setAttribute("href", `/`); }