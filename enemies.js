export class Enemy {
  constructor(game, image, maxFrame) {
    this.game = game;
    this.image = document.getElementById(image);
    this.width = this.image.width / 6;
    this.height = this.image.height;
    this.frameInterval = 50;
    this.timeToUpdateFrame = 0;
    this.currentFrameX = 0;
    this.maxFrame = maxFrame;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    if (this.timeToUpdateFrame > this.frameInterval) {
      this.updateFrame();
      this.timeToUpdateFrame = 0;
    } else {
      this.timeToUpdateFrame += deltaTime;
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.currentFrameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  updateFrame() {
    if (this.currentFrameX < this.maxFrame) {
      this.currentFrameX++;
    } else {
      this.currentFrameX = 0;
    }
  }
}
export class flyingEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 5);
    this.x = game.width;
    this.y = Math.random() * game.height * 0.5;
    this.angle = Math.random() * Math.PI * 2 - Math.PI;
    this.speed = Math.random() + 1 + game.speed;
  }
  update(deltaTime) {
    this.x -= this.speed;
    this.angle += Math.random() * 0.1 + 0.1;
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
    this.y += Math.sin(this.angle);
    super.update(deltaTime);
  }
}
export class plantEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 1);
  }
}
export class spiderEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 5);
  }
}
export class bigSpiderEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 5);
  }
}
