const mongoose = require ("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    image: String,
    status: Number,
    idBorrower: String,
    kind: String,
    dateCreate: Date
    
});
module.exports = mongoose.model("Book",bookSchema);