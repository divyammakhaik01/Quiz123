const mongoose = require('mongoose')

const url_list_scheme = mongoose.Schema({
    url : {
        type : String , 
        require : true 
    } , 
    quiz_name : {
        type : String , 
        require : true
    } ,
    questions: [
        { type: mongoose.Schema.ObjectId, ref: "questions" }
    ],
    isActive :{
        type : Boolean,
        require : true
    }
})


module.exports = mongoose.model('Url_list' , url_list_scheme)
