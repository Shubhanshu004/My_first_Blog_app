const express = require('express')
const app = express()
const postsRoutes = require('./routes/posts.routes')
// const commentsRoutes = require('./routes/comments.routes')
const authRoutes = require('./routes/auth.routes')

// middleware 
app.use(express.json()) 

//routes
app.use('/posts' ,postsRoutes)
// app.use('/comments' , commentsRoutes)
app.use('/auth', authRoutes)

module.exports = app
