import { HStack, PinInput, PinInputField, Text, Tooltip } from '@chakra-ui/react';
import { TRow } from '../types';
import { useAppContext } from '../contexts/AppContext';
import { APP_MODE, DIGIT_STATE } from '../constants';

type IRowProps = {
	row: TRow;
	isFinished: boolean;
};

const { CORRECT, MATCH } = DIGIT_STATE;

export default function Row({ row, isFinished }: IRowProps) {
	const { setCurrentGuess, appMode } = useAppContext();
	const { isChecked, digitArray, digitState } = row;
	const matchDigits = digitState
		.reduce<number>((prev, current) => {
			if (current === MATCH || current === CORRECT) return prev + 1;
			return prev;
		}, 0)
		.toString();
	const correctDigits = digitState
		.reduce<number>((prev, current) => {
			if (current === CORRECT) return prev + 1;
			return prev;
		}, 0)
		.toString();

	const handleComplete = (value: string) => {
		setCurrentGuess(value);
	};

	return (
		<HStack my={4}>
			{appMode === APP_MODE.COLOR && (
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
			)}
			{appMode === APP_MODE.NUMBER && (
				<>
					<Tooltip label='Match digits'>{matchDigits}</Tooltip>

					<PinInput isDisabled={isChecked} size='lg' placeholder='' variant='outline' onComplete={handleComplete}>
						{digitArray.map((_, index) => (
							<PinInputField
								autoFocus={index === 0}
								key={index}
								color={!isFinished ? '' : digitState[index] === CORRECT || digitState[index] === MATCH ? 'black' : ''}
								bgColor={
									!isFinished
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

					<Tooltip label='Correct digits'>{correctDigits}</Tooltip>
				</>
			)}
		</HStack>
	);
}
