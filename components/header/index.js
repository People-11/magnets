import { useRef, useState, useEffect } from 'react';
import {
  chakra, Link, HStack, Flex, Box, useColorMode, useColorModeValue, Icon, IconButton,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import { FaMoon, FaSun, FaHeart } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';

function Header() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const bg = useColorModeValue('gray.100', 'gray.900');
  const ref = useRef();
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();

  useEffect(() => scrollY.onChange(() => setY(scrollY.get())), [scrollY]);

  const SponsorButton = (
    <Box
      display="flex"
      alignItems="center"
      as="a"
      href="https://lynx.pink/buymeacoffee"
      target="_blank"
      rel="noopener noreferrer"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      px="1em"
      minH="36px"
      rounded="md"
      fontSize="sm"
      color="gray.800"
      outline="0"
      transition="all 0.3s"
      _hover={{
        bg: 'gray.200',
        borderColor: 'gray.400',
      }}
      _active={{
        borderColor: 'gray.200',
      }}
      _focus={{
        boxShadow: 'outline',
      }}
      ml={5}
    >
      <Icon as={FaHeart} w="4" h="4" color="red.500" mr="2" />
      <Box as="strong" lineHeight="inherit" fontWeight="semibold">
        Sponsor
      </Box>
    </Box>
  );

  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex align="center">
              <b>Magnets</b>
            </Flex>

            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color="gray.400"
            >
              <HStack spacing="5">
                <Link
                  isExternal
                  href="https://github.com/4ndv/magnets"
                >
                  <Icon
                    as={AiFillGithub}
                    display="block"
                    transition="color 0.2s"
                    w="5"
                    h="5"
                    _hover={{ color: 'gray.600' }}
                  />
                </Link>
              </HStack>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              {SponsorButton}
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </Box>
  );
}

export default Header;
