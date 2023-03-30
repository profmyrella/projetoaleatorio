var trex, trexCorrendo,trexColidido, solo, soloImg, soloInvisivel, nuvemImg;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6
var pontos;
var grupoObstaculos, grupoNuvens;
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var gameOver, gameOverImg, reiniciar, reiniciarImg;

function preload(){

  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  reiniciarImg = loadImage("restart.png");
  trexColidido = loadAnimation("trex_collided.png");
}

function setup(){

  createCanvas(600,200);
  
  trex = createSprite(50,160, 20,50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("colidido", trexColidido);
  trex.scale = 0.5;
  //trex.debug = true;
  trex.setCollider("circle", 0, 0, 45);

  solo = createSprite(300,180,600,20);
  solo.addImage(soloImg);
  solo.velocityX = -3;

  soloInvisivel = createSprite(200,190,400,10);
  soloInvisivel.visible = false;

  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  reiniciar = createSprite(300, 100);
  reiniciar.addImage(reiniciarImg);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;

  pontos = 0;

  grupoNuvens = new Group();
  grupoObstaculos = new Group();
}

function draw(){
  background("white");
  text("Pontuação: "+pontos, 500, 50);

  if(estadoJogo == JOGAR){

    pontos = pontos + Math.round(frameCount/200);

    if(keyDown("space") && trex.y >= 150){
      trex.velocityY = -10;
    }
    trex.velocityY += 0.5;

    if(solo.x <0){
      solo.x = width/2;
    }
    gerarNuvens();
    gerarObstaculos();

    if(grupoObstaculos.isTouching(trex)){
      estadoJogo = ENCERRAR;
    }

  }else if(estadoJogo == ENCERRAR){
    solo.velocityX = 0;

    trex.velocityY = 0;

    grupoObstaculos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);

    grupoNuvens.setLifetimeEach(-1);
    grupoObstaculos.setLifetimeEach(-1);

    gameOver.visible = true;
    reiniciar.visible = true;

    trex.changeAnimation("colidido");
  }

  trex.collide(soloInvisivel);

  drawSprites();
}

function gerarNuvens(){
  if(frameCount % 60 == 0){ 
    var nuvem = createSprite(600, 100, 40, 10);
    nuvem.velocityX = -3;
    nuvem.y = Math.round(random(10,100));
    nuvem.addImage(nuvemImg);
    //nuvem.scale = 0.5;
    nuvem.lifetime = 250;
    trex.depth = nuvem.depth;
    trex.depth++;

    reiniciar.depth = nuvem.depth;
    reiniciar.depth++;

    gameOver.depth = nuvem.depth;
    gameOver.depth++;

    grupoNuvens.add(nuvem);
}
}

function gerarObstaculos(){
  if(frameCount % 60 == 0){
    var obstaculo = createSprite(600, 165, 10, 40);
    obstaculo.velocityX = -3;

    var aleatoria = Math.round(random(1,6));
    switch (aleatoria) {
      case 1: obstaculo.addImage(obstaculo1);
        break;

      case 2: obstaculo.addImage(obstaculo2);
      break;

      case 3: obstaculo.addImage(obstaculo3);
      break;
    
      case 4: obstaculo.addImage(obstaculo4);
      break;

      case 5: obstaculo.addImage(obstaculo5);
      break;

      case 6: obstaculo.addImage(obstaculo6);
      break;

      default:
        break;
    }
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 250;
    grupoObstaculos.add(obstaculo);
  }
}