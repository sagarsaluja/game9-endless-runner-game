//job is to draw and update the main player of the game
//for best performance , include all images in the html file and set their display to none.
//this way it only works when they are fully loaded.

//this player class receives the entire game object
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100; //these are hardcoded for performance reasons
    this.height = 91.3;
    this.x = 0;
    this.y = 100;
  }
  update() {}
  draw(context) {
    //it needs context to know which canvas to draw on.
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
