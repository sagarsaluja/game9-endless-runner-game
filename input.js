const gameControls = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
  "r",
];
export class InputHandler {
  constructor() {
    this.keys = new Set();
    //the relevant keys that are currently pressed will be stored in this array.
    //they'll be added on keydown event and removed on keyup event
    //we'll check if a key is included in this array when its pressed.

    window.addEventListener("keydown", (e) => {
      //when the constructor will be called once,
      // global window object will get an event listener added to it ,
      //so everytime you press a key, it will log that key to the console
      if (gameControls.includes(e.key)) {
        this.keys.add(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (gameControls.includes(e.key)) {
        this.keys.delete(e.key);
      }
    });
  }
}
