import  express  from "express";
import CompanyController from "../controllers/CompanyController.js";

const Companyrouter  = express.Router()
Companyrouter.post('/companies/register', CompanyController.registerCompany)

Companyrouter.get('/companies', CompanyController.getAllCompanies)

export default Companyrouter