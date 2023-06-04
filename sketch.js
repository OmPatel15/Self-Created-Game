
var backgroundImg,spikeImg,spike,plank,razorBladeImg,razorBlade;
var backgroundSprite
var playerImg, player
var missileImg, missileGroup
var ground
var obstacle, obstaclesGroup
var rand
var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0
text("Score:"+score,350,105);



function preload(){
backgroundImg = loadImage("Jungle Background.jpg")
spikeImg = loadImage("spike-removebg-preview.png")
plank = loadImage("Wooden Plank.webp")
razorBladeImg = loadImage("razor_blade-removebg-preview.png")
playerImg = loadImage("square.jpg")
missileImg = loadImage("missile-removebg-preview.png")
}

function setup() {
  createCanvas(350,123);
  
  backgroundSprite = createSprite(0,0,700,246);
  backgroundSprite.addImage("background", backgroundImg);
 backgroundSprite.velocityX = -4

  player = createSprite(50,110,10,10);
  player.addImage("player", playerImg);
  player.scale = 0.02

  ground = createSprite(100,120,700,10)
  ground.x = ground.width/2
  ground.velocityX = -4
  obstaclesGroup = createGroup();
  missileGroup = createGroup();

  score = 0
  
}

function draw(){
  background(180);


  if(gameState == PLAY){
    
  score = score+Math.round(frameCount/80)

  if(backgroundSprite.x<0){
    backgroundSprite.x=backgroundSprite.width/2
  }

  if(keyDown(UP_ARROW) && player.y>90){
    player.velocityY = -7
  }
  player.velocityY = player.velocityY + 0.5

  if(keyDown(RIGHT_ARROW) && player.x<100 && gameState == PLAY){
    player.x = player.x+2
  }

  if(keyDown(LEFT_ARROW) && player.x>-100 && gameState == PLAY){
    player.x = player.x-2
  }

  if(ground.x<0){
  ground.x = ground.width/2
  }

spawnObstacles()
spawnMissile()
if(obstaclesGroup.isTouching(player)){
 player.velocityY = -7
 gameState = END
}
if(missileGroup.isTouching(player)){
  player.velocityY = -7
  gameState = END
 }

}
else if(gameState == END){
  backgroundSprite.velocityX = 0
  ground.velocityX = 0
  player.velocityY = 0
  obstaclesGroup.setLifetimeEach(-1)
  obstaclesGroup.setVelocityXEach(0)
  missileGroup.setLifetimeEach(-1)
  missileGroup.setVelocityYEach(0)
}

player.collide(ground)
drawSprites();
}



function spawnObstacles(){
if(frameCount%60==0){
var obstacle = createSprite(330,105,10,40)
obstacle.velocityX = -5
var rand = Math.round(random(1,2))
switch(rand){
  case 1: obstacle.addImage(spikeImg)
  break
  case 2: obstacle.addImage(razorBladeImg)
  break
  default:break
}
obstacle.scale = 0.11
obstacle.lifetime = 70
obstaclesGroup.add(obstacle)
}
}



function spawnMissile(){
  if(frameCount%100==0){
  var missile = createSprite(330,0,120,120)
  missile.x = Math.round(random(10,60))
  missile.addImage(missileImg)
  missile.velocityY = 5
  missile.scale = 0.2
  missile.lifetime = 70
  missileGroup.add(missile)
  }
  }


