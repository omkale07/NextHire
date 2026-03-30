const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotEnv = require('dotenv')
const connectDB = require('./utils/db.js');
const userRoute = require('./routes/user.route.js')
const companyRoute = require('./routes/company.route.js')
const jobRoute = require('./routes/job.route.js')
const applicationRoute = require('./routes/application.route.js')
dotEnv.config({})


const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://next-hire-iqnpvh6z6-okale753-4830s-projects.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));


app.get('/home',(req,res)=>{
    return res.status(200).json({
        message:"i am coming from backend",
        success:true
    })
})


const PORT = process.env.PORT || 3000;

//api's

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`app listning on port${PORT}`)
})