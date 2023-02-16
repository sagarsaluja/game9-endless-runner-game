export const states = {
  IDLE: 0,

  JUMPING: 1,

  FALLING: 2,

  RUNNING: 3,

  DIZZY: 4,

  SITTING: 5,

  ROLLING: 6,

  BITE: 7,

  KO: 8,

  GET_HIT: 9,
};

class State {
  constructor(state) {
    this.state = states[state];
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
      this.player.setState(states.RUNNING);
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
      this.player.setState(states.ROLLING);
    }
    if (
      //running to jumping
      input.has("ArrowUp") &&
      this.player.onGround() &&
      !input.has("r")
    ) {
      this.player.setState(states.JUMPING);
    }

    if (
      input.has("ArrowDown") &&
      this.player.onGround() &&
      !input.has("r") &&
      !input.has("ArrowUp")
    ) {
      this.player.setState(states.SITTING);
    }
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
    if (this.player.speedY === 0) this.player.speedY -= 10;
  }
  handleInput(input) {
    // handleHorizontalMovement(input, this.player);
    if (input.has("r")) {
      //to rolling
      this.player.setState(states.ROLLING);
    }
    if (this.player.speedY >= 0 && !input.has("r")) {
      //to falling
      this.player.setState(states.FALLING);
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
      this.player.setState(states.ROLLING);
    }
    //falling to running
    if (this.player.onGround() && !input.has("r")) {
      this.player.setState(states.RUNNING);
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
      this.player.setState(states.RUNNING);
    }
    //rolling to jumping
    if (this.player.speedY < 0 && !input.has("r")) {
      this.player.setState(states.JUMPING);
    }
    //rolling to falling
    if (this.player.speedY >= 0 && !input.has("r")) {
      this.player.setState(states.FALLING);
    }
  }
}
export class Idle extends State {
  constructor(player) {
    super("IDLE", player);
  }
}
export class Dizzy extends State {
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
