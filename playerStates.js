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
      this.player.setState(states.RUNNING, 1);
    }
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
    handleHorizontalMovement(input, this.player);
    if (input.has("ArrowUp") && this.player.onGround()) {
      this.player.setState(states.JUMPING, 1);
    }
    if (input.has("ArrowDown") && this.player.onGround()) {
      this.player.setState(states.SITTING, 0);
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
    this.player.speedY -= 10;
  }
  handleInput(input) {
    handleHorizontalMovement(input, this.player);
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
    handleHorizontalMovement(input, this.player);
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
    handleHorizontalMovement(input, this.player);
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
const handleHorizontalMovement = (input, player) => {
  for (const key of input) {
    switch (key) {
      case "ArrowRight":
        player.x++;
        break;
      case "ArrowLeft":
        player.x--;
        break;

      default:
        break;
    }
  }
};
