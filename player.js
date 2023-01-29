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
    this.y = 100;
    this.speed = 0;
    this.maxSpeed = 10;
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
          this.y--;
          break;
        case "ArrowDown":
          this.y++;
          break;
        case "Enter":
          this.width++;
          this.height++;
          break;
        default:
          break;
      }
    });
  }
  draw(context) {
    //it needs context to know which canvas to draw on.
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
