const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
// const fileURLToPath = require('url');
const connectDb = require('./config/connectDb'); // import statement for database connection

// config dot env file
dotenv.config();

//database calling which was created in connectDb.js
connectDb();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//routes
//user Routes
app.use('/api/v1/users', require("./routes/userRoute"));
//transaction Routes
app.use('/api/v1/transactions', require("./routes/transactionRoutes"));


//static files - write only at the time of deploymnet ( deploymnet code)
app.use(express.static(path.join(__dirname, "./client/bluid"))); 

app.get('*', function (req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


//port 
const PORT = 8080 || process.env.PORT;  //8080 is for development phase & process.env.PORT is for production phase

//listen server
app.listen(PORT, () => {
   console.log(`Server running on port : ${PORT}`); 
});