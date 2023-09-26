import  express  from "express";
import connectDB from "./db/connectdb.js";
import cors  from "cors";
import dotenv from 'dotenv'
dotenv.config()
import Companyrouter from "./routes/companyroute.js";
const app = express();
import bodyParser from "body-parser";
 import schedulerouter from './routes/schedule.js'
import router from "./routes/userouter.js";

// configure the app to use body-parser to parse JSON data
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT 
const DATABASE_URI = process.env.DATABASE_URI ;

app.use(express.urlencoded({extended: false}));
app.use(express.json())
connectDB(DATABASE_URI);
// load routes
app.use('/api', Companyrouter)
app.use('/api', Companyrouter)
app.use('/api', schedulerouter)
app.use('/api', router)

app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})
