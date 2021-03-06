const express = require('express');
const router = express.Router();
let db = require('../config/index');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".csv")
    }
  })
   
  var upload = multer({ storage: storage })

const homeController = require('../controllers/index');
router.get('/', homeController.home);
router.get('/:filename', homeController.uploadThisFile);
router.post('/search/', homeController.search);
router.get('/sort/:index', homeController.sort);
router.post('/upload_file', upload.single('myFile'), homeController.uploadFile);
router.get('/*', (req, res) => {
    return res.status(404).send('<h1>404 Not found</h1>');
})
module.exports = router;
