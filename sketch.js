var PLAY = 1;
var END = 0;
var gameState = 1;
var sword, swordImage, fruitGroup, enemyGroup, score, randomFruit
var fruit, fruit1, fruit2, fruit3, fruit4, monster, monsterImage
var knifeSwooshSound, gameOverSound

 function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  gameOverImage = loadImage("gameover.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
}


function setup(){
  createCanvas(400, 400);
  sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7

  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}



function draw(){
background("lavender")
  if(gameState===PLAY){
    
    fruits();
    Enemy();
    
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  
   
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score + 2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        gameOverSound.play()
   
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.x = 200;
        sword.y = 200;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score, 300, 30);
}


function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1, 2));
    fruit=createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r==1) {
      fruit.addImage(fruit1);
    } else if (r==2) {
      fruit.addImage(fruit2);
    } else if (r==3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    if(position==1)
    {
      fruit.x = 400
      fruit.velocityX = -(7+(score/4));
    }
    
    fruit.y=Math.round(random(50,340));
    var e = Math.round(random(1, 2));
    if (e === 1) {
      fruit.velocityX = (7 + (score / 4));
      fruit.x = 10

    } else if (e === 2) {
      fruit.velocityX = -(5 + (score / 10));
    }
   
   
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}