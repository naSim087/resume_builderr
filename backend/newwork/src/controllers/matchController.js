const fs = require('fs');
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OPENAIKEY } = require('../config/serverconfig');

const genAI = new GoogleGenerativeAI(OPENAIKEY);

const matchJobWithResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!jobDescription || !resumeFile) {
      return res.status(400).json({ message: 'Job description and resume file are required' });
    }

    const dataBuffer = fs.readFileSync(resumeFile.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const prompt = `
      Based on the given job description and resume text, analyze the following aspects:

      1. Identify **software-technology-related** skills, tools, or keywords missing from the resume.
      2. Perform **sentiment analysis** on the job description to determine how strict or flexible it is regarding the required skills and experience.
      3. Analyze **soft skills**, including:
         - Years of experience: Calculate based on the resume's graduation year or earliest work experience.
         - Internships: Check if internships or relevant project experience are mentioned.
         - Other soft skills like leadership, teamwork, or communication if explicitly required in the job description.

      Adjust the match percentage as follows:
      - Deduct **15%** if no relevant internships are mentioned in the resume and the job description emphasizes internships or previous roles.
      - Deduct **10%** if the resume lacks sufficient years of experience (calculate from graduation year or first job/project).
      - Add **10%** if the job description is flexible (e.g., uses "preferred" or "nice to have") instead of strict (e.g., uses "must have" or "mandatory").
      - Set a base match percentage of **20%** if no skills align, adjusted for sentiment and soft skills.

      Provide the response **only** in the following format:

      Missing Keywords: [list all **missing technology-related keywords**]
      Missing Soft Skills: [list missing soft skills such as internships, experience, or specific soft skills mentioned in the job description]
      Sentiment: [strict, flexible, or neutral]
      Adjusted Match Percentage: [calculate the final percentage based on skills, soft skills, and sentiment analysis]
      Remark: [Provide a detailed and actionable remark, mentioning how well the resume aligns and areas for improvement, especially in technical and soft skills.]

      Job Description: ${jobDescription}
      Resume Text: ${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt]);
    const responseText = result.response.text().trim();

    const missingKeywordsRegex = /Missing Keywords:\s*(.*)/i;
    const missingSoftSkillsRegex = /Missing Soft Skills:\s*(.*)/i;
    const sentimentRegex = /Sentiment:\s*(strict|flexible|neutral)/i;
    const matchPercentageRegex = /Adjusted Match Percentage:\s*([\d.]+)%/i;
    const remarkRegex = /Remark:\s*(.*)/i;

    const missingKeywordsMatch = missingKeywordsRegex.exec(responseText);
    const missingSoftSkillsMatch = missingSoftSkillsRegex.exec(responseText);
    const sentimentMatch = sentimentRegex.exec(responseText);
    const matchPercentageMatch = matchPercentageRegex.exec(responseText);
    const remarkMatch = remarkRegex.exec(responseText);
    // console.log(missingSoftSkillsMatch)
    const missingKeywords = missingKeywordsMatch
      ? missingKeywordsMatch[1].split(',').map(keyword => keyword.trim())
      : [];
    const missingSoftSkills = missingSoftSkillsMatch
      ? missingSoftSkillsMatch[1].split(',').map(skill => skill.trim())
      : [];
      // console.log(missingSoftSkillsMatch);
    const sentiment = sentimentMatch ? sentimentMatch[1] : 'neutral';
    const matchPercentage = matchPercentageMatch
      ? parseFloat(matchPercentageMatch[1])
      : 0;
    const remark = remarkMatch ? remarkMatch[1].trim() : 'No specific remarks available';

    fs.unlinkSync(resumeFile.path);

    res.status(200).json({
      message: 'Match analysis completed successfully',
      data: {
        matchPercentage: `${matchPercentage}%`,
        missingKeywords,
        missingSoftSkills,
        remark
      }
    });
  } catch (error) {
    console.error('Error processing the match analysis:', error);

    res.status(500).json({
      message: 'Error processing the match analysis',
      error: error.message || 'Unknown error'
    });
  }
};

module.exports = matchJobWithResume;
