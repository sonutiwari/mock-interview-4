const express = require('express');

const router = express.Router();

const homeController = require('../controllers/index');
router.get('/',homeController.home);
router.get('/*', (req, res) => {
    return res.status(404).send('<h1>404 Not found</h1>');
})
module.exports = router;