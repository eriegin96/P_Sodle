import { Flex, Heading } from '@chakra-ui/react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import { KeyboardEvent } from 'react';
import { useAppContext } from './contexts/AppContext';
import { DIGIT_AMOUNT } from './constants';
import { addRow, checkRow, editRow } from './reducer/boardRows.action';

function App() {
	const { dispatchBoard, currentGuess, targetNumber, difficulty, setCurrentGuess } = useAppContext();

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			if (currentGuess.length !== DIGIT_AMOUNT[difficulty]) return;

			setCurrentGuess('');
			dispatchBoard(editRow(currentGuess));
			dispatchBoard(checkRow(targetNumber));
			dispatchBoard(addRow());
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
