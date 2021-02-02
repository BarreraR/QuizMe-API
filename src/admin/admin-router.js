const express = require('express')
const AdminService = require('./admin-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json()

const adminRouter = express.Router()

adminRouter
  .use(requireAuth)
  .post('/category', bodyParser, async (req, res, next) => {
    const { category } = req.body

    if(category == null) return res.status(400).json({
      error: `Missing 'category' in request body`
    })

    try {
      if(!req.user.admin){
        return res.status(400).json({
          error: 'Not an admin'
        })
      }

      const hasCategory = await AdminService.hasCategory(
        req.app.get('db'),
        category
      )

      if(hasCategory)
        return res.status(400).json({ error: 'Category already exists'})

      const data = await AdminService.postCategory(
        req.app.get('db'),
        category
      )

      res.send({
        category: data[0]
      })
      
    } catch (error) {
      next(error)
    }
  })
  .delete('/category', bodyParser, async (req, res, next) => {
    const { id } = req.body

    if(id == null) return res.status(400).json({
      error: `Missing 'id' in request body`
    })
    
    try {
      if(!req.user.admin){
        return res.status(400).json({
          error: 'Not an admin'
        })
      }

      const hasCategoryId = await AdminService.hasCategoryId(
        req.app.get('db'),
        id
      )

      if(!hasCategoryId)
        return res.status(400).json({ error: `Category with Id '${id}' does not exist`})
      
      await AdminService.deleteCategory(
        req.app.get('db'),
        id
      )
          
      res.send({
        status: `Category with id '${id}' deleted`
      })
    } catch (error) {
      next(error)
    }
  })
  .put('/category', bodyParser, async (req, res, next) => {
    const { id, category } = req.body
    const categoryData = { id, category }

    for (const [key, value] of Object.entries(categoryData)){
      if(value == null) return res.status(400).json({
        error: `Missing '${key}' in request body`
      })
    }

    try {

      if(!req.user.admin){
        return res.status(400).json({
          error: 'Not an admin'
        })
      }

      const hasCategoryId = await AdminService.hasCategoryId(
        req.app.get('db'),
        id
      )

      if(!hasCategoryId)
        return res.status(400).json({ error: `Category with Id '${id}' does not exist`})

      await AdminService.putCategory(
        req.app.get('db'),
        categoryData
      )

      res.send({
        status: `Category with id '${id}' updated`
      })
        
    } catch {
      next(error)
    } 
  })

adminRouter  
  .post('/question', bodyParser, async (req, res, next) => {
    const { question, answer1, answer2, answer3, answer4, correct, category_id } = req.body
    const newQuestion = { question, answer1, answer2, answer3, answer4, correct, category_id }  

    for (const [key, value] of Object.entries(newQuestion)){
      if(value == null) return res.status(400).json({
        error: `Missing '${key}' in request body`
      })
    }

    try {
      if(!req.user.admin){
        return res.status(400).json({
          error: 'Not an admin'
        })
      }

      await AdminService.postQuestion(
        req.app.get('db'),
        newQuestion
      )
          
      res.send({
        status: `Question created`
      })
      
    } catch (error) {
      next(error)
    }
  })
  .delete('/question', bodyParser, async (req, res, next) => {
    const { id } = req.body

    if(id == null) return res.status(400).json({
      error: `Missing 'id' in request body`
    })
    
    try {
      if(!req.user.admin){
        return res.status(400).json({
          error: 'Not an admin'
        })
      }

      const hasQuestionId = await AdminService.hasQuestionId(
        req.app.get('db'),
        id
      )

      if(!hasQuestionId)
        return res.status(400).json({ error: `Question with Id '${id}' does not exist`})

      await AdminService.deleteQuestion(
        req.app.get('db'),
        id
      )
          
      res.send({
        status: `Question with id '${id}' deleted`
      })
    } catch (error) {
      next(error)
    }
  })
  .put('/question', bodyParser, async (req, res, next) => {
    const { question, answer1, answer2, answer3, answer4, correct, category_id, id } = req.body
    const questionData = { question, answer1, answer2, answer3, answer4, correct, category_id, id }  
    
    for (const [key, value] of Object.entries(questionData)){
      if(value == null) return res.status(400).json({
        error: `Missing '${key}' in request body`
      })
    }

    try {
      if(!req.user.admin){
        return res.status(400).json({
          error: 'Not an admin'
        })
      }

      const hasQuestionId = await AdminService.hasQuestionId(
        req.app.get('db'),
        id
      )

      if(!hasQuestionId)
        return res.status(400).json({ error: `Question with Id '${id}' does not exist`})      

      await AdminService.putQuestion(
        req.app.get('db'),
        questionData
      )
  
      res.send({
        status: `Question with id '${id}' updated`
      })  

    } catch(error) {
      next(error)
    } 
  })

module.exports = adminRouter