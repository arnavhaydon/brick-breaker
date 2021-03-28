// we are gettng ellement of an document
let canvas = document.getElementById("myCanvas")
// we are getting the context of the canvas 
let context = canvas.getContext("2d")
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2
let dy = -2 

let lives = 3
let ballRadius = 10
let paddleheight = 10 
let paddlewidth = 90
let score = 0
let paddleX = (canvas.width - paddlewidth )/2
let leftPressed = false
let rightPressed = false 

//brick field variables 
let brickRowCount = 10
let brickColumnCount = 6 
let brickHeight = 20
let brickWidth = 84
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30

// generate 2d array to store location coordinates of bricks
let bricks =  []
for (let i = 0 ; i <brickColumnCount ; i = i + 1 ){ 

    bricks[i]=[]
    for(let j = 0 ; j <brickRowCount ; j = j + 1){

        bricks[i][j]={
            x : 0,
            y : 0,
            status : 1
        }
    }
}

function keyDownHandler(event){
    //tell us the right arrow key is being pressed
    if (event.key === "Right" || event.key === "ArrowRight" ) {
        rightPressed = true 
    }
    //tells us the left arrow key is pressed
    else if ( event.key === "Left" || event.key === "ArrowLeft" ){
        leftPressed = true
    }
}

function keyUpHandler(event){
    // tells us that the right key is no longer being pressed 
    if (event.key === "Right" || event.key === "ArrowRight" ) {
        rightPressed = false 
    }
    // tells us that the left key is no longer being pressed 
    else if ( event.key === "Left" || event.key === "ArrowLeft" ){
        leftPressed = false
    }
}



function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle()
    drawBricks()
    collisionDetection()
    drawScore()
    drawLives()
    //creating an if statement what happened when right is pressed 
    if( rightPressed){
        //adding 7 to the x location of the paddle 
        paddleX = paddleX + 7 
        // we are stopping the S
        if (paddleX + paddlewidth > canvas.width){
            paddleX = canvas.width - paddlewidth;
        }
    
    }
    //creating an if statement what happened when left is pressed 
    else if (leftPressed){
 //subtracting 7 to the x location of the paddle
        paddleX = paddleX - 7
        if (paddleX <0){
            paddleX = 0

        }
    }

    // you are calling the function so that you can do stuff with the context
    context.beginPath()
    // giving the shape co-ordinates and dimentions
    context.arc(x, y, ballRadius, 0, Math.PI*2); 
    //context.rect(20, 40, 50, 50);
    // giving the shape a colour
    context.fillStyle = "#FF0000"; // red
    // this fillsh the shape with the colour
    context.fill();
    // you can no longer preforme on this context
    context.closePath();
    x = x + dx 
    y = y + dy
    
// top wall detection 
 if(y + dy < ballRadius){
    dy = -dy 
   // change derection of y to move frome up to down 
   }
   //bottom wall detection 
  else if(y + dy > canvas.height - ballRadius){
       if (x> paddleX && x < paddleX + paddlewidth){
        dy = -dy 
       }
       else{
           lives = lives - 1
           if(lives <1){
                alert("game over try again")
                document.location.reload()
                clearInterval(interval)
           }
           else {
               x= canvas.width / 2
               y= canvas.height - 30
               dx = 2
               dy = -2
               paddleX = (canvas.width - paddlewidth) / 2 
           }
     
         }   
       
   }
   
   //left wall detection 
   if(x + dx < ballRadius ){
       dx = -dx 
   // changeing direction of x from left to right 
   }
   
   //right wall detection 
   if(x +dx > canvas.width - ballRadius){
       dx = -dx
   //change direction of x from right to left 
   }
   
}
//  set up a listener for a key down handler event and run the function when the event occurs
document.addEventListener("keydown", keyDownHandler, false);
// set up a listener for the key up handler event and run the function when event takes place 
document.addEventListener("keyup", keyUpHandler, false)
let interval = setInterval(draw,10)

//fillstyle fills the shape but strokestyle only outlines it


function drawPaddle(){
    context.beginPath()
    context.rect( paddleX, canvas.height - paddleheight , paddlewidth , paddleheight )
    context.fillStyle = "black"
    context.fill()
    context.closePath()
}
 function drawBricks(){
    for(let p = 0 ;p <brickColumnCount ; p = p + 1){
        for(let f = 0 ;f <brickRowCount ; f = f + 1){
            if(bricks[p][f].status === 1){
                let brickXLocation = (p*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickYLocation = (f*(brickHeight+brickPadding))+brickOffsetTop
                bricks[p][f].x = brickXLocation 
                bricks[p][f].y = brickYLocation
                context.beginPath()
                context.rect(brickXLocation , brickYLocation , brickWidth , brickHeight )
                context.fillStyle = "black"
                context.fill()
                context.closePath()
            }
           
        }
    }
 }

function collisionDetection(){

    for(let k = 0 ; k <brickColumnCount ; k = k + 1){
        for(let e = 0 ; e <brickRowCount ; e = e + 1){

            let b = bricks[k][e]
            if (x >b.x&& x <b.x + brickWidth && y >b.y && y <b.y + brickHeight && b.status === 1){

                dy = -dy
                b.status = 0 
                score = score + 1 
                if(score === brickRowCount * brickColumnCount ){

                    alert("you have won yay!!!!!! play again?")
                    document.location.reload()
                     clearInterval(interval)
                }
            }
        }
    }
}
function drawScore(){

    context.font="16px Arial"
    context.fillStyle = "#0095dd"
    context.fillText("Score: " + score,8,20)
}

function drawLives(){
    context.font="16px Arial"
    context.fillStyle = "#0095dd"
    context.fillText("Lives: " + lives,canvas.width-65,20)

}






