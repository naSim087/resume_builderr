import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Select, Input, Button, Stack, Heading, useToast, useColorMode } from '@chakra-ui/react';
import axios from 'axios';

const UploadFile = () => {
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const formBgColor = colorMode === 'light' ? 'white' : 'gray.800';
  const buttonColorScheme = colorMode === 'light' ? 'teal' : 'blue';

  const API_BASE_URL = 'http://localhost:3003/api';

  // Fetch companies on page load
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/companies`);
        setCompanies(response.data || []);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while fetching companies.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchCompanies();
  }, []);

  // Fetch roles when a company is selected
  useEffect(() => {
    const fetchRoles = async () => {
      if (!selectedCompany) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/roles?company=${selectedCompany}`);
        setRoles(response.data?.roles || []);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while fetching roles.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchRoles();
  }, [selectedCompany]);

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Upload the image to the server
    const formData = new FormData();
    formData.append('file', file);
    formData.append('company', selectedCompany);
    formData.append('role', selectedRole);

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken'); // Get the token from local storage
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
        body: formData,
      });

      if (response.ok) {
        const { filePath } = await response.json();
        setStatus('Upload successful');
        toast({
          title: 'File Uploaded',
          description: 'The file has been successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setStatus('Failed to upload');
        toast({
          title: 'Error',
          description: 'An error occurred while uploading the file.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('Error occurred');
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully');
  };

  return (
    <Box maxW="lg" mx="auto" py={12} px={6}>
      <Stack spacing={8} align="center">
        <Heading fontSize="4xl">Upload File for Company and Role</Heading>

        <Box as="form" onSubmit={handleSubmit} bg={formBgColor} boxShadow="lg" rounded="lg" p={8} width="100%">
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="company">Select Company</FormLabel>
              <Select
                id="company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                placeholder="Select a company"
              >
                {companies.map((company) => (
                  <option key={company._id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="role">Select Role</FormLabel>
              <Select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                placeholder="Select a role"
                isDisabled={!selectedCompany}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="file">Upload File</FormLabel>
              <Input
                id="file"
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme={buttonColorScheme}
              size="lg"
              width="full"
              isLoading={loading}
              loadingText="Uploading"
            >
              Upload File
            </Button>
          </Stack>
        </Box>
        {status && <h4>{status}</h4>}
      </Stack>
    </Box>
  );
};

export default UploadFile;
