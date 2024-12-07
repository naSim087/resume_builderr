// routes/companyRoutes.js
const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();
const {getCompany}=require('../controllers/getcompany')
const {getRoles}=require('../controllers/getroles')
const authenticate = require('../Middleware/authMiddleware');
router.post('/addCompany',authenticate ,companyController.addCompany);
router.get('/companies',getCompany);
router.get('/roles',getRoles);
module.exports = router;