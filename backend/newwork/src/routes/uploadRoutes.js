// // const express = require('express')
// // const router = express.Router()
// // const multer=require('multer')

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //       cb(null, "public/images");
// //     },
// //     filename: (req, file, cb) => {
// //       cb(null, req.body.name);
// //     },
// //   });
// // const upload = multer({ storage: storage });


// // router.post("/",(req,res,next)=>{
// //   console.log("hi");
// //   next();
// // }, upload.single("file"), (req, res) => {
// //     try {
// //       return res.status(200).json("File uploded successfully");
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   });
// // module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const router = express.Router();





// const uploadDir = path.join(process.cwd(), 'images');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); 
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     console.log(uniqueName);
//     cb(null, uniqueName); 
//   },
// });

// const upload = multer({ storage });

// // Route to handle file upload
// router.post('/public/images',upload.single('file'), (req, res,next) => {
//   const filePath = `uploads/${req.file.filename}`;
//   console.log(filePath);
//   next();
  
// });

// module.exports = router;

const  express =require( 'express');
const router = express.Router()
const multer =require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });


router.post("/", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;