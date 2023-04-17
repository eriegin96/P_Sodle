import { Box, useToast } from '@chakra-ui/react';
import Row from './Row';
import { useAppContext } from '../contexts/AppContext';
import { useEffect } from 'react';

type Props = {};

export default function Board({}: Props) {
	const { board } = useAppContext();
	const toast = useToast();

	useEffect(() => {
		if (board.at(-1)?.isCorrect) {
			toast({
				title: 'Congratulations',
				description: "You've found the Sodle number",
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		}
	}, [board]);

	return (
		<Box flexGrow={1}>
			{board.map((row) => (
				<Row key={row.id} row={row} />
			))}
		</Box>
	);
}
