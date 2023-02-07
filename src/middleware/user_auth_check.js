require("dotenv").config();
const jwt = require('jsonwebtoken');
const user = require("../models/user");


module.exports = async(req , res , next) => {

    try {
        const token = JSON.parse(req.header("token"));
        console.log("----------->>>>>>>>>>>>>>>>>>> "  , token);

        if(!token){
            return res.status(401).json({
                status : "false" , 
                "message" : "Access Denied "
            })
        }
        console.log("-=================================")
        const verify_token = jwt.verify(token , process.env.JWT_SECRET);
        console.log(verify_token);

        const admin_check = await user.findOne({_id : verify_token.id})
        if(admin_check.isAdmin === false){
            next()
        }else{
            return res.json({
                "status" : "False" , 
                "message" : "Not authorized"
            })
        }
    } catch (error) {
        res.json({
            "status" : "false",
            "error" : error
        })
    }

}