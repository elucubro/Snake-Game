//Game Constant
let direction = {x: 0, y: 0};
const foodSound = new Audio();
const moveSound = new Audio();
const deathSound = new Audio();
const playArea = document.querySelector("#playArea")
let speed = 20;
let lastPaintTime = 0;
let snakeArray = [{x: 13, y: 15}]
let food = {x: 6, y: 7};
let counter: number = 0;
let highCounter: number = 0;
//high score / score set up
const scoreContainer = document.createElement("div")
scoreContainer.classList.add("scoreContainer")
const score = document.createElement("div")
score.classList.add("score")
const highScore = document.createElement("div")
highScore.classList.add("highScore")
score.textContent = 'Score: 0'
highScore.textContent = 'High score: 0'
scoreContainer.appendChild(score)
scoreContainer.appendChild(highScore)
document.body.appendChild(scoreContainer)



// Game Functions
function main(ctime: any) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();
}

function collide(snake: Array<any>){
    // self collision
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    // wall collision
    if (snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18 || snake[0].x <= 0) return true;
    return false;
}
function gameEngine(){
    //0

    // 1
    //collision handler
    if(collide(snakeArray)){
        deathSound.play();
        direction = {x:0,y:0}
        alert("Game Over, Better Luck Next Time! (ctrl + r to replay)");
        snakeArray = [{x: 13,y:15}]
        if(counter > highCounter){
            highCounter = counter
            highScore.textContent = 'High score: '+ highCounter.toString()
            score.textContent = 'Score: 0'
            counter = 0
        }
    }
    // food regen
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        snakeArray.unshift({x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y});
        let a = 2, b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())};
        counter++
        score.textContent = 'Score: ' + counter.toString()
    }

    //Snake Movement
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;
    // 2
    // @ts-ignore
    playArea.innerHTML = ""
    snakeArray.forEach((e, index)=> {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = String(e.y);
        snakeElement.style.gridColumnStart = String(e.x);
        if (index === 0) {
            snakeElement.classList.add("head")
        } else {
            snakeElement.classList.add("snake")
        }
        // @ts-ignore
        playArea.appendChild(snakeElement)
    });
    // Display Food
    const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = String(food.y);
        foodElement.style.gridColumnStart = String(food.x);
        foodElement.classList.add("food")
        // @ts-ignore
        playArea.appendChild(foodElement);


}
// Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',
    e => {
        direction = {x: 0,y: 0}
        switch (e.key) {
            case "ArrowUp":
                console.log("arrow up");
                direction.x = 0;
                direction.y = -1;
                break;
            case "ArrowDown":
                console.log("arrow Down")
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
    })