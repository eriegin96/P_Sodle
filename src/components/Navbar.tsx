import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	IconButton,
	Spacer,
	Tooltip,
	Text,
	Highlight,
	ModalFooter,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/react';
import { FiInfo, FiLayers, FiRefreshCcw } from 'react-icons/fi';
import { useAppContext } from '../contexts/AppContext';
import { DIFFICULTY, BOARD_ACTION, APP_MODE } from '../constants';
import { TAppModeValues, TDifficultyValues } from '../types';
import { useMemo } from 'react';
import { resetRow } from '../reducer/boardRows.action';

type TDifficultyMenuItem = { command: string; value: TDifficultyValues; text: string };
type TAppModeMenuItem = { command: string; value: TAppModeValues; text: string };

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { generateNewTarget, dispatchBoard, difficulty, changeDifficulty, appMode, changeAppMode } = useAppContext();

	const difficultyItemList: Array<TDifficultyMenuItem> = useMemo(
		() => [
			{ command: difficulty === DIFFICULTY.EASY ? 'X' : '', value: 'EASY', text: 'Easy' },
			{ command: difficulty === DIFFICULTY.NORMAL ? 'X' : '', value: 'NORMAL', text: 'Normal' },
			{ command: difficulty === DIFFICULTY.HARD ? 'X' : '', value: 'HARD', text: 'Hard' },
		],
		[difficulty]
	);

	const modeItemList: Array<TAppModeMenuItem> = useMemo(
		() => [
			{ command: appMode === APP_MODE.COLOR ? 'X' : '', value: 'COLOR', text: 'Show colors' },
			{ command: appMode === APP_MODE.NUMBER ? 'X' : '', value: 'NUMBER', text: 'Show numbers' },
		],
		[appMode]
	);

	const handleOpenRule = () => {
		onOpen();
	};

	const handleChangeDifficulty = (mode: TDifficultyValues) => {
		changeDifficulty(mode);
	};

	const handleChangeMode = (mode: TAppModeValues) => {
		changeAppMode(mode);
		handleNewNumber();
	};

	const handleNewNumber = () => {
		generateNewTarget();
		dispatchBoard(resetRow());
	};

	return (
		<>
			<Flex my={8} w={300} justify='space-between' gap={2}>
				<Tooltip label='Rule'>
					<IconButton aria-label='Rule' variant='link' icon={<FiInfo size={20} onClick={handleOpenRule} />} />
				</Tooltip>

				<Menu>
					<Tooltip label='Difficulty'>
						<MenuButton as={IconButton} aria-label='Difficulty' variant='link' sx={{ '& span': { flex: 'unset' } }}>
							<FiLayers size={20} />
						</MenuButton>
					</Tooltip>
					<MenuList sx={{ minW: 'max-content' }}>
						{difficultyItemList.map((item) => (
							<MenuItem key={item.text} command={item.command} onClick={() => handleChangeDifficulty(item.value)}>
								{item.text}
							</MenuItem>
						))}
						<MenuDivider />
						{modeItemList.map((item) => (
							<MenuItem key={item.text} command={item.command} onClick={() => handleChangeMode(item.value)}>
								{item.text}
							</MenuItem>
						))}
					</MenuList>
				</Menu>

				<Spacer />
				<Tooltip label='New number'>
					<IconButton
						aria-label='New number'
						variant='link'
						icon={<FiRefreshCcw size={20} onClick={handleNewNumber} />}
					/>
				</Tooltip>
			</Flex>

			<Modal isOpen={isOpen} size='sm' onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Guess the number</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							After each guess, you will get the hint which shows the amount of correct digit (
							<Highlight query='green' styles={{ px: '1', pb: '1', borderRadius: '4', bg: 'green.400' }}>
								highlighted by green
							</Highlight>
							) and match digit but not in correct position (
							<Highlight query='yellow' styles={{ px: '1', pb: '1', borderRadius: '4', bg: 'yellow.400' }}>
								highlighted by yellow
							</Highlight>
							)
						</Text>
						<br />
						<Highlight query='Note:' styles={{ px: '1', pb: '1', borderRadius: '4', color: 'white', bg: 'red.400' }}>
							Note: The digits can be duplicated
						</Highlight>
						<ModalFooter />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
