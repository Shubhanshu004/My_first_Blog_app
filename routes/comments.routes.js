const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/comment.controller')
const authenticate = require('../middleware/authenticate')
const validate = require('../middleware/validator')
const {replySchema} = require('../validators/comment.validator')


router.post('/:id/replies', authenticate, validate(replySchema), commentsController.replyToComment)
router.delete('/:id/' , authenticate , commentsController.deleteComment)
module.exports = router