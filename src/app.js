const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./middleware/error-handler')
const authRouter = require('./auth/auth-router')
const quizRouter = require('./quiz/quiz-router')
// const adminRouter = require('./admin/admin-router')
const userRouter = require('./user/user-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)
// app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.use(errorHandler)

module.exports = app
