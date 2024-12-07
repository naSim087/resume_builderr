import { Box, chakra, Container, Stack, Text, Link, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaReact, FaJsSquare, FaNode, FaDatabase } from 'react-icons/fa';

// SocialButton Component for Icon Buttons
const SocialButton = ({ children, label, href }) => {
    return (
        <chakra.button
            bg={useColorModeValue('gray.50', 'gray.700')}
            rounded={'full'}
            w={12}
            h={12}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease, transform 0.3s ease'}
            _hover={{
                bg: useColorModeValue('gray.200', 'gray.600'),
                transform: 'scale(1.1)',
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

// SkillIcon Component for displaying each skill with icons
const SkillIcon = ({ label, icon }) => {
    return (
        <Box
            textAlign="center"
            p={4}
            bg={useColorModeValue('gray.100', 'gray.800')}
            borderRadius="md"
            shadow="md"
            _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}>
            {icon}
            <Text mt={2} fontSize="sm" fontWeight="bold">
                {label}
            </Text>
        </Box>
    );
};

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            py={10}
            mt={10}>
            <Container
                as={Stack}
                maxW={'6xl'}
                direction={{ base: 'column', md: 'row' }}
                spacing={6}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>

                {/* Contact & Skills */}
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={8}
                    align={{ base: 'center', md: 'flex-start' }}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>
                            Contact Us
                        </Text>
                        <Stack direction="column" spacing={4} align="left">
                            <Link href="nasimsheikh688@gmail.com">
                                <chakra.button
                                    bg={useColorModeValue('gray.100', 'gray.700')}
                                    _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                                    display="flex"
                                    alignItems="center"
                                    w="fit-content">
                                    <FaEnvelope size="20" />
                                    <Text ml={2} fontSize="sm">
                                        nasimsheikh688@gmail.com
                                    </Text>
                                </chakra.button>
                            </Link>
                            <Link href="tel:+918209452184">
                                <chakra.button
                                    bg={useColorModeValue('gray.100', 'gray.700')}
                                    _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                                    display="flex"
                                    alignItems="center"
                                    w="fit-content">
                                    <FaPhone size="20" />
                                    <Text ml={2} fontSize="sm">
                                        +91 8109 341 954
                                    </Text>
                                </chakra.button>
                            </Link>
                        </Stack>
                    </Box>

                    {/* Technologies Showcase */}
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>
                            Technologies
                        </Text>
                        <Stack direction="row" spacing={6} wrap="wrap" justify="center">
                            <SkillIcon label="React" icon={<FaReact size="30" />} />
                            <SkillIcon label="JavaScript" icon={<FaJsSquare size="30" />} />
                            <SkillIcon label="Node.js" icon={<FaNode size="30" />} />
                            <SkillIcon label="MongoDB" icon={<FaDatabase size="30" />} />
                        </Stack>
                    </Box>
                </Stack>

                {/* Social Links */}
                <Stack direction={'row'} spacing={6} justify={'center'}>
                    <SocialButton label={'Github'} href={'https://github.com/naSim087'}>
                        <FaGithub size="24" color={useColorModeValue('#333', '#fff')} /> {/* Explicitly set color */}
                    </SocialButton>
                    <SocialButton
                        label={'LinkedIn'}
                        href={'https://www.linkedin.com/in/krishna-khandelwal-17712524b/'}>
                        <FaLinkedin size="24" color={useColorModeValue('#0e76a8', '#fff')} /> {/* Explicit LinkedIn color */}
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'https://www.instagram.com'}>
                        <FaInstagram size="24" color={useColorModeValue('#E1306C', '#fff')} /> {/* Instagram pink */}
                    </SocialButton>
                </Stack>
            </Container>

            {/* Footer Note */}
            <Box pt={6}>
                <Text
                    fontSize="sm"
                    textAlign="center"
                    color={useColorModeValue('gray.500', 'gray.400')}>
                    © 2024 Resume Builder, All rights reserved.
                </Text>
            </Box>
        </Box>
    );
}