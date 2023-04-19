import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer, useState } from 'react';
import type { TAppModeValues, TDifficultyValues, TRow, TRowAction } from '../types';
import { generateNumber } from '../utils';
import { boardReducer, initialBoard } from '../reducer/boardRows.reducer';
import { APP_MODE, BOARD_ACTION, DIFFICULT_MODE } from '../constants';
import { getDifficultMode, getTargetNumber } from '../utils/getLocal';
import { resetRow } from '../reducer/boardRows.action';

interface IAppProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	difficulty: TDifficultyValues;
	changeDifficulty: (newDifficulty: TDifficultyValues) => void;
	appMode: TAppModeValues;
	changeAppMode: (newAppMode: TAppModeValues) => void;
	targetNumber: string;
	generateNewTarget: () => void;
	board: Array<TRow>;
	dispatchBoard: Dispatch<TRowAction>;
	currentGuess: string;
	setCurrentGuess: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext | null>(null);

export default function AppProvider({ children }: IAppProviderProps) {
	const storageAppMode = getDifficultMode();
	const [difficulty, setDifficulty] = useState(storageAppMode);
	localStorage.setItem(DIFFICULT_MODE, storageAppMode);

	const [appMode, setAppMode] = useState<TAppModeValues>(APP_MODE.COLOR);

	const generatedNumber = getTargetNumber();
	const [targetNumber, setTargetNumber] = useState(generatedNumber);

	const [currentGuess, setCurrentGuess] = useState('');

	const [board, dispatchBoard] = useReducer(boardReducer, initialBoard);

	const changeDifficulty = (newDifficulty: TDifficultyValues) => {
		setDifficulty(newDifficulty);
		localStorage.setItem(DIFFICULT_MODE, newDifficulty);
		generateNewTarget();
		dispatchBoard(resetRow());
	};

	const changeAppMode = (appMode: TAppModeValues) => {
		setAppMode(appMode);
	};

	const generateNewTarget = () => {
		const newTarget = generateNumber();
		setTargetNumber(newTarget);
	};

	const value = {
		difficulty,
		changeDifficulty,
		appMode,
		changeAppMode,
		targetNumber,
		generateNewTarget,
		board,
		dispatchBoard,
		currentGuess,
		setCurrentGuess,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext) as IAppContext;
