const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuizSchema = new Schema({
  questions:Object,
  userId: { type: Schema.Types.ObjectId, ref:"User"} //String
})

const Quizrities = mongoose.model('Quizrities', QuizSchema)

module.exports = Quizrities;
