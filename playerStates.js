import { constants, jumpVelocities, playerStates } from "./Constants.js";

class State {
  constructor(state) {
    this.state = playerStates[state];
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }

  enter() {
    this.player.maxFrame = 4;
    this.player.currentFrameY = 5;
  }
  handleInput(input) {
    if (input.has("ArrowLeft") || input.has("ArrowRight")) {
      this.player.setState(playerStates.RUNNING);
    }
    //no game based state changes
  }
}
export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }

  enter() {
    this.player.maxFrame = 8;
    this.player.currentFrameY = 3;
  }
  handleInput(input) {
    //movement
    // handleHorizontalMovement(input, this.player);
    //input based state updates

    if (input.has("r")) {
      //running to rolling
      this.player.setState(playerStates.ROLLING);
    }
    if (
      //running to jumping
      input.has("ArrowUp") &&
      this.player.onGround() &&
      !input.has("r")
    ) {
      this.player.setState(playerStates.JUMPING);
    }

    if (
      input.has("ArrowDown") &&
      this.player.onGround() &&
      !input.has("r") &&
      !input.has("ArrowUp")
    ) {
      this.player.setState(playerStates.SITTING);
    }
    if (this.player.isKilled) {
      this.player.setState(playerStates.DIZZY);
    }
    //to dizzy
  }
}
export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }

  enter() {
    this.player.maxFrame = 6;
    this.player.currentFrameY = 1;
    if (this.player.speedY === 0) this.player.speedY -= jumpVelocities.JUMP;
  }
  handleInput(input) {
    // handleHorizontalMovement(input, this.player);
    if (input.has("r")) {
      //to rolling
      this.player.setState(playerStates.ROLLING);
    }
    if (this.player.speedY >= 0 && !input.has("r")) {
      //to falling
      this.player.setState(playerStates.FALLING);
    }
    if (this.player.isKilled) {
      this.player.setState(playerStates.DIZZY);
    }
  }
}
export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }

  enter() {
    this.player.maxFrame = 6;
    this.player.currentFrameY = 2;
  }
  handleInput(input) {
    // handleHorizontalMovement(input, this.player);
    if (input.has("r")) {
      //falling to rolling
      this.player.setState(playerStates.ROLLING);
    }
    //falling to running
    if (this.player.onGround() && !input.has("r")) {
      this.player.setState(playerStates.RUNNING);
    }
    if (this.player.isKilled) {
      this.player.setState(playerStates.DIZZY);
    }
  }
}
export class Rolling extends State {
  constructor(player) {
    super("ROLLING", player);
    this.player = player;
  }
  enter() {
    this.player.maxFrame = 6;
    this.player.currentFrameY = 6;
  }
  handleInput(input) {
    // handleHorizontalMovement(input, this.player);
    //rolling to running
    if (this.player.onGround() && !input.has("r")) {
      this.player.setState(playerStates.RUNNING);
    }
    //rolling to jumping
    if (this.player.speedY < 0 && !input.has("r")) {
      this.player.setState(playerStates.JUMPING);
    }
    //rolling to falling
    if (this.player.speedY >= 0 && !input.has("r")) {
      this.player.setState(playerStates.FALLING);
    }
    //rolling to jump , but still rolling
    if (this.player.onGround() && input.has("r") && input.has("ArrowUp")) {
      this.player.speedY -= jumpVelocities.ROLLING;
    }
    //rolling to dizzy
    if (this.player.isKilled) {
      console.log("setting dizzy");
      this.player.setState(playerStates.DIZZY);
    }
  }
}
export class Dizzy extends State {
  constructor(player) {
    super("DIZZY", player);
    this.player = player;
  }
  enter() {
    this.player.maxFrame = 6;
    this.player.currentFrameY = 4;
    this.isDizzy = true;
    setTimeout(() => {
      this.isDizzy = false;
    }, constants.DIZZY_TIME);
  }
  handleInput(input) {
    if (!this.isDizzy) {
      //to rolling
      if (input.has("r")) {
        this.player.setState(playerStates.ROLLING);
      }
      if (this.player.onGround()) {
        this.player.setState(playerStates.RUNNING);
      }
      //implement all others.
    }
  }
}
export class Idle extends State {
  constructor(player) {
    super("IDLE", player);
  }
}
export class Bite extends State {
  constructor(player) {
    super("IDLE", player);
  }
}
export class KO extends State {
  constructor(player) {
    super("IDLE", player);
  }
}
export class GetHit extends State {
  constructor(player) {
    super("IDLE", player);
  }
}
