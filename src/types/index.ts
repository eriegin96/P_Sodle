import { APP_MODE, BOARD_ACTION } from '../constants';

type TAppModeKeys = keyof typeof APP_MODE;
type TAppModeValues = typeof APP_MODE[TAppModeKeys];

type TRow = {
	id: string;
	number: string;
	digitArray: Array<string>;
	digitMatch: Array<boolean>;
	digitCorrect: Array<boolean>;
	isCorrect: boolean;
	isChecked: boolean;
};

type TBoardActionType = keyof typeof BOARD_ACTION;

type TRowAction = {
	type: TBoardActionType;
	payload?: string;
};

type TBoard = {
	appMode: TAppModeValues;
	targetNumber: string;
	isFinish: boolean;
	boardRows: Array<TRow>;
};

export type { TRow, TAppModeKeys, TAppModeValues, TBoardActionType, TRowAction, TBoard };
