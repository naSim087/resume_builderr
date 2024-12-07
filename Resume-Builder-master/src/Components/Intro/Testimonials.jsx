import React from 'react';
import { useColorModeValue } from '@chakra-ui/react'; // Import Chakra UI hook

const testimonials = [
  {
    name: "N. Elnour",
    feedback:
      "This is really a thank you for Reactive Resume. Drafting resumes was never a strength of mine, so your app really made the whole process easy and smooth!",
  },
  {
    name: "S. Bhaije",
    feedback:
      "Hi Amruth! First off, many thanks for making RxResume! This is one of the best resume-building tools I have ever found. Have also recommended it to many of my university friends...",
  },
  {
    name: "K. Lietzau",
    feedback:
      "Hi, I just found your resume builder, and I just want to say, I really appreciate it! The moment I saw it was open source, I closed all the other CV sites I was considering. Thank you for your service.",
  },
  {
    name: "R. Sinnot",
    feedback:
      "Hey, Just wanted to let you know you not only helped me get a job, you helped my partner and my childhood friend, who then used your site to help one of her friends get a job. I sponsored you on Github to give back a bit but I wanted to let you know you really made a difference with your resume builder.",
  },
  {
    name: "P. Jignesh",
    feedback:
      "Hey, I am a Mechanical engineer, not understand coding, messy AI, and computer systems, But wait, what drags me here is your creativity, Your website RxResume is all good! using it and the efforts you made to keep this free is remarkable. keeping doing great work.",
  },
  {
    name: "A. Rehman",
    feedback:
      "Hey Amruth, I have loved your Reactive Resume Website. Thank you so much for making this kind of thing.",
  },
  {
    name: "S. Innocent",
    feedback:
      "First of all, I appreciate your effort for making reactive resume a free tool for the community. Very much better than many premium resume builder...",
  },
  {
    name: "M. Fritza",
    feedback:
      "Hello sir, I just wanted to write a thank you message for developing RxResume. It's easy to use, intuitive and it's much more practical than many others that made you pay up after spending an hour to create your CV. I'll be sure to buy you a coffee after I get my first job. I wish you everything best in life!",
  },
];

const Testimonials = () => {
  // Use Chakra UI's useColorModeValue hook for dynamic styling
  const backgroundColor = useColorModeValue('#ffffff', '#2d3748'); // White for light, dark gray for dark mode
  const textColor = useColorModeValue('#222', '#e2e8f0'); // Dark text for light mode, light text for dark mode
  const cardBgColor = useColorModeValue('#f9fafb', '#4a5568'); // Light background for cards in light mode, dark for dark mode
  const cardTextColor = useColorModeValue('#555', '#edf2f7'); // Gray for feedback text in light, light for dark

  return (
    <div style={{ ...styles.testimonialsPage, background: backgroundColor }}>
      <div style={styles.testimonialsContainer}>
        <h2 style={{ ...styles.header, color: textColor }}>What Our Users Say</h2>
        <div style={styles.testimonialsList}>
          {testimonials.map((testimonial, index) => (
            <div
              style={{
                ...styles.testimonialCard,
                background: cardBgColor,
                color: cardTextColor,
              }}
              key={index}
            >
              <p style={styles.testimonialFeedback}>“{testimonial.feedback}”</p>
              <p style={styles.testimonialName}>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  testimonialsPage: {
     padding: "10px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  testimonialsContainer: {
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    // width: "80%",
    maxWidth: "1200px",
    textAlign: "center",
  },
  header: {
    fontSize: "36px",
    marginBottom: "30px",
  },
  testimonialsList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  testimonialCard: {
    padding: "25px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "280px",
    textAlign: "left",
    transition: "transform 0.3s ease",
  },
  testimonialFeedback: {
    fontStyle: "italic",
    marginBottom: "15px",
  },
  testimonialName: {
    fontWeight: "bold",
  },
};

export default Testimonials;