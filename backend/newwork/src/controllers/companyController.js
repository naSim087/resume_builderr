const Company = require('../models/company');

exports.addCompany = async (req, res) => {
  try {
    const { name, roles } = req.body;

    // Ensure that roles is an array, even if it's a single string
    let roleArray = Array.isArray(roles) ? roles : [roles]; // Convert roles to an array if it's a single string

    // Check if the company already exists
    let company = await Company.findOne({ name });

    if (company) {
      
      console.log('Existing Roles:', company.roles);
      console.log('New Roles:', roleArray);

      const updatedRoles = new Set([...company.roles, ...roleArray]); // Combine and remove duplicates
      company.roles = Array.from(updatedRoles);

      await company.save();
      res.status(200).json({ message: 'Roles added to existing company successfully', company,success:true });
    } else {
      // If the company does not exist, create a new company
      company = new Company({ name, roles: roleArray }); // Make sure roles is passed as an array
      console.log('Creating New Company:', company);
      await company.save();
      res.status(201).json({ message: 'Company and roles added successfully', company,company,success:true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding company', error });
  }
};
