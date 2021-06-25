import React from 'react'
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import Login from './Login'

const Links = [
  {
    name: 'Blogs',
    path: '/',
  },
  {
    name: 'Users',
    path: '/users',
  },
]

const NavLink = ({ name, path }) => (
  <Link
    as={ReactRouterLink}
    to={path}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {name}
  </Link>
)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <header>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        color={useColorModeValue('gray.900', 'gray.100')}
        px={4}
        borderTop='3px solid'
        borderTopColor={useColorModeValue('green.500', 'green.300')}
        boxShadow='lg'
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* Mobile Hamburger */}
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            {/* Logo */}
            <Heading
              fontSize='x-large'
              fontWeight='bold'
              bgGradient='linear(to-r, green.500, green.300, cyan.500)'
              bgClip='text'
            >
              Bloglist
            </Heading>

            {/* Web Nav Links */}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink key={link.name} name={link.name} path={link.path} />
              ))}
            </HStack>
          </HStack>

          {/*Dark/Light Theme Button*/}
          <HStack alignItems={'center'} spacing={4}>
            <Login />
            <IconButton onClick={toggleColorMode} isRound='true'>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </HStack>
        </Flex>

        {/* Mobile Nav Links */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link.name} name={link.name} path={link.path} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </header>
  )
}

export default Navbar
