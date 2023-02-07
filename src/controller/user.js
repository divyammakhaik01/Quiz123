const Questions = require("../models/questions");
const url_list = require("../models/url_list");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");






const getQuestion = async(req,res) =>{

    try {

        // check if quiz is active or not

        console.log(req.params)
        let url_id = req.params.id;

        let url = await url_list.findOne({url : url_id})

        if(url.isActive === false){
            return res.json({
                "status" : "false" ,
                "message" : "Not active"
            })
        }

        let questions_id_list = url.questions

        let promises_list = questions_id_list.map(async(question_id)=>{
            return await Questions.findOne({_id : question_id})
        })
        let list_of_questions = []
        let wait = Promise.allSettled(promises_list)
                          .then((result)=>{

                            for(let i = 0 ; i < result.length ; i++){
                                console.log(i , ' ' ,  result[i])
                                if(result[i].status === 'fulfilled'){
                                    list_of_questions.push(result[i].value)
                                }else{
                                    console.log("Rejected : " + result[i].reason);
                                }

                            }
                            
                          })
        wait.then(()=>{
            return res.json({
                "status" :"true" ,
                "message" : list_of_questions
            })
        })
        
    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}





module.exports = {
    getQuestion
}