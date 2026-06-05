const express = require('express')
const router = express.Router()

const postController = require('../controllers/post.controller')
const authenticate = require('../middleware/authenticate')

router.get('/' , postController.getallposts)
router.get('/:id' , postController.getpostbyid)
router.post('/' ,authenticate ,  postController.createPost)

module.exports = router