import { Flex, Heading } from '@chakra-ui/react';
import Board from './components/Board';
import InputBoard from './components/InputBoard';
import Navbar from './components/Navbar';

function App() {
	return (
		<Flex py={5} align='center' direction='column' minHeight='100vh' color='white'>
			<Heading as='h1' size='2xl' textAlign='center'>
				Sodle
			</Heading>

			<Navbar />
			<Board />
			<InputBoard />
		</Flex>
	);
}

export default App;
