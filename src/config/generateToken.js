require('dotenv').config();
const jwt = require('jsonwebtoken')

const SECRET = require('./keys')

let secret = SECRET.JWT_SECRET



const  generateToken = (id) =>{
    let token =  jwt.sign({id} , secret , {
        expiresIn : "10d"
    })
    return token
}

module.exports = generateToken
