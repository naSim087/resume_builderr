const express = require('express');
const router = express.Router();

const {getRelevantData}=require('../controllers/getinfoController')

router.get('/relevant', getRelevantData);
module.exports=router;
