import {
    Avatar,
    Box,
    Button,
    chakra,
    Collapse,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import talkWithTalkiesImg from './talkwithtalkies.jpg';
import InterviewsImg from './interview_companies.jpg';
import { Image } from '@chakra-ui/react';
import talk from './talk.jpg';
//import talkWithTalkiesImg from './assets/talkwithtalkies.jpg'; // Adjust the path relative to the current file
import courses from './courses1.jpg';


export default function AboutUs() {
    // Data for FAQs
    const faqData = [
        { question: 'How do I get started with Resume Builder?', answer: 'To get started, sign up and fill out your profile. Use our tools and templates to create a professional resume.' },
        { question: 'What is the Talk with Talkies feature?', answer: 'Talk with Talkies connects you with industry experts who provide guidance on optimizing your resume and career path.' },
        { question: 'Can I use Resume Builder to apply for jobs directly?', answer: 'While Resume Builder helps you create resumes, you’ll need to apply for jobs using external platforms.' },
        { question: 'How can I make my resume stand out?', answer: 'Use our Talk with Talkies feature to optimize content, structure, and design tailored to each job application.' },
        { question: 'Are the templates customizable?', answer: 'Yes! You can modify the layout, fonts, colors, and more to suit your preferences and goals.' },
        { question: 'Can I share my resume with others?', answer: 'Yes, download your resume in multiple formats like PDF and share it easily via email or social platforms.' },
        { question: 'Is the platform free to use?', answer: 'We offer free and premium plans. The premium version includes advanced customization and mentorship access.' },
        { question: 'Can I update my resume after it’s created?', answer: 'Absolutely! Update your resume anytime with new skills, certifications, and experiences.' },
        { question: 'How do I connect with a mentor on Talk with Talkies?', answer: 'Schedule a session with a mentor through the platform after creating your resume.' },
        { question: 'How long does it take to create a resume?', answer: 'It depends on the details. Generally, a professional resume can be completed within a few hours.' }
    ];

    const faqTextColor = useColorModeValue('gray.600', 'gray.300');
    const faqBg = useColorModeValue('white', 'gray.800');
    const faqHoverBg = useColorModeValue('gray.100', 'gray.700');
    const [openFaq, setOpenFaq] = useState(null);

    const headingColor = useColorModeValue('gray.900', 'white');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const bgColor = useColorModeValue('gray.50', 'gray.900');
   

    return (
        <Box bg={bgColor} py={12}>
            <Stack maxW="7xl" mx="auto" spacing={10} align="center" textAlign="center">

                {/* Introduction */}
                <Box>
                    <Heading as="h1" fontSize="4xl" fontWeight="bold" color={headingColor}>
                        Make Your Future with Us
                    </Heading>
                    <Text mt={4} fontSize="lg" lineHeight="1.8" color={textColor}>
                        At Resume Builder, we help you design resumes that don’t just get noticed but leave a lasting impression. 
                        With tools crafted to perfection and mentorship programs like Talk with Techies, you can showcase your skills in the best light possible. 
                        Join a growing community of learners and achievers who believe in creating opportunities and making dreams come true. 
                        Whether it’s your first step into the professional world or a career pivot, we’re here to assist you every step of the way. 
                    </Text>
                    {/* Add an image */}
                    <Box mt={6} borderRadius="lg" textAlign="center">
    <Image
        src={talkWithTalkiesImg}
        alt="Talk with Talkies"
        borderRadius="lg"
        width={['100%', '80%', '60%']}
        maxWidth="400px"
        mx="auto"
    />
</Box>

                </Box>

                {/* Talk with Talkies */}
                <Box>
                    <Heading as="h2" fontSize="3xl" fontWeight="bold" color={headingColor}>
                        Talk with Techies
                    </Heading>
                    <Text mt={4} fontSize="lg" lineHeight="1.8" color={textColor}>
                        <strong>Talk with Techies</strong> connects you with professionals who have walked the path you’re about to begin. 
                        They guide you on everything from improving your resume format to understanding industry-specific requirements. 
                        Imagine having a one-on-one session where your mentor helps you identify your strengths and tailor your resume to highlight those aspects. 
                        This personalized advice can be the game-changer that lands you the dream job you’ve always wanted.
                    </Text>
                    {/* Add an image */}
                    <Box mt={6} h="200px"  borderRadius="lg" display="flex" justifyContent="center" alignItems="center">
        <Image
            src={talk} // Ensure "talk" is properly imported or defined
            alt="Talk with Talkies"
            borderRadius="md"
            width={['100%', '80%', '60%']}
            maxWidth="400px"
        />
    </Box>
                </Box>

                {/* Personalized Course Recommendations */}
                <Box>
                    <Heading as="h2" fontSize="3xl" fontWeight="bold" color={headingColor}>
                        Personalized Course Recommendations
                    </Heading>
                    <Text mt={4} fontSize="lg" lineHeight="1.8" color={textColor}>
                        Learning never stops, and we ensure you stay ahead of the curve with curated <strong>course recommendations</strong>. 
                        Based on your career goals and skill gaps, our platform suggests relevant courses, certifications, and workshops 
                        that will enhance your resume and equip you with job-ready skills. These recommendations are not random—they are tailored 
                        to your profile, ensuring every course adds measurable value to your growth journey.
                    </Text>
                    {/* Add an image */}
                    
                    <Box mt={6} borderRadius="lg" textAlign="center">
    <Image
        src={courses}
        alt="Talk with Talkies"
        borderRadius="lg"
        width={['100%', '80%', '60%']}
        maxWidth="1000px"
        mx="auto"
    />
</Box>
                </Box>

                {/* Projects & Mentorship */}
                <Box>
                    <Heading as="h2" fontSize="3xl" fontWeight="bold" color={headingColor}>
                    Land interviews from your favorite companies
                    </Heading>
                    <Text mt={4} fontSize="lg" lineHeight="1.8" color={textColor}>
                    From crafting visually appealing and professional resumes to tailoring your applications for specific roles, we make sure you stand out in a competitive job market. Our Talk with Talkies feature connects you with industry mentors who share insider tips on interview preparation, personal branding, and networking strategies. Whether you're eyeing a position at a leading tech company, a dynamic startup, or a renowned multinational, we equip you with the tools and confidence to succeed. Let’s transform your aspirations into job offers.
                    </Text>
                    {/* Add an image */}
                    <Box mt={6} borderRadius="lg" textAlign="center">
    <Image
        src={InterviewsImg}
        alt="Talk with Talkies"
        borderRadius="lg"
        width={['200%', '100%', '60%']}
        maxWidth="800px"
        mx="auto"
    />
</Box>
                </Box>
            </Stack>

            {/* FAQ Section */}
            <Box mt={12} maxW={'7xl'} mx={'auto'}>
                <Heading as="h3" fontSize="2xl" fontWeight="bold" color={useColorModeValue('gray.900', 'white')} textAlign="center">
                    Frequently Asked Questions
                </Heading>
                <VStack mt={8} spacing={4} align="stretch">
                    {faqData.map((faq, index) => (
                        <Box
                            key={index}
                            p={4}
                            bg={faqBg}
                            borderWidth={1}
                            borderRadius="md"
                            _hover={{ bg: faqHoverBg, cursor: 'pointer' }}
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                            <Flex align="center" justify="space-between">
                                <Text fontWeight="bold" fontSize="lg">{faq.question}</Text>
                                <Icon as={FaQuestionCircle} boxSize={6} color="gray.500" />
                            </Flex>
                            <Collapse in={openFaq === index}>
                                <Text mt={2} fontSize="md" color={faqTextColor}>
                                    {faq.answer}
                                </Text>
                            </Collapse>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
}