const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  company: { type: String, required: true, index: true }, 
  role: { type: String, required: true, index: true },    
  languages: [String],  
  projects: [String],   
  resumeFilePath: [String],  
  

  languageCounts: {      
    type: Map,
    of: Number,
    default: {}
  },
  projectCounts: {       
    type: Map,
    of: Number,
    
    default: {}
  }
});


resumeSchema.pre('save', async function(next) {
  const resume = this;
  

  const relatedResumes = await mongoose.model('Resume').find({ company: resume.company, role: resume.role });


  const languageCounts = new Map(resume.languageCounts);
  const projectCounts = new Map(resume.projectCounts);


  relatedResumes.forEach(r => {
    r.languages.forEach(lang => languageCounts.set(lang, (languageCounts.get(lang) || 0) + 1));
    r.projects.forEach(proj => projectCounts.set(proj, (projectCounts.get(proj) || 0) + 1));
  });


  resume.languageCounts = languageCounts;
  resume.projectCounts = projectCounts;

  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
