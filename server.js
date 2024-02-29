
const cors = require("cors");
const morgan = require("morgan");
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./DataBase/db.js')
//const bodyParser = require("body-parser")
//const fileUpload = require('express-fileupload');
const multer = require("multer")


//env config
dotenv.config();

//route import
const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes.js');


//DB-connection
connectDB();

//res object
const app = express();



//middelwares
//app.use(fileUpload());

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
//app.use(bodyParser.urlencoded({ extended: true }))





//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//server connection
const PORT = process.env.PORT



app.listen(PORT, () => {
    console.log(`Server is running successfully! ${PORT}`)
});