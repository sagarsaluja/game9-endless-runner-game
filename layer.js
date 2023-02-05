export class Layer {
  constructor(speed, image, game) {
    this.game = game;
    this.speed = this.game.speed * speed;
    this.image = document.getElementById(image);
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x -= this.speed;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
