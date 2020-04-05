let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
    file_name: { type: String, unique: true }
}, { timestamps: true } );

let filesModel = mongoose.model("Files", fileSchema);

module.exports = filesModel;
