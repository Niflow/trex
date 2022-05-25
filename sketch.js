/**
 * Comandos de controle:
 * 
 * Se condição for verdadeira (if = se)
 * if (condição) {
 *    faz alguma coisa
 * }
 */

// Variáveis globais
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem, nuvemImagem;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var grupoNuvens, grupoCactos,fimJogo,fimJogoImg;
var reiniciar, reiniciarImg;
var somPular, somMorrer;
var pontos=0;

const PLAY = 1;
const FIM = 0;
var estadoDoJogo = PLAY;

// Pré carregamento
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
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
  fimJogoImg = loadImage("gameOver.png");
  reiniciarImg = loadImage("restart.png");

  somPular = loadSound("jump.wav");
  somMorrer = loadSound("collided.wav");
}

// Função de configuração
function setup() {

  createCanvas(600,200);

  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  fimJogo = createSprite(300,100);
  fimJogo.addImage(fimJogoImg);
  fimJogo.visible = false;

  reiniciar = createSprite(300, 100);
  reiniciar.addImage(reiniciarImg);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  grupoNuvens = new Group();
  grupoCactos = new Group();
}

// TELA
function draw() {
  //definir cor do plano de fundo
  background("black");
  
  // determina a área envolta do trex que poderá bater em outro objeto
  trex.setCollider("circle", 0, 0, 40);
  text("Pontos: " +pontos,500,50);
  //trex.debug = true;  

  if (estadoDoJogo === PLAY) {
    ground.velocityX = -4;
    pontos=pontos+Math.round(getFrameRate()/60);

    trex.changeAnimation("running");

    // pulando o trex ao pressionar a tecla de espaço
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      somPular.play();
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    // para fazer condição
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    criarNuvens();
    criarCactos();

    // se grupoCactos está tocando
    if (grupoCactos.isTouching(trex)) {
      estadoDoJogo = FIM;
      somMorrer.play();
    }

  }
  else if (estadoDoJogo === FIM) {
    ground.velocityX = 0;
    trex.changeAnimation("collided");
    fimJogo.visible = true;
    reiniciar.visible = true;
    grupoNuvens.setVelocityXEach(0);
    grupoCactos.setVelocityXEach(0);

    grupoNuvens.destroyEach();
    grupoCactos.destroyEach();
   
  }
  
  // Se mouse clicar na imagem de reiniciar o jogo será reiniciado
  if (mousePressedOver(reiniciar)) {
    reiniciarJogo();
  }

  //impedir que o trex caia
  trex.collide(invisibleGround);

  drawSprites();
}

function reiniciarJogo()
{
  estadoDoJogo = PLAY;
  fimJogo.visible = false; 
  reiniciar.visible = false;


}

// criando as nuvens
function criarNuvens() {

  if (frameCount % 60 == 0) {
  
    nuvem = createSprite(600, 100, 40, 10);
    // Adicionar imagem
    nuvem.addImage(nuvemImagem);
    // Criar números aleatórios entre 10 e 60
    nuvem.y = Math.round(random(10, 60));
    // alterar o tamanho da nuvem
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;

    // Determinando o tempo de vida da nuvem
    nuvem.lifetime = 200;

    // ajuste da profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;

    grupoNuvens.add(nuvem);
  }
}

// criando obstáculos (cactos)
function criarCactos() {
  // condiçãoo para colocar 1 cacto a cada segundo
  if (frameCount % 60 == 0) {

    // criando uma sprite para o cacto
    var cacto=createSprite(400, 165, 10, 40);

    // faz o cacto andar para trás
    cacto.velocityX=-6;

    // criando números aleatórios para os cactos
    var numeroDoCacto = Math.round(random(1, 6));

    // condiï¿½ï¿½es
    // SE o nï¿½mero do cacto..: 
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
    cacto.scale = 0.5;
    cacto.lifetime = 300;

    grupoCactos.add(cacto);
  }
}

// exemplos:

// var corDaBlusa = 'amarelo';

// condiï¿½ï¿½es
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
