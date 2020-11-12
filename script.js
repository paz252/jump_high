let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let startBtn = document.querySelector('.startBtn');
let scoreEl = document.querySelector('#scoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;

let groundHeight = 20;

let playerTop = canvas.height - 80;
let playerHeight = 60;
let playerLeft = 10;
let playerWidth = 20;
let playerRight = playerLeft + playerWidth;

let obstacleLeft = canvas.width - 40;
let obstacleTop = canvas.height - 40;
let obstacleWidth = 20;
let obstacleHeight = 20;

let obstacleSpeed = undefined;
let score = 0;
let collision = false;

function drawGround() {
    c.fillStyle = '#182028';
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawPlayer() {
    c.fillStyle = 'red';
    c.fillRect(playerLeft, playerTop, playerWidth, playerHeight);
}

function drawObstacle() {
    c.fillStyle = 'blue';
    c.fillRect(obstacleLeft, obstacleTop, obstacleWidth, obstacleHeight);
}

function moveObstacle() {
    if (obstacleLeft > 0 - obstacleWidth) {
        obstacleLeft -= obstacleSpeed;
    } else {
        obstacleLeft = canvas.width;
    }

    drawObstacle();
}

function jump(){
    setTimeout(() => {
        while (playerTop > canvas.height - 160) {
            playerTop -= 1;
        }
    }, 1);

    setTimeout(() => {
        while (playerTop < canvas.height - 80) {
            playerTop += 1;
        }
    }, 600);
}

function jumpPlayer() {
    addEventListener('keydown', (e) => {
        if (e.code == 'ArrowUp') {
            jump();
        }

        if(e.code == 'ArrowDown'){
            playerTop = canvas.height - 80;
        }
    })

    addEventListener('click', (e) => {
        jump();
    })

    drawPlayer();
}

function init(){
    obstacleLeft = canvas.width - 40;
    score = 0;
    scoreEl.innerHTML = 0;
    obstacleSpeed = Math.floor(canvas.width/130);
    collision = false;
}

addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

function animate() {
    animationID = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();

    jumpPlayer();

    moveObstacle();

    //increment score
    if(!collision){
        score += 1;
        scoreEl.innerHTML = score;
    }

    //increase speed
    if(score % 1500 == 0 && score < 3010){
        obstacleSpeed += Math.floor(canvas.width/200);
    }

    //end game
    if (obstacleLeft - playerRight < 1 && playerTop + playerHeight > obstacleTop){
        cancelAnimationFrame(animationID);
        collision = true;
        startBtn.classList.remove('hideBtn');
    }
}

startBtn.addEventListener('click',()=>{
    init();
    animate();
    startBtn.classList.add('hideBtn');
})
