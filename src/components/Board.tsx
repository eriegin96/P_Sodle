import { Box } from '@chakra-ui/react';
import Row from './Row';
import { AppContext, IAppContext, useAppContext } from '../contexts/AppContext';
import { useContext } from 'react';

type Props = {};

export default function Board({}: Props) {
	const { boardRows } = useAppContext();

	return (
		<Box flexGrow={1}>
			{boardRows.map((row, index) => (
				<Row key={index} row={row} />
			))}
		</Box>
	);
}
