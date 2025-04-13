// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuração dos jogadores
import { defaultConfig } from './config/defaultConfig.js';

// Função para criar o jogador
function createPlayer(config) {
  return {
    x: config.x,
    y: config.y,
    width: config.width,
    height: config.height,
    color: config.color,
    speed: config.speed,
    isAttacking: false,
    velocityY: 0,
    isJumping: false,
    gravity: config.gravity,
    jumpForce: config.jumpForce,
    prevX: 0,
    prevY: 0,
    controls: config.controls
  };
}

// Criando os jogadores
const p1 = createPlayer(defaultConfig.p1);
const p2 = createPlayer(defaultConfig.p2);

// Input tracking
const keys = {};

// Event listeners para controle
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  if (e.code === p1.controls.jump && !p1.isJumping) {
    p1.velocityY = p1.jumpForce;
    p1.isJumping = true;
  }
  if (e.code === p2.controls.jump && !p2.isJumping) {
    p2.velocityY = p2.jumpForce;
    p2.isJumping = true;
  }
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

// Verificação de colisões
function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

// Função principal do jogo
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

function update() {
  // Salva as posições anteriores
  [p1, p2].forEach((player) => {
    player.prevX = player.x;
    player.prevY = player.y;
  });

  // Processa os movimentos dos jogadores
  [p1, p2].forEach((player) => {
    if (keys[player.controls.left]) player.x -= player.speed;
    if (keys[player.controls.right]) player.x += player.speed;
    if (keys[player.controls.up]) player.y -= player.speed;
    if (keys[player.controls.down]) player.y += player.speed;

    // Aplica a gravidade
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Colisão com o chão
    const ground = canvas.height - player.height;
    if (player.y > ground) {
      player.y = ground;
      player.velocityY = 0;
      player.isJumping = false;
    }

    // Ataque
    if (keys[player.controls.attack] && !player.isAttacking) {
      player.isAttacking = true;
      setTimeout(() => player.isAttacking = false, 300);
    }
  });

  // Verificação de colisão entre os jogadores
  if (checkCollision(p1, p2)) {
    p1.x = p1.prevX;
    p1.y = p1.prevY;
    p2.x = p2.prevX;
    p2.y = p2.prevY;
  }
}

function render() {
  // Limpa a tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o chão
  ctx.fillStyle = '#2d2d2d';
  ctx.fillRect(0, canvas.height - 5, canvas.width, 5);

  // Desenha os jogadores
  [p1, p2].forEach((player) => {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Desenha o ataque (se estiver atacando)
    if (player.isAttacking) {
      ctx.fillStyle = player === p1 ? 'yellow' : 'cyan';
      const attackX = player === p1 ? player.x + player.width : player.x - 30;
      ctx.fillRect(attackX, player.y, 30, player.height);
    }
  });
}

// Inicia o jogo
gameLoop();
