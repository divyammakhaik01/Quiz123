const express = require('express')
const admin_auth_check = require('../middleware/admin_auth_check')
const admin = require('../controller/admin')


const router = express.Router();


router.post('/post_data' , admin_auth_check ,admin.post_data )

router.get('/get_all_url' , admin_auth_check ,admin.get_all_url )

router.patch('/activate_url/:url' , admin_auth_check ,admin.activate_url)

router.patch('/deactivate_url/:url' , admin_auth_check ,admin.deactivate_url)


module.exports = router