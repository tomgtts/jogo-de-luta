export const defaultConfig = {
    p1: {
      x: 100,
      y: 300,
      width: 50,
      height: 100,
      color: 'red',
      speed: 5,
      isAttacking: false,
      velocityY: 0,
      isJumping: false,
      gravity: 0.4,
      jumpForce: -12,
      prevX: 0,
      prevY: 0,
      controls: {
        left: 'ArrowLeft',
        right: 'ArrowRight',
        up: 'ArrowUp',
        down: 'ArrowDown',
        jump: 'Space',
        attack: 'Enter'
      }
    },
    p2: {
      x: 650,
      y: 300,
      width: 50,
      height: 100,
      color: 'blue',
      speed: 5,
      isAttacking: false,
      velocityY: 0,
      isJumping: false,
      gravity: 0.4,
      jumpForce: -12,
      prevX: 0,
      prevY: 0,
      controls: {
        left: 'KeyA',
        right: 'KeyD',
        up: 'KeyW',
        down: 'KeyS',
        jump: 'ShiftLeft',
        attack: 'KeyZ'
      }
    }
  };
  