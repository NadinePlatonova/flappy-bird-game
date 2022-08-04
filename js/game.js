const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

// Add sound files
const fly = new Audio();
const score_sound = new Audio();

fly.src = "audio/fly.mp3";
score_sound.src = "audio/score.mp3";


bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

const GAP_BETWEEN_PIPES = 100;
const INTERVAL_FOR_NEW_PIPE_ARRIVING = 80;
const INTERVAL_FOR_BIRD_MOVING_UP_AFTER_CLICK = 35;

let score = 0;

// Bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;

// When clicking any button
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= INTERVAL_FOR_BIRD_MOVING_UP_AFTER_CLICK;
    fly.play();
}

// Blocks creation
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + GAP_BETWEEN_PIPES);

        pipe[i].x--;

        if(pipe[i].x == INTERVAL_FOR_NEW_PIPE_ARRIVING) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // If bird faces with pipes
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height 
            || yPos + bird.height >= pipe[i].y + pipeUp.height + GAP_BETWEEN_PIPES) 
            || yPos + bird.height >= cvs.height - fg.height) {
                    location.reload(); //Reload the page
                }
        if(pipe[i].x == 5) {
            score++;
            score_sound.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;