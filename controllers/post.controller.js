const { error } = require('console');
const pool = require('../Database/db');
const { post } = require('../app');

const getallposts = async (req , res) => {
  try{
  const result = await pool.query('SELECT posts.id,posts.title,posts.content, posts.status, posts.created_at, users.id AS author_id, users.name AS author_name FROM posts JOIN users ON posts.author_id = users.id ORDER BY posts.created_at DESC')
  
  res.status(200).json(result.rows)
 }catch(error){
    console.error('GET ALL POSTS ERROR:' , error);
    res.status(500).json({
      error: error.message 
  })}
}

const getpostbyid = async (req , res) => {
  try{
    const id = parseInt(req.params.id)
    const result = await pool.query(`SELECT
          posts.id,
          posts.title,
          posts.content,
          posts.status,
          posts.created_at,
          users.id AS author_id,
          users.name AS author_name
       FROM posts
       JOIN users
       ON posts.author_id = users.id
       WHERE posts.id = $1`,
      [id])
    
    if(result.rows.length === 0 ){
      return res.status(404).json({error: "Post Not Found"})
    }
    res.status(200).json(result.rows[0])

  }catch(error){
    res.status(500).json({ error: err.message })
  }
}
const createPost = async (req , res) => {
  try{
    const { title, content, status } = req.body
    const author_id = req.user.id

    const result = await pool.query(
      `INSERT INTO posts
       (title, content, author_id, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, author_id , status || 'draft']
    )
     res.status(201).json({message:'Post created', post: result.rows[0] })
  }catch(error){
    res.status(500).json({error: 'Something went wrong'})
  }
}



module.exports = {getallposts , getpostbyid , createPost}