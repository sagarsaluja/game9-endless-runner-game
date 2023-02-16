export const playerStates = Object.freeze({
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
});
export const jumpVelocities = Object.freeze({
  JUMP: 11.5,
  ROLLING: 12.2,
});
export const gameSpeeds = Object.freeze({
  DEFAULT: 3,
  ROLLING: 5,
  SITTING: 0,
});
export const enemyTypes = Object.freeze({
  SPIDER: 1,
  FLYING: 2,
  PLANT: 3,
});
export const constants = Object.freeze({
  DIZZY_TIME: 1500,
});
