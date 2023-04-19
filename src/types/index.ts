import { DIFFICULTY, APP_MODE, BOARD_ACTION } from '../constants';

type TDifficultyKeys = keyof typeof DIFFICULTY;
type TDifficultyValues = typeof DIFFICULTY[TDifficultyKeys];
type TAppModeKeys = keyof typeof APP_MODE;
type TAppModeValues = typeof APP_MODE[TAppModeKeys];

type TDigitState = 'X' | 'V' | 'O' | null;

type TRow = {
	id: string;
	number: string;
	digitArray: Array<string>;
	digitState: Array<TDigitState>;
	isCorrect: boolean;
	isChecked: boolean;
};

type TBoardActionType = keyof typeof BOARD_ACTION;

type TRowAction = {
	type: TBoardActionType;
	payload?: string;
};

type TBoard = {
	appMode: TDifficultyValues;
	targetNumber: string;
	isFinish: boolean;
	boardRows: Array<TRow>;
};

export type {
	TRow,
	TDifficultyKeys,
	TDifficultyValues,
	TBoardActionType,
	TRowAction,
	TBoard,
	TAppModeKeys,
	TAppModeValues,
};
