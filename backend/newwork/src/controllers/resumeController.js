

const Resume = require('../models/resume'); 
const path = require('path');
const fs = require('fs');
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
const { OPENAIKEY } = require('../config/serverconfig'); 

const genAI = new GoogleGenerativeAI(OPENAIKEY);

exports.uploadResume = async (req, res) => {
  try {
    const { company, role } = req.body;
    const resumeFile = req.file;  

    if (!resumeFile) {
      return res.status(400).json({ message: 'Resume file is required' });
    }      

    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const prompt = `
      Extract All Language Candidate knows and format the project names and descriptions from the following resume text.
      Format it like:
      Language: [All Language Name Candidate Knows]
      Then Give the asked Details
      Name: [Project Name]
      Description: [Project Description]

      Resume Text:
      ${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([prompt]);
    
    const responseText = result.response.text().trim();
 
    const cleanedText = responseText.replace(/\*/g, "");
    const lines = cleanedText.split('\n').filter(line => line.trim() !== '');

    const projectsMap = {};
    const languagesSet = new Set();

    for (const line of lines) {
      if (line.startsWith('Name:')) {
        const projectName = line.replace('Name:', '').trim();
        const descriptionLine = lines[lines.indexOf(line) + 1] || '';
        const projectDescription = descriptionLine.replace('Description:', '').trim();
        projectsMap[projectName] = projectDescription;
      } else if (line.startsWith('Language:')) {
        const languages = line.replace('Language:', '').trim().split(',').map(lang => lang.trim());
        languages.forEach(lang => languagesSet.add(lang));
      }
    }

    const languagesArray = Array.from(languagesSet);
    const projectsArray = Object.entries(projectsMap).map(([name, description]) => {
      return `${name}: ${description}`;
    });

    const languages = languagesArray;
    const projects = projectsArray; 

    // Check if a resume for this company and role already exists
    let existingResume = await Resume.findOne({ company, role });

    if (existingResume) {
      // If exists, update the languages and projects
      existingResume.languages = [...new Set([...existingResume.languages, ...languages])];
      existingResume.projects = [...new Set([...existingResume.projects, ...projects])];
      existingResume.resumeFilePath = [...new Set([...existingResume.resumeFilePath, resumeFile.path])];
      await existingResume.save();
      res.status(200).json({ message: 'Resume updated successfully', data: existingResume });
    } else {
      // If not, create a new resume record
      const newResume = new Resume({
        company,
        role,
        languages,
        projects,
        resumeFilePath: resumeFile.path
      });
      await newResume.save();
      res.status(201).json({ message: 'Resume uploaded and saved successfully', data: newResume });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume', error });
  }
};

