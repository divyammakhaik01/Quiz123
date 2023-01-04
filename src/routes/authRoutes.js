const express = require('express')
const router = express.Router();
const Auth = require('../controller/auth')


router.route('/register')
        .post(Auth.registerUser)
        

router.route('/login')
        .post(Auth.loginUser)

module.exports = router