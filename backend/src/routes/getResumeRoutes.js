const express = require('express');
const router = express.Router();

const {getResumePath}=require('../controllers/getResumePath')
router.get('/getResumePath',getResumePath);
module.exports=router;