const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var world, maxEggs, eggs, gameState, hen1, hen2, hen3, hen4, basket, score, eggGroup, deadLine1, rGroup;

function preload(){
  hen = loadImage("hen.png");
  
  basket_Img = loadImage("basket.png");
  
  egg_Img = loadImage("egg.png");
  
  reset_Img = loadImage("reset.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  gameState = "play";
  
  hen1 = createSprite(windowWidth/10, 50);
  hen1.addImage(hen);
  hen1.scale = (windowWidth*windowHeight)/1000000;
  
  hen2 = createSprite(windowWidth/3, 50);
  hen2.addImage(hen);
  hen2.scale = (windowWidth*windowHeight)/1000000;
  
  hen3 = createSprite(windowWidth/1.75, 50);
  hen3.addImage(hen);
  hen3.scale = (windowWidth*windowHeight)/1000000;
  
  hen4 = createSprite(windowWidth/1.25, 50);
  hen4.addImage(hen);
  hen4.scale = (windowWidth*windowHeight)/1000000;
  
  basket = createSprite(200, windowHeight-50);
  basket.addImage(basket_Img);
  basket.setCollider("rectangle", 0, 0, basket.width, basket.height-200);
  
  score = 0;
  
  eggGroup = createGroup();
  
  deadLine1 = createSprite(windowWidth/2, windowHeight-5, windowWidth, 10);
  deadLine1.shapeColor = "red";
  
  rGroup = createGroup();

  // maxEggs = 100;
  // eggs = [];
  // if(frameCount % 200 === 0){
  //   for(var i = 0; i<maxEggs; i++){
  //     eggs.push(new Eggs);
  //     eggs.lifetime = windowHeight/this.speed + 75;
  //     eggs.y = hen1.y;
  //     var rand = Math.round(random(1, 4));

  //     switch(rand){
  //       case 1: eggs.x = windowWidth/10;
  //         break;
  //       case 2: eggs.x = windowWidth/3;
  //         break;
  //       case 3: eggs.x = windowWidth/1.75;
  //         break;
  //       case 4: eggs.x = windowWidth/1.25;
  //         break;
  //       default:break;
  //     }
  //   }
  // }

}
function draw() {
  background("lightgreen");
  
  engine = Engine.create();
	world = engine.world;
  Engine.run(engine);

  basket.x = mouseX;
  
    if (gameState === "play"){
      
      rGroup.destroyEach();
     if (basket.isTouching(eggGroup)){
      score = score+1;
      eggGroup.destroyEach();
    }
    if (eggGroup.isTouching(deadLine1)){
 // "play"Sound("sound://category_explosion/8bit_explosion.mp3", false);
     gameState = "end";
    }

    
    if (score === 50){
  stroke("red");
  textSize(24);
  fill("red");
  text("YOU WIN!!", windowWidth/2, windowHeight/2);
  // stopSound("sound://category_animals/chicken.mp3");
  
    }
      
    }
 if (gameState === "end"){
  stroke("red");
  textSize(24);
  fill("red");
  text("YOU LOSE", windowWidth/2-50, windowHeight/2);
  // stopSound("sound://category_animals/chicken.mp3");
  eggGroup.destroyEach();
  eggGroup.setLifetimeEach(-1);
   
  var restart = createSprite(windowWidth/2, windowHeight/2-50);
    restart.addImage(reset_Img);
    rGroup.add(restart);

   if (mousePressedOver(restart)){
     reset();
   }}
  stroke("red");
  textSize(20);
  fill("red");
  text("Eggs:" + score, windowWidth-100, hen4.y+100);
  // eggs();
  drawSprites();
  
}
function reset(){
  gameState = "play";
  eggGroup.destroyEach();
  score = 0;
}

// function eggs(){
//  if(World.frameCount%60 === 0){
//   var egg = createSprite();
//   egg.addImage(egg_Img);
//   egg.y = 100;
//   egg.lifetime = windowHeight/this.speed + 75;
//   egg.velocityY = (6 + 100*score/100);
//   egg.scale = 0.5;

//      eggGroup.add(egg);

//  }
// }