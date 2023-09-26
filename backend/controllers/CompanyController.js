import CompanyModel from "../models/Company.js";

class CompanyController{

    // register company
 static registerCompany = async (req, res) => {

  const {  companyName, email, password, phone , trucks, loaders, services} = req.body;
  try {
    const newCompany = new CompanyModel({
      companyName,
      email,
      password,
      phone,
      trucks,
      loaders,
      services,
      
    });

   const result = await newCompany.save();
  console.log('company regsitered')
    res.status(201).json({
      success: true,
      message: `company registered`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `can't register`,
      error: error.message
    });
  }
};

// get all companies
static getAllCompanies = async (req, res) =>{
    try {
      const result = await CompanyModel.find()
      console.log(result)
      res.send(result)
    } catch (error) {
      console.log(error)
    }
}
}

export default CompanyController