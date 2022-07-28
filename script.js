// Update Loop

import Ball from './Ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const winElement = document.getElementById("who-won");  

let lastTime;


function update(time){

    if(lastTime != null){
    
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue
        ("--hue"));

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);


        if(over){
            ball.reset();
            ball.velocity = 0;  
            if(parseInt(playerScoreElement.textContent) >  parseInt(computerScoreElement.textContent)){
                winElement.style.opacity = 1;
                winElement.innerHTML = "You Won!";
            }
            else if(parseInt(playerScoreElement.textContent) < parseInt(computerScoreElement.textContent)){
                winElement.style.opacity = 1;
                winElement.innerHTML = "You Lost :(";
            }
            else{
                winElement.style.opacity = 1;
                winElement.innerHTML = "Draw, try again!";

                startAgain();
            }
        }
        
        if (isLose()) {
            handleLose();
    }

}

    lastTime = time;
    window.requestAnimationFrame(update);
}

function handleLose(){
    const rect = ball.rect;
    if(rect.right >= window.innerWidth){
        
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
    }
    else{
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;

    }

    ball.reset();
    computerPaddle.reset();
}
function isLose(){
    const rect = ball.rect();
    return rect.left <= 0 || rect.right >= window.innerWidth;
}

document.addEventListener("mousemove", e => 
{
    playerPaddle.position = e.y / window.innerHeight * 100;
});

const restart = document.querySelector(".again")
document.addEventListener("click", e =>
{
    
})

const stop = document.querySelector(".stop");
stop.addEventListener("click", e => {
    over = true;
});
let over = false;


window.requestAnimationFrame(update);
