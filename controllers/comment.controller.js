const pool = require('../Database/db')


const getComments = async(req , res) => {
  try{
  const postid = parseInt(req.params.id)
  const result = await pool.query( `SELECT comments.id, comments.content,comments.parent_id, comments.created_at, users.name AS author_name FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = $1 ORDER BY comments.created_at ASC`, [postid])

  res.status(200).json(result.rows)
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
}

const createComment = async(req , res) => {
  try{
    const {content , parent_id} = req.body
    const postid = parseInt(req.params.id)
    const author_id = req.user.id
    const result = await pool.query( `INSERT INTO comments (content, user_id, post_id, parent_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        content,
        author_id,
        postid,
        parent_id || null
    ])
    res.status(201).json(result.rows[0])
  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }
}

const replyToComment = async (req, res) => {
  try {
    const parent_id = parseInt(req.params.id)
    const {content} = req.body
    const author_id = req.user.id
     // Check parent comment exists
    const commentResult = await pool.query('SELECT * FROM comments WHERE id = $1' , [parent_id])
    if (commentResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Comment not found'
      })
    }

    const parentComment = commentResult.rows[0]

    //create reply
    const result = await pool.query(`INSERT INTO comments
      (content, user_id, post_id, parent_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        content,
        author_id,
        parentComment.post_id,
        parent_id
      ])
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteComment = async (req , res) => {
  try{
  const commentId = parseInt(req.params.id)
  const result = await pool.query(
    `DELETE FROM comments WHERE id = $1 
     AND (user_id = $2 OR $3 = 'admin')
     RETURNING *`,
    [commentId, req.user.id, req.user.role]
  )
 if (result.rows.length === 0) {
  return res.status(404).json({
    error: 'Comment not found or unauthorized'
  })
}
res.status(200).json({
  message: 'Comment deleted successfully'
})
  }catch(error){
    res.status(500).json({
      error: error.message
    })
  }
}

module.exports = {getComments , createComment , replyToComment,deleteComment}