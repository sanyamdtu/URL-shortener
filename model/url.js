var mongoose = require("mongoose")
var schema = new mongoose.Schema({
    original_url: String,
    shortened_url: String
})
module.exports = mongoose.model("url_db", schema)