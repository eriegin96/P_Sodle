const TARGET_NUMBER = 'target-number'
const DIFFICULT_MODE = 'difficult-mode'

const APP_MODE = Object.freeze({
  EASY: 'EASY',
  NORMAL: 'NORMAL',
  HARD: 'HARD'
})

const BOARD_ACTION = Object.freeze({
  CHANGE_MODE: 'CHANGE_MODE',
  CHANGE_TARGET: 'CHANGE_TARGET',
  ADD_ROW: 'ADD_ROW',
  CHECK_ROW: 'CHECK_ROW',
})

const DIGIT_AMOUNT = Object.freeze({
  EASY: 4,
  NORMAL: 6,
  HARD: 8
})

const MODE_MAX_NUMBER = Object.freeze({
  EASY: 9_999,
  NORMAL: 999_999,
  HARD: 99_999_999
})

export { TARGET_NUMBER, DIFFICULT_MODE, APP_MODE, BOARD_ACTION, DIGIT_AMOUNT, MODE_MAX_NUMBER }