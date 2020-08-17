var trex,trex_running,edges,ground,ground_image,invisibleGround,
    spawncloud,spawnclouds_image,ob,ob1,ob2,ob3,ob4,ob5,ob6;

var count,cg,og, END,PLAY,gamestate,trex_col,Gameover, gameover,Restart,restart;

function preload(){
  trex_running=loadAnimation("trex1.png","trex4.png","trex3.png");
  ground_image=loadImage('ground2.png');
 spawnclouds_image=loadImage('cloud.png');
  ob1=loadImage('obstacle1.png');  
  ob2=loadImage('obstacle2.png');
    ob3=loadImage('obstacle3.png');
    ob4=loadImage('obstacle4.png');
    ob5=loadImage('obstacle5.png');
    ob6=loadImage('obstacle6.png');
  trex_col=loadAnimation('trex_collided.png');
  gameover=loadImage('gameOver.png');
  restart=loadImage('restart.png');
}
  
function setup(){
  createCanvas(600,200);

  edges=createEdgeSprites();
  
  trex=createSprite(100,180,5,5);
  trex.addAnimation("name",trex_running);
  trex.scale=  0.5;
  trex.addAnimation('dead',trex_col);
  
  ground=createSprite(200,180,400,20);
  ground.x = ground.width /2;     
  ground.addImage(ground_image)
  
  
  invisibleGround = createSprite(200,185,400,5);
  invisibleGround.visible = false;
  
  count=0;
  
  cg=new Group();
  og=new Group();
  
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
  Gameover=createSprite(150,50);
  Gameover.addImage(gameover);
    Gameover.scale=0.5;
   Gameover.visible=false;
  Restart=createSprite(160,80);
  Restart.addImage(restart);
  Restart.scale=0.5;
  Restart.visible=false;
}                                                                   
function draw(){
  
  background(180);
  
   if(gamestate===PLAY){
      if(keyDown('space')&& trex.y>=159){
    trex.velocityY=-10;
      
  }
     
      ground.velocityX = -2;
     
     if(ground.x<0){
  ground.x=ground.width/2;
     }
  
   //console.log(trex.y);
     
     spawnclouds();
  obstacles();
     
     trex.velocityY=trex.velocityY+0.6;
     
       count= count+ Math.round(getFrameRate()/60);
     
     if(trex.isTouching(og)){
       gamestate=END;
  }
   }
  
  else if(gamestate===END){
      ground.velocityX = 0;
    trex.changeAnimation("dead",trex_col);
    trex.velocityY=0;
    og.setVelocityXEach(0);
    cg.setVelocityXEach(0);
    og.setLifetimeEach(-1);
    cg.setLifetimeEach(-1);
    Gameover.visible=true;
    Restart.visible=true;
    
    if(mousePressedOver(Restart)){
      Reset();
    }
  }
 
  trex.collide(invisibleGround);

  textSize(15);
  text('score ='+count,350,100);
    
 
  drawSprites() ;
}

function Reset(){
  gamestate=PLAY;
  Gameover.visible=false;
  Restart.visible=false;
  trex.addAnimation("name");
  og.destroyEach();
  cg.destroyEach();  
  count=0;
}

  
function spawnclouds(){
  if(World.frameCount % 60 === 0) {
    spawncloud=createSprite(600,120,40,10);
    spawncloud.addImage(spawnclouds_image)
    spawncloud.velocityX=-5;
    spawncloud.scale=0.5;
    spawncloud.y=random(80,120);
    spawncloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    spawncloud.lifetime=300;
    cg.add(spawncloud);
  }
}

function obstacles(){
   if(World.frameCount % 60 === 0){
     ob=createSprite(600,162,20,10);
     ob.velocityX=-(6+3*count/100);
     var rand= Math.round(random(1,6));
     switch(rand){
       case 1:ob.addImage(ob1);
         break;
         case 2:ob.addImage(ob2);
         break;
         case 3:ob.addImage(ob3);
         break;
         case 4:ob.addImage(ob4);
         break;
         case 5:ob.addImage(ob5);
         break;
         case 6:ob.addImage(ob6);
         break;
         default:break;
         }
     ob.scale=0.5;
     ob.lifetime=134;
     og.add(ob);
     
   }      
}
