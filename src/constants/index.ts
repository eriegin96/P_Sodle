const TARGET_NUMBER = 'target-number';
const DIFFICULT_MODE = 'difficult-mode';

const DIFFICULTY = Object.freeze({
	EASY: 'EASY',
	NORMAL: 'NORMAL',
	HARD: 'HARD',
});

const APP_MODE = Object.freeze({
	COLOR: 'COLOR',
	NUMBER: 'NUMBER',
});

const BOARD_ACTION = Object.freeze({
	ADD_ROW: 'ADD_ROW',
	EDIT_ROW: 'EDIT_ROW',
	CHECK_ROW: 'CHECK_ROW',
	RESET_ROW: 'RESET_ROW',
});

const DIGIT_AMOUNT = Object.freeze({
	EASY: 4,
	NORMAL: 6,
	HARD: 8,
});

const MODE_MAX_NUMBER = Object.freeze({
	EASY: 9_999,
	NORMAL: 999_999,
	HARD: 99_999_999,
});

const DIGIT_STATE = Object.freeze({
	CORRECT: 'O',
	MATCH: 'V',
	INCORRECT: 'X',
});

export {
	TARGET_NUMBER,
	DIFFICULT_MODE,
	DIFFICULTY,
	APP_MODE,
	BOARD_ACTION,
	DIGIT_AMOUNT,
	MODE_MAX_NUMBER,
	DIGIT_STATE,
};
