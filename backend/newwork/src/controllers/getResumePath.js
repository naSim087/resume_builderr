const Resume = require('../models/resume');

exports.getResumePath=async (req,res)=>{
  const { company, role } = req.query;

  try {
      const resume = await Resume.findOne({ company, role });

      if (!resume) {
          return res.status(404).json({ error: 'Resume not found' });
      }

      res.json({ pdfPaths: resume.resumeFilePath });
  } catch (error) {
      console.error('Error fetching resume path:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
