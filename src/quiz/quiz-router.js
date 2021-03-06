const express = require('express')
const QuizService = require('./quiz-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json()

const quizRouter = express.Router()

quizRouter
  .use(requireAuth)
  .get('/', async (req, res, next) => {
    try {
      const quiz = await QuizService.getQuiz(
        req.app.get('db'),
      )

      res.json({
        quiz
      })
      next()
    } catch (error) {
      next(error)
    }
  })

  quizRouter
    .get('/category', async (req, res, next) => {
      try {
        const categories = await QuizService.getCategories(
          req.app.get('db'),
        )
  
        res.json({
          categories
        })
        next()
      } catch (error) {
        next(error)
      }  
    })

  quizRouter 
    .get('/category/:category', async (req, res, next) => {
      const { category } = req.params

      console.log(category)
      try{
        const quiz = await QuizService.getQuizWithCategory(
          req.app.get('db'),
          category,
        )

        res.json({
          quiz
        })

        next()
      } catch (error) {
        next(error)
      }
    })

  quizRouter
    .post('/', bodyParser, async(req, res, next) => {
      let { answered } = req.body
      if(!answered)
        return res.status(400).json({
          error: `Missing 'answered' in request body`,
        })

      try {
        let correct = await QuizService.getCorrectAnswer(
          req.app.get('db'),
          answered.question_id
        )

        correct = correct.correct === answered.answer
        answered['correct'] = correct
        
        await QuizService.postAnswer(
          req.app.get('db'),
          req.user.id,
          answered
        )

        res.json({ correct })

        next()
      } catch (error) {
        next(error)
      }
    })

  quizRouter
    .get('/answers', async (req, res, next) => {
      try {
        const answers = await QuizService.getAnswers(
          req.app.get('db'),
          req.user.id,
        )
  
        res.json({
          answers
        })
        next()
      } catch (error) {
        next(error)
      }
    })

  module.exports = quizRouter