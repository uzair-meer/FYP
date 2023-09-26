import  express  from "express";
import UserController from "../controllers/User.js";
const router  = express.Router()

router.post('/register/user', UserController.createUser)
router.post('/login/user', UserController.userLogin)

export default router

