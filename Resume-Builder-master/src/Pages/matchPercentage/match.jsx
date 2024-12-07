import React, { useState } from 'react';
import {
    Box,
    Text,
    Button,
    VStack,
    Alert,
    AlertIcon,
    AlertDescription,
    Spinner,
    Image,
    Link,
    Stack,
    Heading,
    Tag,
    TagLabel,
} from '@chakra-ui/react';
import { useToast, FormControl, FormLabel, Input, Textarea,Flex } from '@chakra-ui/react';

export default function MatchResume() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null); // Store backend result
    const [isResumeUploaded, setIsResumeUploaded] = useState(false);
    const [isCourseLoading, setIsCourseLoading] = useState(false); // Loading state for courses
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const toast = useToast();

    const API_BASE_URL = 'http://localhost:3003/api';

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFile(file);
        setIsResumeUploaded(true);
        setResult(null);
        setRecommendedCourses([]); // Clear previously fetched recommended courses
    
        toast({
            title: 'Resume Uploaded',
            description: 'Your resume has been uploaded successfully.',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        if (text.split(' ').length <= 200) {
            setJobDescription(text);
        } else {
            toast({
                title: 'Word limit exceeded',
                description: 'Job description should not exceed 200 words.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!file || !jobDescription.trim()) {
            toast({
                title: 'Missing fields',
                description: 'Please upload your resume and add a job description.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobDescription', jobDescription);

        try {
            // Call the backend to process resume and get missing keywords
            const response = await fetch(`${API_BASE_URL}/match`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to process the request');
            }

            const data = await response.json();

            if (data && data.data) {
                const { missingKeywords, matchPercentage, remark, softSkills } = data.data;

                setResult({ matchPercentage, missingKeywords, remark, softSkills });

                toast({
                    title: 'Success',
                    description: 'Your resume has been analyzed!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Something went wrong!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle course recommendation based on missing keywords
    const handleExploreCourses = async () => {
        if (result && result.missingKeywords && result.missingKeywords.length > 0) {
            setIsCourseLoading(true);

            try {
                // Send missing keywords as query parameter to the backend
                const keyword = result.missingKeywords.join(', '); // Join the missing keywords with a comma
                const response = await fetch(`${API_BASE_URL}/courses?keyword=${encodeURIComponent(keyword)}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch course recommendations');
                }

                const data = await response.json();

                if (data && data.length > 0) {
                    setRecommendedCourses(data);
                    toast({
                        title: 'Courses Recommended',
                        description: 'Explore the courses to upskill yourself!',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    throw new Error('No courses found');
                }
            } catch (error) {
                toast({
                    title: 'Error',
                    description: error.message || 'Something went wrong!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsCourseLoading(false);
            }
        } else {
            toast({
                title: 'No missing keywords',
                description: 'There are no missing keywords to explore courses for.',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={8} maxW="800px" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">
                Match Your Resume with a Job
            </Text>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel fontWeight="bold">Upload Resume</FormLabel>
                    <Box
                        borderWidth={2}
                        borderRadius="md"
                        p={2}
                        borderColor={isResumeUploaded ? 'green.500' : 'gray.200'}
                        borderStyle="dashed"
                    >
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                    </Box>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight="bold">Job Description</FormLabel>
                    <Textarea
                        placeholder="Paste the job description here (200 words max)"
                        value={jobDescription}
                        onChange={handleDescriptionChange}
                        resize="vertical"
                        maxLength={1200}
                    />
                    <Text mt={1} fontSize="sm" color="gray.500">
                        {jobDescription.split(' ').length}/200 words
                    </Text>
                </FormControl>

                <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    Match Resume
                </Button>
            </Stack>

            {isLoading && (
                <Box mt={4} textAlign="center">
                    <Spinner size="lg" />
                </Box>
            )}

            {result && (
                <Box mt={8} p={4} borderWidth={1} borderRadius="lg" bg="gray.50" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        Match Results
                    </Text>
                    <VStack spacing={3} align="start">
                        <Alert status="info">
                            <AlertIcon />
                            <AlertDescription>
                                Match Percentage: <strong>{result.matchPercentage}</strong>
                            </AlertDescription>
                        </Alert>
                        <Box>
                            <Text fontWeight="bold">Missing Keywords:</Text>
                            <Text>
                                {result.missingKeywords && result.missingKeywords.length > 0
                                    ? result.missingKeywords.join(', ')
                                    : 'None'}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Remark:</Text>
                            <Text>{result.remark}</Text>
                        </Box>
                        <Button
                            colorScheme="teal"
                            onClick={handleExploreCourses}
                            isLoading={isCourseLoading}
                            isDisabled={isCourseLoading || result.missingKeywords.length === 0}
                        >
                            Explore Courses
                        </Button>

                        {recommendedCourses.length > 0 && (
                            <Box mt={4}>
                                <Text fontWeight="bold">Recommended Courses:</Text>
                                <VStack spacing={4} align="stretch">
    {recommendedCourses.map((course, index) => (
        <Box
            key={index}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            bg="white"
            boxShadow="sm"
            width="100%" // Ensure the card takes full width
        >
            <Flex direction={{ base: 'column', md: 'row' }}>
                <Image
                    src={course.image_240x135}
                    alt={course.title}
                    borderRadius="md"
                    boxSize={{ base: '100%', md: '150px' }}
                    objectFit="cover"
                    mr={4}
                />
                <Box flex="1">
                    <Text fontWeight="bold" mt={2} fontSize="lg">
                        <Link href={`https://www.udemy.com${course.url}`} isExternal color="teal.500">
                            {course.title}
                        </Link>
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt={2}>
                        {course.headline}
                    </Text>
                    <Tag mt={2} colorScheme={course.is_paid ? 'red' : 'green'}>
                        <TagLabel>{course.is_paid ? 'Paid' : 'Free'}</TagLabel>
                    </Tag>
                    <Text mt={2} fontSize="lg" fontWeight="bold">
                        {course.price}
                    </Text>
                </Box>
            </Flex>
        </Box>
    ))}
</VStack>
                            </Box>
                        )}
                    </VStack>
                </Box>
            )}
        </Box>
    );
}
