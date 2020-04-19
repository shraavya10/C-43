//initiate Game STATEs
var PLAY = 1;
var END = 0;
var GROW=2;
var gameState = PLAY;

var fruit,fruitImg;

var catepillar,catepillarImg;
var ground, invisibleGround;

var fruitGroup;
var obstaclesGroup, obstacle1;
var backGroundImg;
var score=0;
var gameOver,restart;
var gameOverImg,restartImg;


function preload(){
 
  catepillarImg = loadImage("catepillar.png");
  
 // groundImage = loadImage("ground2.png");
  
  //cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("fire.png");
 
  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("reset.jpg");
  fruitImg=loadImage("leaf1.jpg");
  backGroundImg=loadImage("forest.jpg");
}

function setup() {
  createCanvas(800, 400);
  
  catepillar = createSprite(50,390,20,50);
  catepillar.addImage("catepillar",catepillarImg);
 // trex.addAnimation("collided",trex_collided);
  catepillar.scale = 0.5;
  catepillar.setCollider("circle",0,0,30);
  ground = createSprite(100,390,1500,5);
ground.shapeColor="brown";
 // ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
 // ground.visible=false;
   gameOver = createSprite(300,100);
   restart = createSprite(420,120);
gameOver.addImage("gameOver",gameOverImg);
gameOver.scale = 0.5;
restart.addImage("reset",restartImg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
  invisibleGround = createSprite(200,390,1000,10);
  invisibleGround.visible = false;
  
  fruitGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(backGroundImg);
  textSize(28);
  fill("yellow");
  text("Score: "+ score, 500,50);
 
 
  if(gameState===PLAY) {
    
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX=-3;
    
  
  if(keyDown("space")) {
    catepillar.velocityY = -10;
  }
  
  catepillar.velocityY = catepillar.velocityY + 0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  catepillar.collide(invisibleGround);
  spawnfruit();
  spawnObstacles();
  if(fruitGroup.isTouching(catepillar)){
    gameState=GROW;
    text("You ate the leaf,Superpower",200,200);
    text("rebirth of the leaves",210,230);
    fruitGroup.destroyEach();
   
    gameState=PLAY;
  }
     if(obstaclesGroup.isTouching(catepillar)){
    
      gameState = END;
     
     }
    
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    catepillar.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}

function spawnfruit() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var fruit = createSprite(600,350,40,10);
    fruit.y = Math.round(random(300,350));
    fruit.addImage("fruit",fruitImg);
    fruit.scale = 0.5;
    fruit.velocityX = -3;
    
     //assign lifetime to the variable
    fruit.lifetime = 200;
    
    //adjust the depth
    fruit.depth = catepillar.depth;
    catepillar.depth = catepillar.depth + 1;
    
    //add each cloud to the group
    fruitGroup.add(fruit);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,365,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage("obstacle",obstacle1);
    //generate random obstacles
   /* var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  fruitGroup.destroyEach();
  
 // trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
/*function grow(){
if(fruitGroup.x==catepillar.x && fruitGroup.y==catepillar.y){
  fruit.destroy();
}


}*/