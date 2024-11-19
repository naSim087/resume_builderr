import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Button, Stack, Heading, useToast, Divider, useColorMode, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  // Get the current color mode and toggle function
  const { colorMode, toggleColorMode } = useColorMode();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:3003/api/login`, { username, password });
  
      if (response.data.success) {
        // Save the session info (e.g., token) to localStorage
        localStorage.setItem('authToken', response.data.token); // Store the token
        localStorage.setItem('isAdminLoggedIn', true); // Track the login state
  
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin dashboard!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
  
        navigate('/admindashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: response.data.message || 'Invalid username or password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Define colors based on the current color mode
  const textColor = useColorModeValue('black', 'black');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box maxW="lg" mx="auto" py={12} px={6} bg={bgColor} color={textColor}>
      <Stack spacing={8} align="center">
        <Heading fontSize="4xl" color={'teal.400'}>Admin Login</Heading>
        <Box
          as="form"
          onSubmit={handleLogin}
          bg="white"
          boxShadow="lg"
          rounded="lg"
          p={8}
          width="100%"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                borderColor={useColorModeValue('gray.300', 'gray.600')}  // Border color for light and dark modes
                
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                borderColor={useColorModeValue('gray.300', 'gray.600')}  // Border color for light and dark modes
                
              />

            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              
            >
              Login
            </Button>

            <Divider />

           
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminLogin;
