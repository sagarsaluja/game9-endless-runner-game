import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { Layer } from "./layer.js";
import {
  Enemy,
  flyingEnemy,
  spiderEnemy,
  plantEnemy,
  bigSpiderEnemy,
} from "./enemies.js";
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
      this.enemies = [
        // new spiderEnemy(this, "enemy_spider"),
      ];
      this.enemyTimer = 0;
      this.enemyInterval = 100;
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemies();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer++;
      }
      this.enemies = this.enemies.filter(
        (enemy) => enemy.markedForDeletion === false
      );
      this.player.update(this.input.keys, deltaTime);
      this.layers.forEach((layer) => {
        layer.update(this.speed);
      });
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });
    }
    draw(context) {
      [...this.layers, ...this.enemies, this.player].forEach((item) => {
        item.draw(context);
      });
    }
    addEnemies() {
      this.enemies.push(new flyingEnemy(this, "enemy_fly"));
      if (this.speed > 0 && Math.random() < 0.2) {
        this.enemies.push(new plantEnemy(this, "enemy_plant"));
      }
      if (this.speed > 0 && Math.random() < 0.3) {
        this.enemies.push(new spiderEnemy(this, "enemy_spider_big"));
      }
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
