var canvas;
var block1,block2,block3,block4;
var ball,ballImg1, ballImg2,ballImg3,ballImg4,ballImg5
var edges;
var music;
var resetBtnBtn, resetBtnImg;

function preload(){
    // load sound here
    music = loadSound("music.mp3");
    ballImg1 = loadAnimation("white_ball.png");
    ballImg2 = loadAnimation("blue_ball.png");
    ballImg3 = loadAnimation("orange_ball.png");
    ballImg4 = loadAnimation("lightgreen_ball.png");
    ballImg5 = loadAnimation("cyan_ball.png");
    resetBtnImg = loadImage("reset.png")
}


function setup(){
    canvas = createCanvas(800,600);

    block1 = createSprite(100,580,360,30);
    block1.shapeColor = "blue";

    block2 = createSprite(300,580,200,30);
    block2.shapeColor = "orange";

    block3 = createSprite(500,580,200,30);
    block3.shapeColor = "lightgreen";

    block4 = createSprite(700,580,200,30);
    block4.shapeColor = "cyan";


    ball = createSprite(random(20,750),100, 40,40);
    ball.addAnimation("white_ball",ballImg1);
    ball.addAnimation("blue_ball",ballImg2)
    ball.addAnimation("orange_ball",ballImg3);
    ball.addAnimation("lightgreen_ball",ballImg4);
    ball.addAnimation("cyan_ball",ballImg5)
    ball.velocityX = 9;
    ball.velocityY = 5;
    ball.scale = 0.1
    //ball.debug = true
    ball.setCollider("circle",0,0,215)

    resetBtn = createSprite(400,300);
    resetBtn.addImage(resetBtnImg);
    resetBtn.scale = 0.3
    
}

function draw() {
    background("yellow");
    edges=createEdgeSprites();
    ball.bounceOff(edges);

    resetBtn.visible = false;

    
    //Code to bounce off ball from the block1

    if(block1.isTouching(ball)){

        ball.changeAnimation("blue_ball",ballImg2)

        ball.velocityY = ball.velocityY * -1;

        music.play();
    }



    if(block2.isTouching(ball)){

        ball.changeAnimation("orange_ball",ballImg3);

        //Code to set velocityX and velocityY of ball as 0
        ball.velocityY = 0
        ball.velocityX = 0

        //Code to stop music
        music.stop();

        resetBtn.visible = true

        if(touches.length > 0){
            if(resetBtn.overlapPoint(touches[0].x,touches[0].y)){
            
            reset();
        }
        }

        if(keyDown("r") || mousePressedOver(resetBtn)){
            reset();
        }
    }

    //Code to bounce off ball from the block3

    if(ball.isTouching(block3)){
        
        ball.velocityY = ball.velocityY * (-1);

        ball.changeAnimation("lightgreen_ball",ballImg4);

        music.play();
    }

    //Code to bounce off ball from block4
    if(ball.isTouching(block4)){
        
        ball.velocityY = ball.velocityY * (-1);

        ball.changeAnimation("cyan_ball",ballImg5)

        music.play();
    }


    drawSprites();

    if(ball.isTouching(block2)){
        textSize(30);
        fill("orange");
        textAlign(CENTER);
        text("Press 'r', click on 'reset' or touch on 'reset' to restart!",400,100)
    }

}

function reset(){
    ball.changeAnimation("white_ball",ballImg1)
    resetBtn.visible = false;
    ball.y = 100;
    ball.velocityX = 9;
    ball.velocityY = 5; 
}
