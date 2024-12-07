
const Company=require('../models/company')

exports.getRoles=async (req,res)=>{

  const { company } = req.query; // Get the company name from the query parameters

  if (!company) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  try {
    const companyData = await Company.findOne({ name: company }); // Find the company by name

    if (!companyData) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ roles: companyData.roles }); // Return the roles associated with the company
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

}