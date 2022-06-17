const mongoose = require ("mongoose");

const returnSchema = new mongoose.Schema({
    
    idBook: String,
    title: String,
    idUser: String,
    name: String,
    dateBorrow: Date,
    dateDue: Date,

    idBorrow: String,
    dateReturn: Date,
    fine: Number,
    note: String
});
module.exports = mongoose.model("Return",returnSchema);