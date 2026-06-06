const joi = require('joi')

const createPostSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  status: joi.string().default('draft')
})

const updatePostSchema = joi.object({
  title: joi.string(),
  content: joi.string(),
  status:joi.string().valid('draft' , 'published')
})

module.exports = {createPostSchema , updatePostSchema}