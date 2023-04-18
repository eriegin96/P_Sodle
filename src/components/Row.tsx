import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { TRow } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { DIGIT_STATE } from '../constants';

type IRowProps = {
	row: TRow;
};

const { CORRECT, MATCH } = DIGIT_STATE;

export default function Row({ row }: IRowProps) {
	const { setCurrentGuess } = useAppContext();
	const { isChecked, digitArray, digitState } = row;

	const handleComplete = (value: string) => {
		setCurrentGuess(value);
	};

	return (
		<HStack my={4}>
			<PinInput isDisabled={isChecked} size='lg' placeholder='' variant='outline' onComplete={handleComplete}>
				{digitArray.map((_, index) => (
					<PinInputField
						autoFocus={index === 0}
						key={index}
						color={digitState[index] === CORRECT || digitState[index] === MATCH ? 'black' : ''}
						bgColor={
							!isChecked
								? ''
								: digitState[index] === CORRECT
								? 'green.400'
								: digitState[index] === MATCH
								? 'yellow.400'
								: ''
						}
						sx={{ caretColor: 'transparent', '&[disabled]': { opacity: 1, '&:hover': { borderColor: 'inherit' } } }}
					/>
				))}
			</PinInput>
		</HStack>
	);
}
