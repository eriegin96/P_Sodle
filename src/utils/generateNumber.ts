import { APP_MODE, DIFFICULT_MODE, DIGIT_AMOUNT, MODE_MAX_NUMBER } from '../constants';
import { TAppModeKeys } from '../types';
import { getDifficultMode } from './getLocal';

const convertNumberToString = (number: string, appMode: TAppModeKeys) => {
	const amountOfDigit = DIGIT_AMOUNT[appMode];
	const numberOfZero = amountOfDigit - number.length;
	let targetNumber = number;

	for (let i = 0; i < numberOfZero; i++) {
		targetNumber = `0${targetNumber}`;
	}

	return targetNumber;
};

export const generateNumber = () => {
	const appMode = getDifficultMode();
	const maxNumber = MODE_MAX_NUMBER[appMode];

	const number = Math.floor(Math.random() * maxNumber);
	const targetNumber = convertNumberToString(number.toString(), appMode);
	localStorage.setItem('target-number', targetNumber);

	return targetNumber;
};
