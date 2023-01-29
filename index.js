import { InputHandler } from "./input.js";
import { Player } from "./player.js";
//be careful !! import in from ./player.js not just ./player

window.addEventListener("load", () => {
  //we will place all js in window load event so that it only runs after everything is loaded
  //like images , stylesheets etc
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    //this class is the main brain of our project
    //this will handle things like updating and drawing the images , score etc
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this); //this passed here is the game object!
      this.input = new InputHandler();
    }
    update() {
      this.player.update(this.input.keys);
    }
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  const animationLogic = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);
    game.update();
  };
  const animate = () => {
    animationLogic();
    requestAnimationFrame(animate);
  };
  animate();
});
