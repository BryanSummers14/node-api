var express = require('express');

module.exports = function() {
    var authController = require('../controllers/userController');
    var authRouter = express.Router();
    authRouter.route('/register')
        .post(authController.register);
    authRouter.route('/login')
        .post(authController.sign_in);

    return authRouter;
}