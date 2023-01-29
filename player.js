//job is to draw and update the main player of the game
//for best performance , include all images in the html file and set their display to none.
//this way it only works when they are fully loaded.

//this player class receives the entire game object
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100; //these are hardcoded for performance reasons
    this.height = 91.3;
    this.x = 10;
    this.y = this.game.height - this.height;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeedY = 10;
    this.weight = 0.1;
  }
  update(input) {
    input.forEach((key) => {
      switch (key) {
        case "ArrowRight":
          this.x++;
          if (this.x + this.width > this.game.width) {
            this.x = this.game.width - this.width;
          }
          break;
        case "ArrowLeft":
          this.x--;
          if (this.x < 0) {
            this.x = 0;
          }
          break;
        case "ArrowUp":
          if (this.onGround()) {
            this.speedY += 8;
            this.y -= this.speedY;
          }

          // if (!this.onGround()) {
          //   this.speedY -= this.weight;
          //   this.y -= this.speedY;
          // } else {
          //   this.speedY = 0;
          // }
          break;
        case "ArrowDown":
          this.y++;
          break;
        case "Enter":
          this.width++;
          this.height++;
          break;
      }
    });

    if (!this.onGround()) {
      this.speedY -= this.weight;
      this.y -= this.speedY;
    } else {
      this.speedY = 0;
    }
  }
  draw(context) {
    //it needs context to know which canvas to draw on.
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  onGround() {
    return this.y >= this.game.height - this.height;
  }
}
