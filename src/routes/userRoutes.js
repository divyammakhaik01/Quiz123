const express = require('express')
const router = express.Router();
const user_auth_check= require('../middleware/user_auth_check')
const user  = require('../controller/user')


//    /getQuestions

router.get('/:id' ,user_auth_check , user.getQuestion )




module.exports = router