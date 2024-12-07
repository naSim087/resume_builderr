import React, { useState } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, Card, CardBody, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AdminDashboard = () => {
    const [data, setData] = useState({ user: { username: 'Nasim' } });

    return (
        <Box p={4}>
            <Heading mb={4}>Welcome, {data ? data.user.username : 'Loading...'}</Heading>

            {/* Card Layout */}
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {/* Add Company Card */}
                <Card>
                    <CardBody>
                        <Image 
                            src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?q=80&w=2878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Add Company" 
                            borderRadius="md" 
                            mb={4}
                            boxSize="150px"
                            objectFit="cover"
                        />
                        <Heading size="lg" mb={4}>Add Company&Roles</Heading>
                        <Text mb={4}>Manage companies here.</Text>
                        {/* Using Link for navigation */}
                        <Button as={Link} to="/addcompany" colorScheme="teal" width="full">
                            Go to Add Company
                        </Button>
                    </CardBody>
                </Card>

                

                {/* Add Resume Card */}
                <Card>
                    <CardBody>
                        <Image 
                            src="https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Add Resume" 
                            borderRadius="md" 
                            mb={4}
                            boxSize="150px"
                            objectFit="cover"
                        />
                        <Heading size="lg" mb={4}>Add Selected Resume</Heading>
                        <Text mb={4}>Upload resumes for candidates here.</Text>
                        {/* Using Link for navigation */}
                        <Button as={Link} to="/addresume" colorScheme="teal" width="full">
                            Go to Add Resume
                        </Button>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Box>
    );
};

export default AdminDashboard;
