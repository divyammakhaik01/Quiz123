const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    } , 
    email : {
        type : String , 
        require : true,
        unique : true
    } , 
    password : {
        type : String , 
        require : true
    } , 
    isAdmin : {
        type : Boolean , 
        require : true
    } , 
    url: [
        { type: mongoose.Schema.ObjectId, ref: "url_list" }
    ],
})


module.exports = mongoose.model('User' , user_schema)