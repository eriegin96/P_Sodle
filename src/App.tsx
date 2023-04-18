import { Flex, Heading } from '@chakra-ui/react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import { KeyboardEvent } from 'react';
import { useAppContext } from './contexts/AppContext';
import { BOARD_ACTION, DIGIT_AMOUNT } from './constants';

function App() {
	const { dispatchBoard, currentGuess, targetNumber, appMode, setCurrentGuess } = useAppContext();

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			if (currentGuess.length !== DIGIT_AMOUNT[appMode]) return;

			setCurrentGuess('');
			dispatchBoard({ type: BOARD_ACTION.EDIT_ROW, payload: currentGuess });
			dispatchBoard({ type: BOARD_ACTION.CHECK_ROW, payload: targetNumber });
			dispatchBoard({ type: BOARD_ACTION.ADD_ROW });
		}
	};

	return (
		<Flex py={5} align='center' direction='column' minHeight='100vh' color='white' onKeyDown={handleKeyDown}>
			<Heading as='h1' size='2xl' textAlign='center' bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
				Sodle
			</Heading>

			<Navbar />
			<Board />
		</Flex>
	);
}

export default App;
