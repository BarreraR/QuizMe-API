const express = require('express')
const QuizService = require('./quiz-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json()

const quizRouter = express.Router()

// quizRouter 
//   .use(requireAuth)
//   .use(async (req, res, next) => {
//     try {
//       const quiz = await QuizService.getQuiz(
//         req.app.get('db'),
//         req.user.id,
//       )

//       if(!quiz){
//         return res.status(404).json({
//           error: `You don't have any quizzes`,
//         })
//       }
      
//       req.quiz = quiz
//       next()
//     } catch (error) {
//       next(error)
//     }
//   })

quizRouter
  .get('/', async (req, res, next) => {
    try {
      const questions = await QuizService.getQuestions(
        req.app.get('db'),
        // req.user.id,
        // 1,
      )

      res.json({
        questions
      })
      next()
    } catch (error) {
      next(error)
    }
  })

  module.exports = quizRouter