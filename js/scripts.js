"use strict";
//Game Constant
let direction = { x: 0, y: 0 };
const foodSound = new Audio();
const moveSound = new Audio();
const deathSound = new Audio();
const playArea = document.querySelector("#playArea");
let speed = 20;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function collide(snake) {
    // self collision
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    // wall collision
    if (snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18 || snake[0].x <= 0)
        return true;
    return false;
}
function gameEngine() {
    // 1
    //collision handler
    if (collide(snakeArray)) {
        deathSound.play();
        direction = { x: 0, y: 0 };
        alert("Game Over, Better Luck Next Time! (ctrl + r to replay)");
        snakeArray = [{ x: 13, y: 15 }];
    }
    // food regen
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //Snake Movement
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = Object.assign({}, snakeArray[i]);
    }
    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;
    // 2
    // @ts-ignore
    playArea.innerHTML = "";
    snakeArray.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = String(e.y);
        snakeElement.style.gridColumnStart = String(e.x);
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        // @ts-ignore
        playArea.appendChild(snakeElement);
    });
    // Display Food
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = String(food.y);
    foodElement.style.gridColumnStart = String(food.x);
    foodElement.classList.add("food");
    // @ts-ignore
    playArea.appendChild(foodElement);
}
// Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 0 };
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow up");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("arrow Down");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("arrow left");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("arrow right");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
});
