import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer, useState } from 'react';
import type { TAppModeValues, TBoard, TRow } from '../types';
import { generateNumber } from '../utils';
import { boardReducer, initialBoard } from '../reducer/boardRows.reducer';
import { APP_MODE, DIFFICULT_MODE, TARGET_NUMBER } from '../constants';

interface IAppProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	board: Array<TRow>;
}

export const AppContext = createContext<IAppContext | null>(null);

export default function AppProvider({ children }: IAppProviderProps) {
	const storageAppMode = (localStorage.getItem(DIFFICULT_MODE) as TAppModeValues) ?? APP_MODE.EASY;
	const [appMode, setAppMode] = useState(storageAppMode);
	localStorage.setItem(DIFFICULT_MODE, storageAppMode);

	const generatedNumber = localStorage.getItem(TARGET_NUMBER) ?? generateNumber(appMode);
	const [targetNumber, setTargetNumber] = useState(generatedNumber);

	const [board, dispatch] = useReducer(boardReducer, initialBoard);

	const changeAppMode = (newAppMode: TAppModeValues) => {
		setAppMode(newAppMode);
		generateNewTarget(newAppMode);
	};

	const generateNewTarget = (appMode: TAppModeValues) => {
		const newTarget = generateNumber(appMode);
		setTargetNumber(newTarget);
	};

	const value = {
		appMode,
		changeAppMode,
		targetNumber,
		generateNewTarget,
		board,
		dispatch,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext) as IAppContext;
