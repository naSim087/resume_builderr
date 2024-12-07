const Company=require('../models/company')

exports.getCompany=async (req,res)=>{
  try {
    const companies = await Company.find({}, 'name roles');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch companies', error });
  }
}