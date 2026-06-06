const express = require('express')
const router = express.Router()

const postController = require('../controllers/post.controller')
const commentsController = require('../controllers/comment.controller')
const authenticate = require('../middleware/authenticate')
const validate = require('../middleware/validator')
const {createPostSchema , updatePostSchema} = require('../validators/post.validator')
const {createCommentSchema} = require('../validators/comment.validator')




router.get('/', postController.getallposts)
router.get('/:id', postController.getpostbyid)

router.post('/', authenticate, validate(createPostSchema), postController.createPost)
router.patch('/:id', authenticate,validate(updatePostSchema) , postController.updatePost)
router.delete('/:id', authenticate, postController.deletePost)

router.get('/:id/comments', commentsController.getComments)
router.post('/:id/comments' ,authenticate,validate(createCommentSchema), commentsController.createComment)

module.exports = router