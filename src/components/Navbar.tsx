import { Flex, IconButton, Spacer, Tooltip } from '@chakra-ui/react';
import { FiInfo, FiLayers, FiRefreshCcw } from 'react-icons/fi';

type Props = {};

export default function Navbar({}: Props) {
	return (
		<Flex my={8} w={300} justify='space-between' gap={2}>
			<Tooltip label='Rule'>
				<IconButton aria-label='Rule' variant='link' icon={<FiInfo size={20} />} />
			</Tooltip>
			<Tooltip label='Difficulty'>
				<IconButton aria-label='Difficulty' variant='link' icon={<FiLayers size={20} />} />
			</Tooltip>
			<Spacer />
			<Tooltip label='New number'>
				<IconButton aria-label='New number' variant='link' icon={<FiRefreshCcw size={20} />} />
			</Tooltip>
		</Flex>
	);
}
