const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/comment.controller')
const authenticate = require('../middleware/authenticate')

router.post('/:id/replies', authenticate, commentsController.replyToComment)
router.delete('/:id/' , authenticate , commentsController.deleteComment)
module.exports = router