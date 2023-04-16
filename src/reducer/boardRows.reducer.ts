import { DIGIT_AMOUNT, BOARD_ACTION, TARGET_NUMBER, DIFFICULT_MODE } from '../constants';
import { TAppModeValues, TRow, TRowAction } from '../types';

const initDigits = DIGIT_AMOUNT[localStorage.getItem(DIFFICULT_MODE) as TAppModeValues];

export const initialBoard: Array<TRow> = [
	{
		number: '',
		digitArray: new Array(initDigits).fill(''),
		digitMatch: new Array(initDigits).fill(false),
		digitCorrect: new Array(initDigits).fill(false),
		isCorrect: false,
	},
];

export const boardReducer = (state: Array<TRow>, action: TRowAction) => {
	let digitArray, digitMatch, digitCorrect, isCorrect, newRow;

	switch (action.type) {
		case BOARD_ACTION.ADD_ROW:
			const number = action.payload;
			digitArray = action.payload.split('');
			digitMatch = new Array(number.length).fill(false);
			digitCorrect = new Array(number.length).fill(false);
			isCorrect = digitCorrect.every((digit) => digit === true);

			newRow = {
				number,
				digitArray,
				digitMatch,
				digitCorrect,
				isCorrect,
			};

			return [...state, newRow];

		case BOARD_ACTION.CHECK_ROW:
			const targetNumber = action.payload;
			const targetNumberDigits = targetNumber.split('');
			const rowToCheck = state.at(-1) ?? state[0];
			digitArray = rowToCheck.digitArray;
			digitMatch = new Array().fill(false);

			for (let i = 0; i < digitArray.length; i++) {
				if (targetNumberDigits.includes(digitArray[i])) {
					targetNumberDigits.splice(targetNumberDigits.indexOf(digitArray[i]));
				}
				digitMatch[i] = true;
			}

			digitCorrect = targetNumberDigits.map((digit, index) => digit === rowToCheck.digitArray[index]);
			isCorrect = digitCorrect.every((digit) => digit === true);
			newRow = { ...rowToCheck, digitMatch, digitCorrect, isCorrect };

			return [...state.slice(0, -1), newRow];

		default:
			return state;
	}
};
