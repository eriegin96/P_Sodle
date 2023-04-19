import { DIFFICULTY, DIFFICULT_MODE, TARGET_NUMBER } from '../constants';
import { TDifficultyValues } from '../types';
import { generateNumber } from './generateNumber';

export const getDifficultMode = () => {
	return (localStorage.getItem(DIFFICULT_MODE) as TDifficultyValues) ?? DIFFICULTY.EASY;
};

export const getTargetNumber = () => {
	return localStorage.getItem(TARGET_NUMBER) ?? generateNumber();
};
