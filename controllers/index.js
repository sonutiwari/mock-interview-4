let filesModel = require('../models/files.schema');
let csv  = require('csvtojson');
let BASE_URL = "C:\\Users\\sonutiwari\\Documents\\cn\\mock-interview-4\\uploads\\";
let homeController = {}
let data = null;
let keys = null;
let files = null;
let file_name = null;
homeController.home = async (req, res) => {
    try {
        files = await filesModel.find({});
    } catch (error) {
        return res.status(200).render('home', {
            data: data,
            keys: keys,
            files: files,
            file_name: file_name
        });
    }
    return res.status(200).render('home', {
        data: data,
        keys: keys,
        files: files,
        file_name: file_name
    });
}


homeController.uploadThisFile = async (req, res) => {
    let fileName = req.params.filename;
    file_name = fileName;
    let filePath = BASE_URL + fileName;
    csv().fromFile(filePath).then(obj => {
        keys = Object.keys(obj[0]);
        data = obj;
        res.redirect('back');
    });
}

homeController.uploadFile = async (req, res) => {
    file_name = req.file.file_name;
    let document = new filesModel({
        file_name: req.file.filename
    });
    try {
        await document.save();
        var fullpath = BASE_URL + req.file.filename;
        csv().fromFile(fullpath).then(obj => {
            keys = Object.keys(obj[0]);
            data = obj;
            res.redirect('back');
        });
    } catch (error) {
        return res.redirect('back');
    }
}

homeController.search = async (req, res) => {
    let searchTerm = req.body.searchTerm;
    searchTerm = searchTerm.toLowerCase();
    console.log("Search term: ", searchTerm);
    ans = [];
    if (data != null) {
        data.forEach(item => {
            let str = item[keys[1]];
            str = str.toLowerCase();
            if(str.indexOf(searchTerm) != -1){
                ans.push(item);
            }
        })
    }
    return res.status(200).render('home', {
        data: ans,
        keys: keys,
        files: files,
        file_name: file_name
    });
}
module.exports = homeController;
