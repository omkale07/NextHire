const { register, login, updateProfile, logout } = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { singalUpload } = require('../middlewares/multer');
const express = require('express');

const router = express.Router();


router.route("/register").post(singalUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, singalUpload  , updateProfile);
router.route("/logout").get(logout);

module.exports = router;