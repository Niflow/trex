var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem, nuvemImagem;
var cacto1;
var cacto2;
var cacto3;
var cacto4;
var cacto5;
var cacto6;

// Prï¿½ carregamento
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  // carregando a imagem do chão
  groundImage = loadImage("ground2.png");

  // carregando a imagem das nuvens
  nuvemImagem = loadImage("cloud.png");

  // carregando as imagens dos cactos
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
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
  
  //crie um solo invisÃ­vel
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}

// TELA
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
    // Criar nï¿½meros aleatï¿½rios entre 10 e 60
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

// criando obstáculos (cactos)
function criarCactos() {
  // condição para colocar 1 cacto a cada segundo
  if (frameCount % 60 == 0) {

    // criando uma sprite para o cacto
    var cacto=createSprite(400, 165, 10, 40);

    // faz o cacto andar para trás
    cacto.velocityX=-6;

    // criando números aleatórios para os cactos
    var numeroDoCacto = Math.round(random(1, 6));

    // condições
    // SE o número do cacto..: 
    switch (numeroDoCacto) {
      // caso seja o valor 1
      case 1:
        cacto.addImage(cacto1);
        break;
      // caso seja o valor 2
      case 2:
        cacto.addImage(cacto2);
        break;
      // caso seja o valor 3
      case 3:
        cacto.addImage(cacto3);
        break;
      // caso seja o valor 4
      case 4:
        cacto.addImage(cacto4);
        break;
      // caso seja o valor 5
      case 5:
        cacto.addImage(cacto5);
        break;
      // caso seja o valor 6
      case 6:
        cacto.addImage(cacto6);
        break;
    }
    cacto.scale = 0.7;
  }
}


// exemplos:

// var corDaBlusa = 'amarelo';

// condições
// SE a cor da blusa..: 
// switch (corDaBlusa) {
//   // caso seja a cor amarelo
//   case 'amarelo':
//     blusa.addImage(blusaAmarela);
//     break;
//   // caso seja a cor roxa
//   case 'roxa':
//     blusa.addImage(blusaRoxa);
//     break;
//   // caso seja a cor azul
//   case 'azul':
//     blusa.addImage(blusaAzul);
//     break;
// }
