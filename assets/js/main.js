let start = false;
let seizureMode = false;
let outlineMode = false;
let seizureButton;
let startButton;
let outlineButton;

function startDraw() {
    if (!start) {
        start = true;
        loop()
    }
    else {
        start = false
        noLoop()
    }
    
}

function seizureToggle() {
    if (seizureButton.checked()) {
        seizureMode = true;
    }
    else {
        seizureMode = false;
    }
}
function outlineToggle() {
    if (outlineButton.checked()) {
        outlineMode = true;
    }
    else {
        outlineMode = false;
    }
}

// let x = window.innerWidth/2;
// let y = window.innerHeight/2;
let xspeed = 5;
let yspeed = 2;

let r = 25;

let balls = [];

function setup() {
    const initCanvas = createCanvas(windowWidth-(windowWidth*.1), windowHeight-(windowHeight*.1));
    initCanvas.parent("visuals");


    startButton = createButton('Start');
    startButton.parent("startBtn");
    startButton.mousePressed(startDraw)

    seizureButton = createCheckbox('Seizure Mode', false);
    seizureButton.parent("optionBtns");
    seizureButton.changed(seizureToggle);

    outlineButton = createCheckbox('Ball Outline', false);
    outlineButton.parent("optionBtns");
    outlineButton.changed(outlineToggle);

    sizeSlider = createSlider(1, 75, 25);
    sizeSlider.parent("sizeOption");

    xspeedSlider = createSlider(-2, 2, 1, .1);
    xspeedSlider.parent("xOption");
    yspeedSlider = createSlider(-2, 2, 1, .1);
    yspeedSlider.parent("yOption");

    limitSlider = createSlider(1, 2000, 100, 1);
    limitSlider.parent("limitOption");
    
    fadeSlider = createSlider(1, 255, 50, 1);
    fadeSlider.parent("fadeOption");
    
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
    let red = Math.floor(Math.random()*255)
    let green = Math.floor(Math.random()*255)
    let blue = Math.floor(Math.random()*255)

    if (start) {
        for (let i = 0; i < balls.length; i++) {
            if (seizureMode) {
                fill(red, green, blue);
            }
            if (outlineMode) {
                stroke(0,0,0);
            }
            else {
                noStroke();
            }

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
        ellipse(balls[0].x, balls[0].y, sizeSlider.value(), sizeSlider.value());
    }
}