const mongoose = require ("mongoose");

const countSchema = new mongoose.Schema({
    month: Number,
    borrow: Number,
    return: Number
});
module.exports = mongoose.model("Count",countSchema);