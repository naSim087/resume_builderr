
 const resumeController = require('../controllers/resumeController');

 const authenticate = require('../Middleware/authMiddleware');


const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();





const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    const uniqueName = `${Date.now()}-${file.originalname}`;
    console.log(uniqueName);
    cb(null, uniqueName); 
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/submit',authenticate ,upload.single('file'), (req, res,next) => {
  const filePath = `uploads/${req.file.filename}`;
  next();
  
},resumeController.uploadResume);

module.exports = router;