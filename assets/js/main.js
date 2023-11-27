let start = false;
// let sizeSlider;
// let gravSlider;
// let speedSlider;

// // let dia = 75;   // size of the ball

// let bounciness = 0.8;  // see note above

// let position;          // position and forces can
// let gravity;           // be listed as PVectors
// let speed;   

// let dupes = 1;

// let balls = [];

function startDraw() {
    if (!start) {
        start = true;
        // position.x = 75;
        // position.y = 75;
        // gravity = createVector(0, gravSlider.value());
        // speed = createVector(speedSlider.value(), 0);
        loop()
    }
    else {
        start = false
        noLoop()
    }
    
}

// let x = window.innerWidth/2;
// let y = window.innerHeight/2;
let xspeed = 5;
let yspeed = 2;

let r = 25;

let balls = [];

function setup() {
    const initCanvas = createCanvas(windowWidth-100, windowHeight-100);
    initCanvas.parent("visuals");


    let startButton = createButton('Start');
    startButton.position(20,20);
    startButton.mousePressed(startDraw)

    sizeSlider = createSlider(1, 75, 25);
    sizeSlider.position(160, 20);

    xspeedSlider = createSlider(0, 2, 1, .1);
    xspeedSlider.position(300, 20);
    yspeedSlider = createSlider(0, 2, 1, .1);
    yspeedSlider.position(440, 20);

    limitSlider = createSlider(1, 2000, 100, 1);
    limitSlider.position(580, 20);
    
    fadeSlider = createSlider(1, 255, 50, 1);
    fadeSlider.position(720, 20);
    
    let ball = {
        x: window.innerWidth/2 - 50,
        y: window.innerHeight/2 - 50,
        dia: sizeSlider.value(),
        xSpeed: Math.floor(Math.random()*20),
        ySpeed: Math.floor(Math.random()*20)
    }
    
    balls.push(ball);
}

function draw() {
    background(0, 0, 0, fadeSlider.value());

    if (start) {
        for (let i = 0; i < balls.length; i++) {
            
            ellipse(balls[i].x, balls[i].y, sizeSlider.value(), sizeSlider.value());
            balls[i].x += (balls[i].xSpeed * xspeedSlider.value());
            balls[i].y += (balls[i].ySpeed * yspeedSlider.value());
            if (balls[i].x > width - sizeSlider.value()/2 || balls[i].x < sizeSlider.value()/2) {
                if (balls.length < limitSlider.value()) {
                    let newBall = {
                        x: balls[i].x,
                        y: balls[i].y,
                        dia: sizeSlider.value(),
                        xSpeed: (balls[i].xSpeed) * -1,
                        ySpeed: balls[i].ySpeed +1
                    }
                    balls.push(newBall);
                }
                balls[i].xSpeed = (balls[i].xSpeed)*-1;
            }
            if (balls[i].y > height - sizeSlider.value()/2 || balls[i].y < sizeSlider.value()/2) {
                if (balls.length < limitSlider.value()) {
                    let newBall = {
                        x: balls[i].x,
                        y: balls[i].y,
                        dia: sizeSlider.value(),
                        xSpeed: balls[i].xSpeed + 1,
                        ySpeed: balls[i].ySpeed * -1
                    }
                    balls.push(newBall);
                }
                balls[i].ySpeed = (balls[i].ySpeed)*-1;
            }
        }
        
        
    }
    else {
        fill(255);
        noStroke();
        ellipse(balls[0].x, balls[0].y, sizeSlider.value(), sizeSlider.value());
    }
}