// Sound Files
/// sound class definition, used to create audio objects 
var highscore = 0;
var muting = false;
class sound {
	constructor(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);

		// method definition
		this.play = function () {
            if (muting === false){
                this.sound.play();
            }
		};
		this.stop = function () {
			this.sound.pause();
		};
	}
}

menusound = document.getElementById("MenuAudio");
bsound = document.getElementById("BGround");
ptsound = document.getElementById("PlayTime");
var inmain = true;

// init function definition
function init(){
    // Initialising Canvas
    if (muting === false){
        menusound.play();
    }
    canvas = document.getElementById("Mainframe");
    context = canvas.getContext("2d");
    
    sound_image = new Image;
    if (muting === true){
        sound_image.src = "media/mute.png";
    }else{
        sound_image.src = "media/music.png";
    }
    csound = new sound("media/collide.mp3");
    psound = new sound("media/pause.mp3");
    posound = new sound("media/point.mp3");
    lsound = new sound("media/lose.mp3");
    fsound = new sound("media/fanfare.mp3");
    upsound = new sound("media/unpause.mp3");
    oversound = new sound("media/gameover.mp3");
    inmain = true;
    
    
    // Original Background
    drawRect(0,0,900,600,"black");    
    drawRect(2,2,896,596,"white");
    drawRect(10,10,880,580,"black");
    drawRect(900,0,300,600,"black");    
    drawRect(902,2,296,596,"white");
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText("CONTROLS",940,300);
    context.fillStyle = "black";
    context.font = "25px sans";
    context.fillText("Use mouse to control your",910,335);
    context.fillStyle = "black";
    context.font = "25px sans";
    context.fillText("Paddle.",910,370);
    context.fillStyle = "black";
    context.font = "25px sans";
    context.fillText("Press Space or Enter to",910,405);
    context.fillStyle = "black";
    context.font = "25px sans";
    context.fillText("pause the game.",910,440);
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText("High Score :",920,170);
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText(highscore,1130,170);
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText("Music(M) : ",920,570);
    
    flag = 0
    currscore = highscore;
    
    // User Paddle
    user = {
        x : 15, 
        y : 245, 
        width : 30, 
        height : 150, 
        color : "white", 
        score : 0
    }

    // Computer Paddle
    com = {
        x : 855, 
        y : 245, 
        width : 30, 
        height : 150, 
        color : "white", 
        score : 0
    }

    // Create the Ball
    ball = {
        x : 450, 
        y : 320, 
        radius : 20, 
        speed : 5, 
        velocityX : 5, 
        velocityY : 5,
        color : "white"
    }
    
    // create Net
    net = {
    x : 445, 
    y : 55, 
    width : 10, 
    height : 20, 
    color : "white"
    }
    
    lives = 5;
    
    game_over = false; 
    
    // Main Menu
    context.fillStyle = "white";
    context.font = "150px fantasy";
    context.fillText("TouchNGo",150,250);
    
    context.fillStyle = "white";
    context.font = "50px fantasy";
    context.fillText("Press Space or Enter to Start the Game",60,430);
    
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText("Score :",1010,220);
    drawRect(1130,180,60,40,"white");
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText(user.score,1130,220);
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText("LIVES",990,55);
    drawRect(920,70,270,50,"white");
    for (var i = 0; i < lives; i++) {
        drawCircle((950+(i*50)),90,20,"black");
    }
    drawRect(1120,540,40,40,"white");
    context.drawImage(sound_image,1120,540,40,40);
    
    
    // EventListener to move paddle with mouse 
    canvas.addEventListener("mousemove",movePaddle);
} 

// Instructions Panel
function instruction(){
    // Background
    drawRect(0,0,900,600,"black");    
    drawRect(2,2,896,596,"white");
    drawRect(10,10,880,580,"black");
    context.fillStyle = "white";
    context.font = "100px fantasy";
    context.fillText("TouchNGo",230,120);
    
    //Instructions
    context.fillStyle = "white";
    context.font = "40px sans";
    context.fillText("Instructions",35,200);
    context.fillStyle = "white";
    context.font = "25px sans";
    context.fillText("- Use the mouse to control the movement of your paddle.",55,250);
    context.fillStyle = "white";
    context.font = "25px sans";
    context.fillText("- The goal is to score as many points as possible before your lives run out.",55,285);
    context.fillStyle = "white";
    context.font = "25px sans";
    context.fillText("- You score points whenever Computer Paddle misses the ball.",55,320);
    context.fillStyle = "white";
    context.font = "25px sans";
    context.fillText("- If your lives are less than 5, you score a life at every 5 points.",55,355);
    
    
    //Return
    context.fillStyle = "white";
    context.font = "25px sans";
    context.fillText("I - Pause Menu              Space or Enter - Resume Game                X - Main Menu",30,570);
}    

//Paddle Function
function movePaddle(evt){
    let rect = canvas.getBoundingClientRect(); 
    
    user.y = evt.clientY - rect.top - (user.height/2);
    
    if ((user.y + user.height) > 590){
        user.height = 590 - user.y;
    }else if (user.y < 50){
        if (flag == 0){ 
            user.height = 100 + user.y;
        }else{
            user.height = 200 + user.y;
        }
        user.y = 50;
    }else{
        if (flag == 0){
            user.height = 150;
        }else{
            user.height = 250;
        }
    }
}

// draw Rect function
function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

// draw Circle
function drawCircle(x,y,r,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

// draw Text
function drawText(text,x,y,color){
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text,x,y);
}  

// Function to draw Net
function drawNet(){
    for(let i = 0; i < 540 ;i += 30){
        drawRect(net.x,net.y + i,net.width,net.height,net.color);
    }
} 

// render the game
function render(){
    // Clear the Canvas
    //mainsound.stop();
    menusound.pause();
    inmain = false;
    drawRect(0,0,900,600,"black");    
    drawRect(2,2,896,596,"white");
    drawRect(10,50,880,540,"black");
    context.fillStyle = "black";
    context.font = "40px fantasy";
    context.fillText("TouchNGo",350,45);
    
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText("LIVES",990,55);
    drawRect(920,70,270,50,"white");
    for (var i = 0; i < lives; i++) {
        drawCircle((950+(i*50)),90,20,"black");
    }

    // Draw Net 
    drawNet();

    // Draw Score
    drawRect(1130,130,60,40,"white");
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText(highscore,1130,170);
    drawRect(1130,180,60,40,"white");
    context.fillStyle = "black";
    context.font = "40px sans";
    context.fillText(user.score,1130,220);

    // Draw Paddles
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(com.x,com.y,com.width,com.height,com.color);  

    // Draw Ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
    
}

// Collision Detection
function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x; 
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}

//Ball Reset
function resetBall(){
    ball.x = 450;
    ball.y = 320;
    ball.speed = 5;
    ball.velocityX = 5;
    ball.velocityY = 5;
}

// Update : Position, Speed, Score
function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Simple AI to control the com paddle
    let computerLevel = 0.05;
    if (user.score >= com.score){
        computerLevel =  0.05 + ((user.score - com.score) * 0.01);
    }else{
        computerLevel = 0.05;
    }

    com.y += (ball.y - (com.y + (com.height/2))) * computerLevel;
    if ((com.y + com.height) > 590){
        com.height = 590 - com.y;
    }else if (com.y < 50){
        com.height = 100 + com.y;
        com.y = 50;
    }else{
        com.height = 150;
    }

    if (ball.y + ball.radius > 590 || ball.y - ball.radius < 50){
        csound.play();
        ball.velocityY = - ball.velocityY;
    }

    let player = (ball.x < 450)? user : com;
    if (collision(ball,player)){        
        // where the ball hits the player
        csound.play();
        let collidePoint = ball.y - (player.y + player.height/2);

        // normalization
        collidePoint = collidePoint / (player.height/2);

        // Calculate angle
        let angleRad = (Math.PI/4) * collidePoint;

        // Direction of ball when hit
        let direction = (ball.x < 450) ? 1 : -1;  

        // Change x and y velocities
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);

        // Increment in speed
        ball.speed += 0.5;
    }
    
    // Update Score
    if (ball.x - ball.radius < 15){
        // if Computer Wins
        if (lives > 1){
            lsound.play();
        }
        com.score++;
        lives--;
        resetBall();
    }else if (ball.x + ball.radius > 885){
        // if User Wins
        posound.play();
        user.score++;
        resetBall();
        if ((user.score % 5 === 0) && (lives < 5)){
            lives++;
        }
    }
    if (user.score > highscore){
        highscore = user.score;
    }
    
    // Game End
    if (lives === 0){
        game_over = true;
    }
}

/// game loop 
function gameloop() {

	// check if game is over
	if (game_over === true) {
        
        // stop game loop
        ptsound.pause();
        clearInterval(run);
        drawRect(920,70,270,50,"white");
        drawRect(0,0,900,600,"black");    
        drawRect(2,2,896,596,"white");
        drawRect(10,50,880,540,"black");
        context.fillStyle = "black";
        context.font = "40px fantasy";
        context.fillText("TouchNGo",350,45);
        if (user.score > currscore){
            fsound.play();
            context.fillStyle = "white";
            context.font = "70px fantasy";
            context.fillText("New High Score",240,240);
        }else{
            oversound.play();
            context.fillStyle = "white";
            context.font = "70px fantasy";
            context.fillText("Your Score : ",280,240);
        }
        drawText(user.score,420,350,"white");
        context.fillStyle = "white";
        context.font = "35px fantasy";
        context.fillText("Press Space or Enter for Main Menu",200,470);
	}else{
        /// call draw and update functions
        render();
        update();
    }
	console.log("in gameloop");
}

// function to control play and pause functionality
var has_game_started = false;
var run;
var fps = 60;
var game_instruct = false;
flag = 0;
function start_game(e) {
	if (e.key === "m"){
        if (muting === true){
            muting = false;
            if ((menusound.paused === true) && (inmain === true)){
                menusound.play();
            }
            if ((bsound.paused === true) && (inmain === false) && (has_game_started === false)){
                bsound.play();
            }
            if ((ptsound.paused === true) && (inmain === false) && (has_game_started === true)){
                ptsound.play();
            }    
            sound_image.src = "media/music.png";
            drawRect(1120,540,40,40,"white");
            context.drawImage(sound_image,1120,540,40,40);
        }else{
            muting = true;
            if (menusound.paused === false){
                menusound.pause();
            }
            if (bsound.paused === false){
                bsound.pause();
            }
            if (ptsound.paused === false){
                ptsound.pause();
            }
            sound_image.src = "media/mute.png";
            drawRect(1120,540,40,40,"white");
            context.drawImage(sound_image,1120,540,40,40);
        }
    }
    
    if (e.key === "c"){
        var name = window.prompt("Enter code: ");
        if (name == "FillTheTank"){
            alert("Your lives are refilled");
            lives = 5;
        }else if (name == "BiggerIsBetter"){
            alert("Your Paddle is Long");
            user.height = 250;
            flag = 1;
        }else{
            alert("Wrong Code");
        }
    }
    
    if (game_over === false) {
		
        // Reading Instructions
        if ((e.key === "i") && has_game_started === false && game_instruct === false){
            console.log("Maybe");
            instruction();
            game_instruct = true;06948
        }
        
        // Back to pause
        else if ((e.key === "i") && has_game_started === false && game_instruct === true){
            console.log("In Here");
            render();
            drawRect(255,155,370,330,"white");
            drawRect(260,160,360,320,"black");
            drawRect(325,175,230,90,"white");
            drawRect(330,180,220,80,"black");
            context.fillStyle = "white";
            context.font = "80px fantasy";
            context.fillText("PAUSE",340,250);
            context.fillStyle = "white";
            context.font = "50px fantasy";
            context.fillText("Space - Resume",280,320);
            context.fillStyle = "white";
            context.font = "50px fantasy";
            context.fillText("I - Instructions",295,390);
            context.fillStyle = "white";
            context.font = "50px fantasy";
            context.fillText("X - Main Menu",300,460);
            game_instruct = false;
        }
        
        // Main Menu Functionality
        if ((e.key === "x") && has_game_started === false){
            bsound.pause();
            init();
        }
            
        // play
		if ((e.key === "Enter" || e.key === " ") && has_game_started === false) {
			// console.log("in start_game");
            bsound.pause();
            if (muting === false){
                upsound.play();
                ptsound.play();
            }
			has_game_started = true;
            game_instruct = false;
			run = setInterval(gameloop, 1000/fps);
		}

		// pause
		else if ((e.key === "Enter" || e.key === " ") && has_game_started === true) {
			// console.log("in start_game");
            
            if (muting === false){    
                psound.play();
            }
            ptsound.pause();
            drawRect(255,155,370,330,"white");
            drawRect(260,160,360,320,"black");
            drawRect(325,175,230,90,"white");
            drawRect(330,180,220,80,"black");
            context.fillStyle = "white";
            context.font = "80px fantasy";
            context.fillText("PAUSE",340,250);
            context.fillStyle = "white";
            context.font = "50px fantasy";
            context.fillText("Space - Resume",280,320);
            context.fillStyle = "white";
            context.font = "50px fantasy";
            context.fillText("I - Instructions",295,390);
            context.fillStyle = "white";
            context.font = "50px fantasy";
            context.fillText("X - Main Menu",300,460);
			has_game_started = false;
			clearInterval(run);
            if (muting === false){
                bsound.play();
            }
		}

	}
    
    else{
        if (e.key === "Enter" || e.key === " "){
            has_game_started = false;
            bsound.pause();
            ptsound.pause();
            init();
        }
    }
}

/// adding event listener which calls start_game function
document.addEventListener("keydown", start_game);

// calling init function
init();