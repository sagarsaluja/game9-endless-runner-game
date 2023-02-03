export const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
};

class State {
  constructor(state) {
    this.state = states[state];
  }
}

export class Sitting extends State {
  //class needs player object because we want to set the properties of the player's properties like
  // currentFrameY  etc.
  constructor(player) {
    super(states["SITTING"]);
    this.player = player;
  }
  //
  //we need 2 methods here
  //1st => apply the right Y coordinate in sprite sheet
  //2nd => handle input for that specific state
  //in all the child classes for state management , we'll use the same method names
  //"POLYMORPHISM"
  //we keep the names same because they'll be called using the "current state property" from the player object.

  enter() {
    //method just sets the Y coordinate
    this.player.currentFrameY = 5;
  }
  handleInput() {
    //this will handle the inputs specific to the Sitting state.
    //we will need to set the player's state according to the inputs.
    //so we will make a method called setstate in player class and call it here.
    //or we can also set this.player.currentState = whatever....
    //but we will also have to trigger the enter method after we set the current state.
    //so calling the enter meethod again and again in each class is code repetition
    //better make a method in player class called setState
    this.player.setState(states["RUNNING"]);
  }
}
export class Running extends State {
  constructor(player) {
    super(states["RUNNING"]);
    this.player = player;
  }

  enter() {
    this.player.currentFrameY = 3;
  }
  handleInput() {
    this.player.setState(states["JUMPING"]);
  }
}
export class Jumping extends State {
  constructor(player) {
    super(states["JUMPING"]);
    this.player = player;
  }

  enter() {
    this.player.currentFrameY = 1;
  }
  handleInput() {
    this.player.setState(states["JUMPING"]);
  }
}
