homeController = {}

homeController.home = (req, res) => {
    return res.status(200).render('home');
}

homeController.uploadFile = async (req, res) => {
    console.log(req.file);
    return res.status(200).redirect('back');
}
module.exports = homeController;
