import { Flex, Heading, Input } from '@chakra-ui/react';
import Board from './components/Board';
import InputBoard from './components/InputBoard';
import Navbar from './components/Navbar';
import { KeyboardEvent } from 'react';

function App() {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') console.log(e.key);
	};

	return (
		<Flex
			tabIndex={0}
			py={5}
			align='center'
			direction='column'
			minHeight='100vh'
			color='white'
			sx={{ '&:focus-visible': { outline: 'none' } }}
			onKeyDown={handleKeyDown}
		>
			<Heading as='h1' size='2xl' textAlign='center' bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
				Sodle
			</Heading>

			<Navbar />
			<Board />
			<InputBoard />
		</Flex>
	);
}

export default App;
