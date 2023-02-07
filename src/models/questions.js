const mongoose = require("mongoose");

const questions_scheme = mongoose.Schema({
  question_name: {
    type: String,
    require: true,
  },
  options: [{ type: String }],
  answers: [{type : String}],
  level: {
    type: String,
    require: true,
  },
  quiz_name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Questions", questions_scheme);
