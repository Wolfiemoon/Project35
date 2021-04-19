//Variables
var balloon,balloonImage1,balloonImage2;
var database, balloon, height
// create database and position variable here
database =firebase.database()

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}


// function to display UI
function draw() {
  background(bg);

  //Updating movement (datebase)
  function updateHeight(){
    database.ref('balloon/height').set({
      'x': Height.x + x,
      'y': Height.y + y
    })
  }
  //Read height (database)
  function readHeight(data){
    height = data.val()
    balloon.x =height.x;
    balloon.y =height.y
  }

  //Expose Errors in the database
  function showError(){
    console.log("Error in writing to the database")
  }

  //Balloon position (Database)
var balloonPosition=database.ref('balloon/height');
balloonPosition.on("Value", readPosition, showError);


  //Moving with arrow keys
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x =balloon.x -0.9
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x =balloon.x +0.9
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.01;
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale +0.01
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
