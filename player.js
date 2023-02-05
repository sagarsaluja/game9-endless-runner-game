//job is to draw and update the main player of the game
//for best performance , include all images in the html file and set their display to none.
//this way it only works when they are fully loaded.

//this player class receives the entire game object
import { Falling, Jumping, Running, Sitting, states } from "./playerStates.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100; //these are hardcoded for performance reasons
    this.height = 91.3;
    this.x = 10;
    this.y = this.game.height - this.height - game.groundMargin;
    this.speedX = 0;
    this.speedY = 0;
    this.weight = 0.2;
    this.image = document.getElementById("player");
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentFrameX = 0;
    this.currentFrameY = 5;
    this.maxFrame = 4;
    this.fps = 20; //the sprite sheet is designed for 20 fps , and we can pass delta Time to the player class to set a different fps
    this.frameInterval = 50; //just convert fps to miliseconds and invert it. 1000/20
    this.timeToUpdateFrame = 0;
  }
  update(input, deltaTime) {
    input.forEach((key) => {
      this.currentState.handleInput(key);
    });
    if (this.speedY > 0) {
      this.setState(states.FALLING, 1);
    }
    this.y += this.speedY;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }

    if (!this.onGround()) {
      this.speedY += this.weight;
    }
    if (this.onGround() && this.currentState.state === states["FALLING"]) {
      this.setState(states.RUNNING, 1);
      this.speedY = 0;
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
      this.currentFrameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = speed;
    this.currentState.enter();
  }
}
