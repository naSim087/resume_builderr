import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Stack, Heading, useToast, Divider, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  
  const [isCompanyAdded, setIsCompanyAdded] = useState(false); // Track whether company is added
  const { colorMode } = useColorMode(); // Get the current color mode
  const formBgColor = colorMode === 'light' ? 'white' : 'gray.800'; // Background color based on mode
  const buttonColorScheme = colorMode === 'light' ? 'teal' : 'blue'; // Button color scheme

  const handleAddCompany = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    console.log('Role Name to Submit:', roleName); // Check what is being sent

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:3003/api/addCompany', 
        {
          name: companyName,
          roles: roleName, // Send the role as a whole string
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        console.log(response.data);
      if (response.data.success) {
        toast({
          title: 'Company Added',
          description: 'The company has been successfully added.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          colorScheme: 'green'
        });
        setIsCompanyAdded(true); // Switch to role form after company is added
      } else {
        toast({
          title: 'Failed to Add Company',
          description: response.data.message || 'An error occurred while adding the company.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while adding the company.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
};

  return (
    <Box maxW="lg" mx="auto" py={12} px={6}>
      <Stack spacing={8} align="center">
        <Heading fontSize="4xl">Add New Company and Role</Heading>

        <Box as="form" onSubmit={handleAddCompany} bg={formBgColor} boxShadow="lg" rounded="lg" p={8} width="100%">
          <Stack spacing={4}>
            {/* Company Form */}
            {!isCompanyAdded && (
              <>
                <FormControl isRequired>
                  <FormLabel htmlFor="companyName">Company Name</FormLabel>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="roleName">Role Name</FormLabel>
                  <Input
                    id="roleName"
                    name="roleName"
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Enter role name"
                  />
                </FormControl>
              </>
            )}

            {/* Role Form */}
            {isCompanyAdded && (
              <>
                <FormControl isRequired>
                  <FormLabel htmlFor="roleName">Role Name</FormLabel>
                  <Input
                    id="roleName"
                    name="roleName"
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Enter role name"
                  />
                </FormControl>
              </>
            )}

            <Button type="submit" colorScheme={buttonColorScheme} size="lg" width="full">
              {isCompanyAdded ? 'Add Role' : 'Add Company'}
            </Button>

            <Divider />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddCompany;
