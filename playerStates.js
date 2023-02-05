export const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
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
  handleInput(key) {
    if (["ArrowLeft", "ArrowRight"].includes(key)) {
      this.player.setState(states.RUNNING);
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
  handleInput(key) {
    handleHorizontalMovement(key, this.player);
    if (key === "ArrowUp" && this.player.onGround()) {
      this.player.setState(states.JUMPING);
    }
    if (key === "ArrowDown" && this.player.onGround()) {
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
    this.player.speedY -= 10;
  }
  handleInput(key) {
    handleHorizontalMovement(key, this.player);
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
  handleInput(key) {
    handleHorizontalMovement(key, this.player);
  }
}
const handleHorizontalMovement = (key, player) => {
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
};
