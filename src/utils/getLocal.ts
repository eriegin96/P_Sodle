import { APP_MODE, DIFFICULT_MODE, TARGET_NUMBER } from '../constants';
import { TAppModeValues } from '../types';
import { generateNumber } from './generateNumber';

export const getDifficultMode = () => {
	return (localStorage.getItem(DIFFICULT_MODE) as TAppModeValues) ?? APP_MODE.EASY;
};

export const getTargetNumber = () => {
	return localStorage.getItem(TARGET_NUMBER) ?? generateNumber();
};
