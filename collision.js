export class Collision {
  constructor(image, dividingWidth, maxFrame, x, y) {
    this.image = document.getElementById(image);
    this.x = x;
    this.y = y;
    this.frameInterval = 50;
    this.timeToUpdateFrame = 0;
    this.currentFrameX = 0;
    this.width = this.image.width / dividingWidth;
    this.height = this.image.height;
    this.markedForDeletion = false;
    this.maxFrame = maxFrame;
  }
  update(deltaTime) {
    if (this.currentFrameX === this.maxFrame) {
      this.markedForDeletion = true;
    }
    if (this.timeToUpdateFrame > this.frameInterval) {
      this.updateFrame();
      this.timeToUpdateFrame = 0;
    } else {
      this.timeToUpdateFrame += deltaTime;
    }
  }
  updateFrame() {
    if (this.currentFrameX < this.maxFrame) {
      this.currentFrameX++;
    } else {
      this.currentFrameX = 0;
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
}
