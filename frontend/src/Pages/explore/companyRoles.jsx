import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Card, CardBody, Text, Button, Heading, Stack, Flex } from '@chakra-ui/react';

const CompanyRoles = () => {
  const { companyName } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [resumeLinks, setResumeLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3003/api/roles?company=${companyName}`)
      .then(response => response.json())
      .then(data => {
        setRoles(data.roles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
        setLoading(false);
      });
  }, [companyName]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setLoadingData(true);

    fetch(`http://localhost:3003/api/relevant?company=${companyName}&role=${role}`)
      .then(response => response.json())
      .then(data => {
        setProjects(data.projects);
        setResumeLinks(data.resumePaths); // Assume resumes come as an array of links
        setLoadingData(false);
      })
      .catch((error) => {
        console.error('Error fetching relevant data:', error);
        setLoadingData(false);
      });
  };

  const extractProjectDetails = (projectDescription) => {
    const [name, description] = projectDescription.split(':');
    return { name: name.trim(), description: description ? description.trim() : '' };
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading roles...</div>;
  }

  return (
    <Flex direction="row" justify="space-between">
      {/* Left Section: Roles */}
      <Box width="48%" p={4} height="80vh" overflowY="auto">
        <Heading mb={8} fontSize="3xl" fontWeight="bold" color="teal.300" textAlign="center" letterSpacing="wider" lineHeight="1.4" textTransform="uppercase">
          Roles for {companyName}
        </Heading>
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          {roles.map((role, index) => (
            <Card key={index} borderRadius="md" boxShadow="lg" border="1px solid #e2e8f0">
              <CardBody>
                <Stack spacing={3}>
                  <Text fontSize="xl" fontWeight="bold">{role}</Text>
                  <Button colorScheme="teal" onClick={() => handleRoleSelect(role)}>
                    View Projects
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Box>

      {/* Right Section: Projects and Resumes */}
      <Box width="48%" p={4} height="80vh">
        {selectedRole && (
          <Heading mb={8} fontSize="3xl" fontWeight="bold" color="teal.300" textAlign="center" letterSpacing="wider" lineHeight="1.4" textTransform="uppercase">
            Data for {selectedRole}
          </Heading>
        )}

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Projects Section */}
          <Box overflowY="auto" maxHeight="60vh">
            <Heading mb={6} fontSize="2xl" fontWeight="bold" color="teal.200" textAlign="center">
              Projects
            </Heading>

            {loadingData ? (
              <Text>Loading projects...</Text>
            ) : (
              projects.length === 0 ? (
                <Text>No projects available for this role.</Text>
              ) : (
                <>
                  <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    {currentProjects.map((projectDescription, index) => {
                      const { name, description } = extractProjectDetails(projectDescription);
                      return (
                        <Card key={index} borderRadius="md" boxShadow="lg" border="1px solid #e2e8f0">
                          <CardBody>
                            <Stack spacing={3}>
                              <Text fontSize="xl" fontWeight="bold">{name}</Text>
                              <Text>{description}</Text>
                            </Stack>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </Grid>

                  {/* Pagination Controls */}
                  <Flex justify="center" mt={6}>
                    <Button onClick={prevPage} disabled={currentPage === 1} mr={4}>Previous</Button>
                    <Text fontSize="lg" fontWeight="bold">{`Page ${currentPage} of ${totalPages}`}</Text>
                    <Button onClick={nextPage} disabled={currentPage === totalPages} ml={4}>Next</Button>
                  </Flex>
                </>
              )
            )}
          </Box>

          {/* Resume Section */}
          <Box overflowY="auto" maxHeight="60vh">
            <Heading mb={6} fontSize="2xl" fontWeight="bold" color="teal.200" textAlign="center">
              Resumes
            </Heading>
            <Flex justify="center" align="center" direction="column" mb={6}>
              {resumeLinks.length > 0 ? (
                resumeLinks.map((resumeFile, index) => {
                  const directoryPath = resumeFile.substring(0, resumeFile.lastIndexOf('/'));
              const fileName = resumeFile.substring(resumeFile.lastIndexOf('/') + 1);
                  const resumeUrl = `http://localhost:3003/uploads/${fileName}`;
                  return (
                    <Box key={index} mb={4}>
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                        <Button colorScheme="teal">View Resume {index + 1}</Button>
                      </a>
                    </Box>
                  );
                })
              ) : (
                <Text>No resumes available for this role.</Text>
              )}
            </Flex>
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
};

export default CompanyRoles;
