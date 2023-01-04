const Questions = require("../models/questions");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const url_list = require("../models/url_list");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const post_data = async (req, res) => {
  try {
    

   
    const { questions_list: data } = req.body;
    const token = JSON.parse(req.header("token"));
    if (!token) {
      throw {
        status: "false",
        message: "token not found ",
      };
    }

    let list_of_Questions_promises = data.map(async (element) => {
      let opt = [];

      opt.push(element.optionA);
      opt.push(element.optionB);
      opt.push(element.optionC);
      opt.push(element.optionD);

      let ans = [];

      for (let i = 0; i < element.correct_answers.length; i++) {
        ans.push(element.correct_answers[i]);
      }

      return await Questions.create({
        question_name: element.question,
        options: opt,
        answers: ans,
        level: element.level,
        quiz_name: element.quizName,
      });
    });

    let resolved_Questions_promises = Promise.allSettled(list_of_Questions_promises).then((results)=>{
      for (let i = 0; i < results.length; i++) {
        if (results[i].status == "fulfilled") {
          console.log("Resolved :: " + results[i].value);
        } else if (results[i].status == "rejected")
          console.log("Rejected : " + results[i].reason);
      }      
    })

    resolved_Questions_promises.then(async() => {
      let _idList = await Questions.find(
        {
          quiz_name: data[0].quizName,
        },
        {
          new: true,
        }
      );  

      const uniqueID = uuidv4();

      let url_ID = `${uniqueID}`;
  
      let response_url_list =  await url_list.create({
        url: url_ID,
        quiz_name: data[0].quizName,
        questions: _idList,
        isActive: true,
      });

 const user_id = jwt.verify(token, process.env.JWT_SECRET);

 const response_User = await User.findOne({ _id: user_id.id });
          let List_Of_URL = response_User.url;
          List_Of_URL.push(response_url_list._id);
         
          let updated_user = await User.findByIdAndUpdate(
            user_id.id,
            {
              url: List_Of_URL,
            },
            {
              new: true,
            }
          );

              return res.json({
                status: "true",
                message: url_ID,
              });
    })

  } catch (error) {
    console.log("error ", error);
    return res.json({
      status: "False",
      message: error,
    });
  }
};

const get_all_url = async (req, res) => {
  try {

    const token = JSON.parse(req.header("token"));

    const user_id = jwt.verify(token, process.env.JWT_SECRET);

    const _user = await User.findOne({ _id: user_id.id });
    let _id = _user.id;

    const list_of_url = await User.findById(_id);

    let url_data = [];
    //////////////////////////////////////////////////////////////////////////////
    let all_promise = list_of_url.url.map(async (val) => {
      return await url_list.findById({ _id: val });
    });


    let resolvedP = Promise.allSettled(all_promise).then((results) => {
      console.log("results :"  ,results)
      for (let i = 0; i < results.length; i++) {
        if (results[i].status == "fulfilled") {
          console.log("Resolved :: " + results[i].value);
          url_data.push(results[i].value);
        } else if (results[i].status == "rejected")
          console.log("Rejected : " + results[i].reason);
      }
    });
    resolvedP.then(() => {
      return res.json({
        status: "true",
        message: url_data,
      });
    });
    //////////////////////////////////////////////////////////////////////////////
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};

const activate_url = async (req , res) =>{

    try {
   
        
        const {url} = req.params
        
        console.log(url)
        
        const update_url_state = await url_list.findOneAndUpdate({url : url}  , {
            isActive : true
        } , {
            new : true
        })

        console.log(update_url_state);

        return res.json({
            "status" : "true" ,
            "message" :    `${url} is activated `
        })
        
        
    } catch (error) {
        return res.json({
            status: "False",
            message: error,
          });        
    }
    
}
const deactivate_url = async (req , res) =>{


    try {
        
   
        const {url} = req.params
        
        console.log(url)
        
        const update_url_state = await url_list.findOneAndUpdate({url : url}  , {
            isActive : false
        } , {
            new : true
        })

        console.log(update_url_state);

        return res.json({
            "status" : "true" ,
            "message" :    `${url} is deactivated `
        })
        
        
    } catch (error) {
        return res.json({
            status: "False",
            message: error,
          });        
    }
    
}

const admin = {
  post_data,
  get_all_url,
  deactivate_url ,
  activate_url
};

module.exports = admin;
