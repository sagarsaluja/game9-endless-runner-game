import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { Layer } from "./layer.js";
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
      this.groundMargin = 80;
      this.player = new Player(this); //this passed here is the game object!
      this.input = new InputHandler();
      this.speed = 0;
      this.layers = [
        new Layer(0, "layer1", this),
        new Layer(0.4, "layer2", this),
        new Layer(0.6, "layer3", this),
        new Layer(0.8, "layer4", this),
        new Layer(1, "layer5", this),
      ];
    }
    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);
      this.layers.forEach((layer) => {
        layer.update(this.speed);
      });
    }
    draw(context) {
      this.layers.forEach((layer) => {
        layer.draw(context);
      });
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let accumulatedTime = 0,
    deltaTime = 0;
  const animationLogic = (timeStamp) => {
    deltaTime = timeStamp - accumulatedTime;
    accumulatedTime = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);
    game.update(deltaTime);
  };
  const animate = (timeStamp) => {
    animationLogic(timeStamp);
    requestAnimationFrame(animate);
  };
  animate(0);
});
