

import React, { useState, useEffect } from 'react';
import { Box, Flex, HStack, IconButton, Button, useColorMode, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import logo from './../../Assets/logo.png';
import { useDisclosure } from '@chakra-ui/react';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    // State to track whether the admin is logged in
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Check if the admin is logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAdminLoggedIn(true);
        }
    }, []);

    // Function to handle admin login redirection
    const handleAdminLogin = () => {
        navigate('/adminlogin');
    };

    // Function to handle admin logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Remove the token from localStorage
        localStorage.setItem('isAdminLoggedIn', false);  // Set login status to false
        setIsAdminLoggedIn(false);  // Update the state to reflect logout
        navigate('/adminlogin');  // Redirect to the login page
    };

    return (
        <>
            <Box id='navbar' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <ReachLink to='/'>
                        <Box>
                            <img style={{ height: '44px' }} className='logo' src={logo} alt="logo" />
                        </Box>
                    </ReachLink>

                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <ReachLink
                                px={2} py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                                to={'/'}>Home</ReachLink>
                            <ReachLink
                                px={2} py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                                to={'/about'}>About</ReachLink>
                            <ReachLink
                                px={2} py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                                to={'/explore'}>Explore</ReachLink>
                        </HStack>

                        {/* Admin Login / Logout Button */}
                        <Button onClick={isAdminLoggedIn ? handleLogout : handleAdminLogin}>
                            {isAdminLoggedIn ? 'Logout' : 'Admin Login'}
                        </Button>

                        {/* Toggle for light/dark mode */}
                        <Button onClick={toggleColorMode}>
                            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </HStack>

                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <ReachLink
                                px={2} py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                                to={'/'}>Home</ReachLink>
                            <ReachLink
                                px={2} py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                                to={'/about'}>About</ReachLink>
                            <ReachLink
                                px={2} py={1}
                                rounded={'md'}
                                _hover={{ textDecoration: 'none', bg: 'gray.200' }}
                                to={'/explore'}>Explore</ReachLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
