import { DIGIT_AMOUNT, BOARD_ACTION } from '../constants';
import { TRow, TRowAction } from '../types';
import { getDifficultMode } from '../utils/getLocal';
import { v4 as uuidv4 } from 'uuid';

const initDigits = DIGIT_AMOUNT[getDifficultMode()];

export const initialBoard: Array<TRow> = [
	{
		id: uuidv4(),
		number: '',
		digitArray: new Array(initDigits).fill(''),
		digitMatch: new Array(initDigits).fill(false),
		digitCorrect: new Array(initDigits).fill(false),
		isCorrect: false,
		isChecked: false,
	},
];

export const boardReducer = (state: Array<TRow>, action: TRowAction) => {
	let digitArray, digitMatch, digitCorrect, isCorrect, newRow, isChecked;

	switch (action.type) {
		case BOARD_ACTION.EDIT_ROW:
			if (!action?.payload) return state;

			const number = action.payload;
			digitArray = action.payload.split('');
			digitMatch = new Array(number.length).fill(false);
			digitCorrect = new Array(number.length).fill(false);
			isChecked = false;
			isCorrect = digitCorrect.every((digit) => digit === true);

			newRow = {
				id: state.at(-1)?.id ?? state[0].id,
				number,
				digitArray,
				digitMatch,
				digitCorrect,
				isCorrect,
				isChecked,
			};

			return [...state.slice(0, -1), newRow];

		case BOARD_ACTION.ADD_ROW:
			if (state.at(-1)?.isCorrect) return state;
			newRow = { ...initialBoard[0], id: uuidv4() };
			return [...state, newRow];

		case BOARD_ACTION.CHECK_ROW:
			if (!action?.payload) return state;

			const targetNumber = action.payload;
			const targetNumberDigits = targetNumber.split('');
			const rowToCheck = state.at(-1) ?? state[0];
			digitArray = rowToCheck.digitArray;
			digitMatch = new Array(targetNumber.length).fill(false);
			digitCorrect = targetNumberDigits.map((digit, index) => digit === rowToCheck.digitArray[index]);
			isChecked = true;
			isCorrect = digitCorrect.every((digit) => digit === true);

			for (let i = 0; i < digitArray.length; i++) {
				if (targetNumberDigits.includes(digitArray[i])) {
					targetNumberDigits.splice(targetNumberDigits.indexOf(digitArray[i]), 1);
					digitMatch[i] = true;
				}
			}

			newRow = { ...rowToCheck, digitMatch, digitCorrect, isChecked, isCorrect };

			return [...state.slice(0, -1), newRow];

		case BOARD_ACTION.RESET_ROW:
			const digits = DIGIT_AMOUNT[getDifficultMode()];

			return [
				{
					id: uuidv4(),
					number: '',
					digitArray: new Array(digits).fill(''),
					digitMatch: new Array(digits).fill(false),
					digitCorrect: new Array(digits).fill(false),
					isCorrect: false,
					isChecked: false,
				},
			];

		default:
			return state;
	}
};
