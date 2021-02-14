const EASY_LEVEL = document.getElementById("easy-level");
const INTERMEDIATE_LEVEL = document.getElementById("intermediate-level");
const HARD_LEVEL = document.getElementById("hard-level");
const ARCADE_MODE = document.getElementById("arcade-mode");

function redirectEasyLevel() { EASY_LEVEL.setAttribute("href", `./spaceship-select.html?level=easy`); }

function redirectIntermediateLevel() { INTERMEDIATE_LEVEL.setAttribute("href", `./spaceship-select.html?level=intermediate`); }

function redirectHardLevel() { HARD_LEVEL.setAttribute("href", `./spaceship-select.html?level=hard`); }

function redirectArcadeMode() { ARCADE_MODE.setAttribute("href", `./spaceship-select.html?level=arcade`); }