

import { useNavigate } from 'react-router-dom'; // For navigation
import { useEffect, useState } from 'react';
import { Box, Grid, Card, CardBody, Text, Button, Heading, Image, Stack } from '@chakra-ui/react';

const Explore = () => {
  const [companies, setCompanies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); // Initialize the navigate hook

  const companyImages = {
         "Google": "https://images.unsplash.com/photo-1592096304832-62463bfdc822?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         "Microsoft": "https://images.unsplash.com/photo-1662947036644-ecfde1221ac7?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         "Meta": "https://images.unsplash.com/photo-1636114666138-b5047ca8ec84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         "Linkedin": "https://images.unsplash.com/photo-1704382002666-5dc4fbb522c0?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         "Oracle": "https://images.unsplash.com/photo-1662947774668-e2ca450802df?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         "MindTree":"https://media.licdn.com/dms/image/v2/C510BAQHTWmlRNCPPAA/company-logo_200_200/company-logo_200_200/0/1630587440530/mindtreeltd_logo?e=2147483647&v=beta&t=mKvcMHPU-8bSBeaD9aU3T2Cw_mKPlrG6YniXIG-vZRk",
         "LendingKart":"https://img-cdn.thepublive.com/fit-in/1200x675/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2019/06/lendingkart.jpg",
         "Facebook":"https://images.unsplash.com/photo-1549813069-f95e44d7f498?q=80&w=2856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         // Add more companies and their images here
     };

  useEffect(() => {
    fetch('http://localhost:3003/api/companies')
      .then(response => response.json())
      .then(data => {
        setCompanies(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  const handleCompanySelect = (companyName) => {
    navigate(`/roles/${companyName}`); // Navigate to the roles page of the selected company
  };

  return (
    <div>
      <Heading mb={14} fontSize="3xl" fontWeight="bold" color="teal.300" textAlign="center" letterSpacing="wider" lineHeight="1.4" textTransform="uppercase">
        Explore Companies Selected Resume
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {companies.map((company) => {
          const companyImage = companyImages[company.name] || "https://via.placeholder.com/150"; 
          
          return (
            <Card key={company._id} borderRadius="md" boxShadow="lg" border="1px solid #e2e8f0" transition="transform 0.3s ease-in-out" _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}>
              <CardBody>
                <Image src={companyImage} alt={`${company.name} logo`} borderRadius="md" mb={4} />
                <Stack spacing={3}>
                  <Text fontSize="xl" fontWeight="bold">{company.name}</Text>
                  <Text fontSize="md" color="gray.500">Roles available: {company.roles.length}</Text>
                  <Button colorScheme="teal" onClick={() => handleCompanySelect(company.name)}>
                    Explore Roles
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
};

export default Explore;
