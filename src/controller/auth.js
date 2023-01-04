const User = require('../models/user')
const bcrypt = require('bcrypt')
const generateToken = require('../config/generateToken')


const registerUser = async(req , res) => { 
    try {

        const {name , email , password , isAdmin} = req.body;

     
        // checking 
        
        if(!name || !email || !password ){
            return res.json({
                "status" :"false", 
                "message" : "please enter all input fields.."
            })
        }

        // check if already exist in DB
        return res.json({
            "test_1" : {
                name , 
                email , 
                password , 
                isAdmin
            }
        })
        const user_exist = await User.findOne({email});

        if(user_exist){

            return res.status(400).json({
                "status" : "false" , 
                "message" :"user with this email already exist"
            })
            
        }
        return res.json({
            "test2" : {
                name , 
                email , 
                password , 
                isAdmin
            }
        })

        let hashedPassword = await bcrypt.hash(password , 2)
        return res.json({
            "test3" : {
                name , 
                email , 
                password , 
                isAdmin
            }
        })
        // create user
        const user = await User.create({
            name , 
            email ,
            password : hashedPassword , 
            isAdmin , 
        })
        
        let user_token = generateToken(user._id)

        if(user){

            console.log("user " , user)
            
            return res.status(201).json({
                "status" :"true" ,
                "message" : "user created successfully",
                "data" : user , 
                "token" : user_token
            })
        }else{
            return res.status(400).json({
                "status" :"false" ,
                "message" : "Failed to register user "
            })
        }
    } catch (error) {
        return res.status(400).json({
            "status" :"false" ,
            "message" : "Failed to register user "
        })        
    }

}

const loginUser = async(req , res) => {

    try {
       
        const {email , password} = req.body 

        // checking 
        
        if(!email || !password ){
            return res.json({
                "status" :"false", 
                "message" : "missing all input fields.."
            })
        }        

        const user_exist = await User.findOne({email})

        if(user_exist && (await bcrypt.compare(password , user_exist.password))){

            return res.json({
                "status" : "true" , 
                "message" : {
                    data : user_exist , 
                    token : generateToken(user_exist._id)
                }
            })
            
        }else{
            throw "email or password incorrect"
        }


        
    } catch (error) {
        res.json({
            "status" :"false" ,
            "message" : error
        })
    }

}


const Auth = {
    registerUser , 
    loginUser 
} 

module.exports = Auth