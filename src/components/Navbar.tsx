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
} from '@chakra-ui/react';
import { FiInfo, FiLayers, FiRefreshCcw } from 'react-icons/fi';
import { useAppContext } from '../contexts/AppContext';
import { APP_MODE, BOARD_ACTION } from '../constants';
import { TAppModeValues } from '../types';
import { useMemo } from 'react';

type TMenuItem = { command: string; value: TAppModeValues; text: string };

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { generateNewTarget, dispatchBoard, appMode, changeAppMode } = useAppContext();

	const menuItemList: Array<TMenuItem> = useMemo(
		() => [
			{ command: appMode === APP_MODE.EASY ? 'X' : '', value: 'EASY', text: 'Easy' },
			{ command: appMode === APP_MODE.NORMAL ? 'X' : '', value: 'NORMAL', text: 'Normal' },
			{ command: appMode === APP_MODE.HARD ? 'X' : '', value: 'HARD', text: 'Hard' },
		],
		[appMode]
	);

	const handleOpenRule = () => {
		onOpen();
	};

	const handleChangeMode = (mode: TAppModeValues) => {
		changeAppMode(mode);
	};

	const handleNewNumber = () => {
		generateNewTarget();
		dispatchBoard({ type: BOARD_ACTION.RESET_ROW });
	};

	return (
		<>
			<Flex my={8} w={300} justify='space-between' gap={2}>
				<Tooltip label='Rule'>
					<IconButton aria-label='Rule' variant='link' icon={<FiInfo size={20} onClick={handleOpenRule} />} />
				</Tooltip>

				<Menu>
					<Tooltip label='Difficulty'>
						<MenuButton as={IconButton} aria-label='Difficulty' variant='link'>
							<FiLayers size={20} />
						</MenuButton>
					</Tooltip>
					<MenuList sx={{ minW: 'max-content' }}>
						{menuItemList.map((item) => (
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
