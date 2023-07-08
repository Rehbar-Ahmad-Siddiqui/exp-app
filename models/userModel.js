const mongoose = require('mongoose');

//schema design
const userSchema = new mongoose.Schema({
     name:{
        type: String,
        required: [true, 'name is required']
     },
     email: {
        type: String,
        required: [true, 'email is required & should be unique'],
        unique: true
     },
     password: {
        type: String,
        required: [true, 'password is required']
     }
},
{ timestamps: true } // timestamps is used to record the date and time when this information is created
);

//export
// mongoose.model is used to tell that userModel is of Mongoose Type Model & userSchema is used to create the schema for this model.
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
