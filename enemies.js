/** @type {HTMLCanvasElement} */

export class Enemy {
  constructor(game, image, dividingWidth) {
    this.game = game;
    this.image = document.getElementById(image);
    this.width = this.image.width / dividingWidth;
    this.height = this.image.height;
    this.frameInterval = 50;
    this.timeToUpdateFrame = 0;
    this.currentFrameX = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.x -= this.speedX;
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
    if (this.timeToUpdateFrame > this.frameInterval) {
      this.updateFrame();
      this.timeToUpdateFrame = 0;
    } else {
      this.timeToUpdateFrame += deltaTime;
    }
  }
  draw(context) {
    context.strokeRect(this.x, this.y, this.width, this.height);
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
    super(game, image, 6);
    this.maxFrame = 5;
    this.x = game.width;
    this.y = Math.random() * game.height * 0.5;
    this.angle = Math.random() * Math.PI * 2 - Math.PI;
    this.speedX = Math.random() + 1 + game.speed;
  }
  update(deltaTime) {
    this.angle += Math.random() * 0.1 + 0.1;
    this.y += Math.sin(this.angle);
    super.update(deltaTime);
  }
}
export class plantEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 2);
    this.maxFrame = 1;
    this.x = this.game.width;
    this.y = this.game.height - this.game.groundMargin - this.height;
    this.speedX = this.game.speed;
  }
  update(deltaTime) {
    this.speedX = this.game.speed;
    super.update(deltaTime);
  }
}
export class spiderEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 6);
    this.maxFrame = 5;
    this.x = this.game.width;
    this.y = 0;
    this.speedX = this.game.speed;
    this.angle = Math.random() * Math.PI * 2 - Math.PI;
    this.angleSpeed = Math.random() * 0.01 + 0.01;
    this.speedY = 0.5 * Math.sin(this.angle);
  }
  update(deltaTime) {
    this.speedX = this.game.speed;
    this.angle += this.angleSpeed;
    this.y = this.game.height * 0.25 * Math.sin(this.angle) + this.height;
    super.update(deltaTime);
  }
  draw(context) {
    context.beginPath();
    context.moveTo(this.x + this.width * 0.5, 0);
    context.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
    super.draw(context);
  }
}

export class bigSpiderEnemy extends Enemy {
  constructor(game, image) {
    super(game, image, 5);
  }
}