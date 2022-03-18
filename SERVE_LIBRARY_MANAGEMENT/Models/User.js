const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    role: String,
    sex: String,
    image: String,
    dob: Date
    
});
module.exports = mongoose.model("User",userSchema);