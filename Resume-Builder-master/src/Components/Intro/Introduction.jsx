import { Flex, Container, Heading, Stack, Text, Button, Box, SimpleGrid, Icon, Image } from '@chakra-ui/react';
import { useContext } from 'react';
import ResumeContext from '../../Context/ResumeContext';
import ThemeTemplateData from '../../db/ThemeTemplateData';
import Footer from '../Footer/Footer';
import Testimonials from './Testimonials';
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from 'react-icons/bs';
import { HiTemplate, HiOutlineClipboardList } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { FaCheckCircle, FaUserGraduate } from 'react-icons/fa';
import { SiMicrosoftword } from 'react-icons/si';

export default function Introduction() {
    const { selectBtn, setSelectBtn, setCurrentTheme, showComponent, setShowComponent } = useContext(ResumeContext);

    const handleSelectTemplate = () => {
        setSelectBtn(!selectBtn);
    }


    const showTheme = (e) => {
        setShowComponent(!showComponent);
        setCurrentTheme(e.target.id);
    }
    const navigate = useNavigate();
    const handleChatButton = () => {
        navigate("/chat");
      };

    return (
        <>
            {/* Hero Section with Image and Button */}
            <Box
                as="section"
                position="relative"
                width="100%"
                height={{ base: '300px', md: '500px' }}
                bg="gray.100"
                overflow="hidden"
                mb={10}
            >
                <Image
                    src={require('./front.jpg')}
                    alt="Hero Background"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                />
                <Flex
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    direction="column"
                    align="center"
                    justify="center"
                    zIndex={1}
                >
                    <Heading
                        fontSize={{ base: '2xl', md: '4xl' }}
                        color="white"
                        textAlign="center"
                        mb={4}
                        textShadow="2px 2px 4px rgba(0,0,0,0.7)"
                    >
                        Build Your Resume in Minutes With ResuMate
                    </Heading>
                    <Button
                        size="lg"
                        bg="teal.400"
                        color="white"
                        _hover={{ bg: 'teal.600' }}
                        rounded="full"
                    >
                        Get Started
                    </Button>
                </Flex>
            </Box>

            {/* Resume Section */}
            <Container my={{ base: 1.5, md: 16 }} justifyContent="space-between" flexDirection="row" display="flex" alignItems="center" maxW="7xl">
                <Stack
                    width={{ base: '95%', md: '47%' }}
                    textAlign="center"
                    align="center"
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 1.5, md: 10 }}
                >
                    {selectBtn ? (
                        <>
                            <Heading
                                fontWeight={600}
                                fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                                lineHeight="110%"
                            >
                                Your resume in four{' '}
                                <Text as="span" color="#38B2AC">
                                    easy{' '}
                                </Text>
                                steps
                            </Heading>
                            <Text color="gray.500" maxW="3xl">
                                Resume builder tools that assemble well-formatted resumes. Through a
                                resume builder, you can create a professional-looking resume in a few
                                easy steps. This resume builder offers different template options, so
                                you can select the template that best fits your needs and style.
                            </Text>
                            <Flex _dark={{ color: 'gray.50' }} textAlign="start" flexDirection="column" w="full">
                                <Box className="Bullet_Points">
                                    <Button>1</Button>
                                    <Text _dark={{ color: 'gray.400' }} color="gray.900" fontSize="xl">
                                        Select a template from our collection.
                                    </Text>
                                </Box>
                                <Box className="Bullet_Points">
                                    <Button>2</Button>
                                    <Text _dark={{ color: 'gray.400' }} color="gray.900" fontSize="xl">
                                        Build your resume using our easy-to-use resume builder.
                                    </Text>
                                </Box>
                                <Box className="Bullet_Points">
                                    <Button>3</Button>
                                    <Text _dark={{ color: 'gray.400' }} color="gray.900" fontSize="xl">
                                        Explore selected resume tailored to the company role.
                                    </Text>
                                </Box>
                                <Box className="Bullet_Points">
                                    <Button>4</Button>
                                    <Text _dark={{ color: 'gray.400' }} color="gray.900" fontSize="xl">
                                        Download your resume for your application.
                                    </Text>
                                </Box>
                            </Flex>
                        </>
                    ) : (
                        <Heading
                            m="1.5"
                            textAlign={{ base: 'center', md: 'start' }}
                            fontWeight={600}
                            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                            lineHeight="110%"
                        >
                            Select a{' '}
                            <Text as="span" color="#38B2AC">
                                Template{' '}
                            </Text>
                            from the list
                        </Heading>
                    )}
                </Stack>

                {selectBtn ? (
                    <Stack>
                        <Image src={require('./../../Assets/home-logo.png')} alt="home logo" my="4" />
                        <Button
                            onClick={handleSelectTemplate}
                            rounded="full"
                            px={6}
                            className="mb-4"
                            colorScheme="teal"
                            bg="#38B2AC"
                            _hover={{ bg: '#319795' }}
                        >
                            Select Template
                        </Button>
                    </Stack>
                ) : (
                    <Box maxW={{ base: '100%', md: '61%' }} className="templatesList">
                        {ThemeTemplateData.map((item, index) => (
                            <div key={index} className="template" onClick={showTheme}>
                                <img id={item.id} src={item.imageSrc} alt={item.imageAlt} />
                            </div>
                        ))}
                    </Box>
                )}
            </Container>
           
      {/* Other elements like slideshow can be added here */}

      {/* Floating Chat Button */}
      {/* <button
        onClick={handleChatButton}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "15px 20px",
          border: "none",
          borderRadius: "50px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transition: "transform 0.3s ease, background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Chat with Senior
      </button> */}
    

            {/* Features Section */}
            <Container maxW="7xl" py={{ base: 12, md: 24 }}>
                <Heading textAlign="center" mb={12} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}>
                    Key Features of Our Resume Builder
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
                    {features.map((feature, index) => (
                        <Box key={index} textAlign="center" p={5} borderWidth={1} borderRadius="lg" shadow="md">
                            <Icon as={feature.icon} w={10} h={10} mb={4} color="teal.500" />
                            <Heading size="md" mb={2}>{feature.name}</Heading>
                            <Text>{feature.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
            <Testimonials />
            <Footer />
        </>
    );
}

export const features = [
  {
    name: "Resume Makers",
    description:
      "Create a professional resume effortlessly with our guided resume maker tool. Just fill in your details and let our system craft a well-structured resume tailored to your needs.",
    icon: BsFillPersonFill,
  },
  {
    name: "Resume by Template",
    description:
      "Choose from a variety of industry-specific templates to make your resume stand out. Customize the design and layout to suit your preferences.",
    icon: HiTemplate,
  },
  {
    name: "Job Description Missing Keywords",
    description:
      "Analyze job descriptions to identify missing keywords in your resume. Optimize your profile for the roles you're applying to and increase your chances of getting noticed.",
    icon: FiSearch,
  },
  {
    name: "ATS Matching",
    description:
      "Ensure your resume passes through Applicant Tracking Systems (ATS) by aligning it with best practices. Highlight the key sections and phrases that recruiters look for.",
    icon: FaCheckCircle,
  },
  {
    name: "College Seniors Review",
    description:
      "Get your resume reviewed by college seniors who have landed internships and jobs in top companies. Gain valuable insights and actionable feedback.",
    icon: FaUserGraduate,
  },
  {
    name: "Project Checkout",
    description:
      "Showcase your projects with detailed descriptions and outcomes. Let recruiters see your hands-on skills and expertise in action.",
    icon: HiOutlineClipboardList,
  },
  {
    name: "Cover Letter Generator",
    description:
      "Craft personalized cover letters tailored to specific job roles. Provide the job details, and our tool will generate a polished letter for you.",
    icon: SiMicrosoftword,
  },
];