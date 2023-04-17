import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { TRow } from '../types';
import { useAppContext } from '../contexts/AppContext';

type IRowProps = {
	row: TRow;
};

export default function Row({ row }: IRowProps) {
	const { setCurrentGuess } = useAppContext();
	const { isChecked, digitArray, digitCorrect, digitMatch } = row;

	const handleComplete = (value: string) => {
		setCurrentGuess(value);
	};

	return (
		<HStack my={4}>
			<PinInput isDisabled={isChecked} size='lg' placeholder='' variant='outline' onComplete={handleComplete}>
				{digitArray.map((_, index) => (
					<PinInputField
						key={index}
						color={digitCorrect[index] ? 'black' : digitMatch[index] ? '' : ''}
						bgColor={!isChecked ? '' : digitCorrect[index] ? 'green.400' : digitMatch[index] ? 'yellow.400' : ''}
						sx={{ caretColor: 'transparent', '&[disabled]': { opacity: 0.7, '&:hover': { borderColor: 'inherit' } } }}
					/>
				))}
			</PinInput>
		</HStack>
	);
}
