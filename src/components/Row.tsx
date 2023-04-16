import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { TRow } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { BOARD_ACTION } from '../constants';
import { useEffect } from 'react';

type IRowProps = {
	row: TRow;
};

export default function Row({ row }: IRowProps) {
	const { dispatchBoard, targetNumber } = useAppContext();
	const { isChecked, digitArray, digitCorrect, digitMatch } = row;

	const handleComplete = (value: string) => {
		dispatchBoard({ type: BOARD_ACTION.EDIT_ROW, payload: value });
		dispatchBoard({ type: BOARD_ACTION.CHECK_ROW, payload: targetNumber });
		dispatchBoard({ type: BOARD_ACTION.ADD_ROW });
	};

	return (
		<HStack my={4}>
			<PinInput isDisabled={isChecked} size='lg' placeholder='' variant='outline' onComplete={handleComplete}>
				{digitArray.map((_, index) => (
					<PinInputField
						key={index}
						color={digitCorrect[index] ? 'black' : digitMatch[index] ? '' : ''}
						bgColor={!isChecked ? '' : digitCorrect[index] ? 'green.400' : digitMatch[index] ? 'yellow.400' : ''}
						sx={{ caretColor: 'transparent' }}
					/>
				))}
			</PinInput>
		</HStack>
	);
}
