import { DIGIT_AMOUNT, BOARD_ACTION, DIGIT_STATE } from '../constants';
import { TRow, TRowAction } from '../types';
import { getDifficultMode } from '../utils/getLocal';
import { v4 as uuidv4 } from 'uuid';

const initDigits = DIGIT_AMOUNT[getDifficultMode()];
const { CORRECT, MATCH, INCORRECT } = DIGIT_STATE;

export const initialBoard: Array<TRow> = [
	{
		id: uuidv4(),
		number: '',
		digitArray: new Array(initDigits).fill(''),
		digitState: new Array(initDigits).fill(INCORRECT),
		isCorrect: false,
		isChecked: false,
	},
];

export const boardReducer = (state: Array<TRow>, action: TRowAction) => {
	let digits, digitArray, digitState, isCorrect, newRow, isChecked;

	switch (action.type) {
		case BOARD_ACTION.EDIT_ROW:
			if (!action?.payload) return state;

			const number = action.payload;
			digitArray = action.payload.split('');
			digitState = new Array(number.length).fill(INCORRECT);
			isChecked = false;
			isCorrect = digitState.every((digit) => digit === CORRECT);

			newRow = {
				id: state.at(-1)?.id ?? state[0].id,
				number,
				digitArray,
				digitState,
				isCorrect,
				isChecked,
			};

			return [...state.slice(0, -1), newRow];

		case BOARD_ACTION.ADD_ROW:
			if (state.at(-1)?.isCorrect) return state;
			digits = DIGIT_AMOUNT[getDifficultMode()];
			newRow = {
				id: uuidv4(),
				number: '',
				digitArray: new Array(digits).fill(''),
				digitState: new Array(digits).fill(INCORRECT),
				isCorrect: false,
				isChecked: false,
			};
			return [...state, newRow];

		case BOARD_ACTION.CHECK_ROW:
			if (!action?.payload) return state;

			const targetNumber = action.payload;
			const targetNumberDigits: Array<string | null> = targetNumber.split('');
			const rowToCheck = state.at(-1) ?? state[0];
			isChecked = true;
			digitArray = rowToCheck.digitArray;
			digitState = new Array(targetNumber.length).fill('X');
			const targetDigitForMatch = [...targetNumberDigits];

			for (let i = 0; i < digitArray.length; i++) {
				if (digitArray[i] === targetNumberDigits[i]) {
					targetDigitForMatch[i] = null;
					digitState[i] = CORRECT;
				}
			}

			for (let i = 0; i < digitArray.length; i++) {
				if (digitState[i] === CORRECT) continue;

				if (targetDigitForMatch.includes(digitArray[i])) {
					digitState[i] = MATCH;
					targetDigitForMatch.splice(targetDigitForMatch.indexOf(digitArray[i]), 1);
				}
			}

			isCorrect = digitState.every((digit) => digit === CORRECT);

			newRow = { ...rowToCheck, digitState, isChecked, isCorrect };

			return [...state.slice(0, -1), newRow];

		case BOARD_ACTION.RESET_ROW:
			digits = DIGIT_AMOUNT[getDifficultMode()];

			return [
				{
					id: uuidv4(),
					number: '',
					digitArray: new Array(digits).fill(''),
					digitState: new Array(digits).fill(INCORRECT),
					isCorrect: false,
					isChecked: false,
				},
			];

		default:
			return state;
	}
};
