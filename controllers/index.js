let filesModel = require('../models/files.schema');
let csv  = require('csvtojson');
homeController = {}

homeController.home = (req, res) => {
    return res.status(200).render('home');
}

homeController.uploadFile = async (req, res) => {
    console.log(req.file);
    let document = new filesModel({
        file_name: req.file.filename
    });
    try {
        await document.save();
        var fullpath = "C:\\Users\\sonutiwari\\Documents\\cn\\mock-interview-4\\uploads\\" + req.file.filename;
        console.log(fullpath);
        csv().fromFile(fullpath).then(obj => {
            console.log(obj);
            res.redirect('back');
        })
    } catch (error) {
        return res.redirect('back');
    }
}
module.exports = homeController;
