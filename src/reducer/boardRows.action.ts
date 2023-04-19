import { BOARD_ACTION } from '../constants';

const editRow = (currentGuess: string) => ({ type: BOARD_ACTION.EDIT_ROW, payload: currentGuess });
const checkRow = (targetNumber: string) => ({ type: BOARD_ACTION.CHECK_ROW, payload: targetNumber });
const addRow = () => ({ type: BOARD_ACTION.ADD_ROW });
const resetRow = () => ({ type: BOARD_ACTION.RESET_ROW });

export { editRow, checkRow, addRow, resetRow };
