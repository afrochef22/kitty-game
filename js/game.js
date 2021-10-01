const start = document.getElementById("start");
const pause = document.getElementById("pause")
const kitty = document.querySelector("#kitty");
const pepper = document.querySelector("#pepper");
const pepperAnimation = document.querySelector(".pepper-animation");
let gameStart = 0;
let counter = 0;
let highScore = 0;
let randomizeSpeed = 0;
let interval = 0;
let enabled = true
pause.style.display = "none";

// Game paused until START button is clicked or ENTER keyboard input.
pepper.style.webkitAnimationPlayState = "paused";
kitty.style.webkitAnimationPlayState = "paused";

// Kitty jump animation.
function jump() {
    if (kitty.style.webkitAnimationPlayState === "running") {
        if (kitty.classList == "animate") { return }
        kitty.classList.add("animate");
        setTimeout(function () {
            kitty.classList.remove("animate");
        }, 300);
    }
}

// Start game with ENTER keyboard input or by clicking start button.
// Kitty jumps with mouse click, UP or SPACEBAR keyboard input. 
start.addEventListener("click", function () {
    gameLogic();
    pause.style.display = "inline-block";

    // Add small delay so game does not start immediately.
    setTimeout(function(){ 
        gameStart = 1;
    }, 1);
});

// Pause game
pause.addEventListener("click", function() {
    pauseGame()
    

})
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32 || e.keyCode === 38) {
        jump();
    }
    if (e.keyCode == 13) {
        gameLogic();
    }
});
document.addEventListener("click", function () {
    if (gameStart === 1) {
        jump();
    }
});

// Randomize pepper speed.
const pepperSpeed = function () {
    if(enabled == true){
        randomizeSpeed = Math.floor(Math.random() * 3);
        if (randomizeSpeed === 2) {
            pepper.classList.add("pepper-animation-slow");
            pepper.classList.remove("pepper-animation-fast");
            pepper.classList.remove("pepper-animation");
        } else if (randomizeSpeed === 1) {
            pepper.classList.add("pepper-animation-fast");
            pepper.classList.remove("pepper-animation-slow");
            pepper.classList.remove("pepper-animation");
        } else {
            pepper.classList.add("pepper-animation");
            pepper.classList.remove("pepper-animation-fast");
            pepper.classList.remove("pepper-animation-slow");
        }
    }
    
}

const gameLogic = function () {
    clearInterval(interval);
    const kittyTop = parseInt(window.getComputedStyle(kitty).getPropertyValue("top"));
    const pepperLeft = parseInt(window.getComputedStyle(pepper).getPropertyValue("left"));
    pepper.style.animation = "pepper 0.85s infinite linear";
    start.style.display = "none";
    kitty.style.webkitAnimationPlayState = "running";
    if (pepperLeft < 20 && pepperLeft > -20) {
        if (kittyTop >= 130) {
            pepper.style.animation = "none";
            counter = 0;
            pepper.style.animation = "pepper 0.85s infinite linear";
        }
        // Randomize next pepper speed.
        pepperSpeed();
    } else {
        counter++;
        let score = Math.floor(counter / 100);
        document.getElementById("score").innerHTML = score
        if (highScore < score) {
            highScore = score;
            document.getElementById("highScore").innerHTML = highScore;
        }
    }

   
    // Set counter timer based on speed of pepper.
    interval = setInterval(gameLogic, randomizeSpeed === 0 ? 8.95 : randomizeSpeed === 1 ? 6.5 : 9.95);
   
}

const pauseGame = function(){
    enabled = false
    clearInterval(interval);
    start.style.display = "inline-block"
    pause.style.display = "none"
    pepper.style.animationPlayState = "paused";
 
}