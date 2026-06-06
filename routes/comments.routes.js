const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/comment.controller')
const authenticate = require('../middleware/authenticate')

router.get('/:id/comments' , commentsController.getComments)
router.post('/:id/comments' , authenticate , commentsController.createComment )

module.exports = router