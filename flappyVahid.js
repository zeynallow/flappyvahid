var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var vahid = new Image();
var bg = new Image();
var fg = new Image();
var pipe1 = new Image();
var pipe2 = new Image();

vahid.src = "images/vahid.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipe1.src = "images/pipe1.png";
pipe2.src = "images/pipe2.png";

var gap = 100; //piplerni mesafesi
var constant;

var bX = 10; //vahidin x-i
var bY = 150; //vahidin y-i

var gravity = 1.5;

var score = 0;

var fly = new Audio();
var scor = new Audio();
var rape = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
rape.src = "sounds/rape.mp3";

//=====

document.addEventListener("keydown",moveUp);

function moveUp(){
  bY -= 25;
  fly.play();
}


var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : 0
};


function draw(){
  document.getElementById("start").style.display = "none";
  ctx.drawImage(bg,0,0);

  for(var i = 0; i < pipe.length; i++){

    constant = pipe1.height+gap;

    ctx.drawImage(pipe1,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipe2,pipe[i].x,pipe[i].y+constant);

    pipe[i].x--;

    if( pipe[i].x == 125 ){
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random()*pipe1.height)-pipe1.height
      });
    }


    if(
        bX + vahid.width >= pipe[i].x &&
        bX <= pipe[i].x + pipe1.width &&
        (bY <= pipe[i].y + pipe1.height || bY+vahid.height >= pipe[i].y+constant) ||
        bY + vahid.height >=  cvs.height - fg.height
      ){

      rape.play();

      setTimeout(function () {
        location.reload();
      }, 3000);

    }

    // console.log(pipe[i].x);

    if(pipe[i].x == 5){
      score++;
      scor.play();
    }


  }

  ctx.drawImage(fg,0,cvs.height - fg.height);
  ctx.drawImage(vahid,bX,bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score : "+score,30,cvs.height-50);

  requestAnimationFrame(draw);
}
