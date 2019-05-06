const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuizSchema = new Schema({
  questions:Object,
  userId: { type: Schema.Types.ObjectId, ref:"User"} //String
})

const Quizrity = mongoose.model('Quizrity', QuizSchema)

module.exports = Quizrity;
