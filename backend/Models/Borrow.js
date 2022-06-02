const mongoose = require ("mongoose");

const borrowSchema = new mongoose.Schema({
    idBook: String,
    title: String,
    idUser: String,
    name: String,

    dateBorrow: Date,
    status : String,
    dateDue: Date
});
module.exports = mongoose.model("Borrow",borrowSchema);