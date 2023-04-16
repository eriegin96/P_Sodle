import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { TRow } from '../types';

type IRowProps = {
	row: TRow;
};

export default function Row({ row }: IRowProps) {
	return (
		<HStack>
			<PinInput size='lg' placeholder='' variant='outline'>
				{row.digitArray.map((_, index) => (
					<PinInputField
						key={index}
						color={row.digitCorrect[index] ? 'black' : ''}
						bgColor={row.digitCorrect[index] ? 'green.400' : ''}
						sx={{ caretColor: 'transparent' }}
					/>
				))}
			</PinInput>
		</HStack>
	);
}
