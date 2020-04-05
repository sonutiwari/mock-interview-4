homeController = {}

homeController.home = (req, res) => {
    return res.status(200).render('home');
}

module.exports = homeController;
