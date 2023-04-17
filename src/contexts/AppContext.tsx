import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer, useState } from 'react';
import type { TAppModeValues, TRow, TRowAction } from '../types';
import { generateNumber } from '../utils';
import { boardReducer, initialBoard } from '../reducer/boardRows.reducer';
import { BOARD_ACTION, DIFFICULT_MODE } from '../constants';
import { getDifficultMode, getTargetNumber } from '../utils/getLocal';

interface IAppProviderProps {
	children: ReactNode;
}

export interface IAppContext {
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
	const [appMode, setAppMode] = useState(storageAppMode);
	localStorage.setItem(DIFFICULT_MODE, storageAppMode);

	const generatedNumber = getTargetNumber();
	const [targetNumber, setTargetNumber] = useState(generatedNumber);

	const [currentGuess, setCurrentGuess] = useState('');

	const [board, dispatchBoard] = useReducer(boardReducer, initialBoard);

	const changeAppMode = (newAppMode: TAppModeValues) => {
		setAppMode(newAppMode);
		localStorage.setItem(DIFFICULT_MODE, newAppMode);
		generateNewTarget();
		dispatchBoard({ type: BOARD_ACTION.RESET_ROW });
	};

	const generateNewTarget = () => {
		const newTarget = generateNumber();
		setTargetNumber(newTarget);
	};

	const value = {
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
