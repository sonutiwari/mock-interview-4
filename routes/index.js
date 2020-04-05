const express = require('express');
const router = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

const homeController = require('../controllers/index');
router.get('/', homeController.home);
router.post('/upload_file', upload.single('myFile'), homeController.uploadFile);
router.get('/*', (req, res) => {
    return res.status(404).send('<h1>404 Not found</h1>');
})
module.exports = router;
