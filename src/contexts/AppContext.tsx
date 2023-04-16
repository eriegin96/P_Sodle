import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { TRow } from '../types';
import { APP_MODE } from '../constants';
import { convertNumberToString } from '../utils';

interface IAppProviderProps {
	children: ReactNode;
}

export interface IAppContext {
	boardRows: Array<TRow>;
}

export const AppContext = createContext<IAppContext | null>(null);

export default function AppProvider({ children }: IAppProviderProps) {
	const [appMode, setAppMode] = useState(APP_MODE.NORMAL);
	const [boardRows, setBoardRows] = useState(['0000']);
	const targetNumber = convertNumberToString(Math.floor(Math.random() * 9999));

	const value = {
		appMode,
		setAppMode,
		targetNumber,
		boardRows,
		setBoardRows,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext) as IAppContext;
