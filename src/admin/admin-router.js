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

    console.log(category)
    try {
      if(req.user.admin) {
        await AdminService.postCategory(
          req.app.get('db'),
          category
        )
          
        res.send({
          status: `category '${category}' created`
        })
      } else {
        res.status(400).json({
          error: 'Not an admin'
        })
      }
    } catch (error) {
      next(error)
    }
  })
//   .delete('/category', async (req, res, next) => {
//     try {

//     } catch (error) {
//       next(error)
//     }
//   })
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