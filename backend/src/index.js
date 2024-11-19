const express = require('express');
const mongoose = require('mongoose');
const resumeRoutes = require('./routes/resumeRoutes');
const companyRoutes = require('./routes/companyRoutes');
const getResumeRoutes=require('./routes/getResumeRoutes')
const loinRoutes=require('./routes/loginRoutes')
const {PORT, CONECTIONSTRING}=require('./config/serverconfig')
const infoRoutes=require('./routes/infoRoutes')
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', resumeRoutes);
app.use('/api', companyRoutes);
app.use('/api',infoRoutes);
app.use('/api',getResumeRoutes);
app.use('/api',loinRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(CONECTIONSTRING)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log('Database connection error:', err));



