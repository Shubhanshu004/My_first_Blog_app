const express = require('express')
const router = express.Router()

const postController = require('../controllers/post.controller')
const commentsController = require('../controllers/comment.controller')
const authenticate = require('../middleware/authenticate')

router.get('/', postController.getallposts)
router.get('/:id', postController.getpostbyid)

router.post('/', authenticate, postController.createPost)
router.patch('/:id', authenticate, postController.updatePost)
router.delete('/:id', authenticate, postController.deletePost)

router.get('/:id/comments', commentsController.getComments)
router.post('/:id/comments', authenticate, commentsController.createComment)

module.exports = router