var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem, nuvemImagem;
var cacto1;
// Pr� carregamento
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  nuvemImagem = loadImage("cloud.png");
 cacto1=loadImage("obstacle1.png");
  
}

function setup() {

  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  
  
}

function draw() {
  //definir cor do plano de fundo
  background(0);
  
  // pulando o trex ao pressionar a tecla de espaço
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);

  criarNuvens();
  criarCactos();

  drawSprites();
  
}

// criando as nuvens
function criarNuvens() {

  if (frameCount % 60 == 0) {
  
    nuvem = createSprite(600, 100, 40, 10);
    // Adicionar imagem
    nuvem.addImage(nuvemImagem);
    // Criar n�meros aleat�rios entre 10 e 60
    nuvem.y = Math.round(random(10, 60));
    // alterar o tamanho da nuvem
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;

    nuvem.lifetime=200;
    // ajuste da profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;

  }
}

function criarCactos() {
  if (frameCount % 60 == 0) {

  var cacto=createSprite(400, 165, 10, 40);
  cacto.addImage(cacto1);
  cacto.velocityX=-6; 
}


}
