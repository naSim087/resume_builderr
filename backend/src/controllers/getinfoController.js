// controllers/resumeController.js
const Resume = require('../models/resume'); // Adjust the path as necessary

// Controller to get relevant languages and projects based on company and role
exports.getRelevantData = async (req, res) => {
  console.log("hello");
  const { company, role } = req.query;

  if (!company || !role) {
    return res.status(400).json({ message: 'Company and role are required.' });
  }

  try {
    // Find resumes that match the company and role
    const resumes = await Resume.find({ company, role });

    if (resumes.length === 0) {
      return res.status(404).json({ message: 'No resumes found for this company and role.' });
    }

    // Calculate language counts
    const languageCounts = {};
    const projectCounts = {};
    
    const PathCounts={};

    resumes.forEach(resume => {
      resume.languages.forEach(lang => {
        languageCounts[lang] = (languageCounts[lang] || 0) + 1;
      });
      resume.projects.forEach(project => {
        projectCounts[project] = (projectCounts[project] || 0) + 1;
      });
      resume.resumeFilePath.forEach(Path => {
        PathCounts[Path] = (PathCounts[Path] || 0) + 1;
      });
    });

    // Sort languages and projects by count
    const sortedLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .map(entry => entry[0]); // Get only the language names

    const sortedProjects = Object.entries(projectCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .map(entry => entry[0]); // Get only the project names

      const sortedPath = Object.entries(PathCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .map(entry => entry[0]); // Get only the project names

    // Send response
    
    res.status(200).json({
      languages: sortedLanguages,
      projects: sortedProjects,
       resumePaths:sortedPath
    });
  } catch (error) {
    console.error('Error fetching relevant data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
