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

      
      await AdminService.postCategory(
        req.app.get('db'),
        category
      )
          
      res.send({
        status: `category '${category}' created`
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
        return res.status(400).json({ error: 'Category Id does not exist'})

      
      await AdminService.deleteCategory(
        req.app.get('db'),
        id
      )
          
      res.send({
        status: `category with id '${id}' deleted`
      })
    } catch (error) {
      next(error)
    }
  })
//   .put('/category', async (req, res, next) => {
//     try {

//     } catch {
//       next(error)
//     } 
//   })

// adminRouter  
//   .post('/question', async (req, res, next) => {
//     // const {  }
//     try {
      
//     } catch (error) {
//       next(error)
//     }
//   })
//   .delete('/question', async (req, res, next) => {
//     try {

//     } catch (error) {
//       next(error)
//     }
//   })
//   .put('/question', async (req, res, next) => {
//     try {

//     } catch {
//       next(error)
//     } 
//   })

module.exports = adminRouter