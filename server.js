const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
// const fileURLToPath = require('url');
const connectDb = require('./config/connectDb'); // import statement for database connection
const { error } = require('console');

// config dot env file
dotenv.config();

//database calling which was created in connectDb.js
connectDb();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongoose is conncted'))
.catch((err) => console.log(err));

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
app.use('/users', require("./routes/userRoute"));
//transaction Routes
app.use('/transactions', require("./routes/transactionRoutes"));


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