import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { TRow } from '../types';

type IRowProps = {
	row: TRow;
};

export default function Row({ row }: IRowProps) {
	const handleInputChange = (number: string) => {
		console.log(number);
	};

	return (
		<HStack>
			<PinInput size='lg' placeholder='' onChange={handleInputChange}>
				{row.split('').map((_, index) => (
					<PinInputField key={index} />
				))}
			</PinInput>
		</HStack>
	);
}
