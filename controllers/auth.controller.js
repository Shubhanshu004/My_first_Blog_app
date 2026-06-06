const pool = require('../Database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req , res) => {
  try{
   
    const {name , email , password} = req.body
    const hashedpassword = await bcrypt.hash(password , 10)
    const result = await pool.query(`INSERT INTO users (name, email, password)
   VALUES ($1, $2, $3)
   RETURNING id, name, email, role`,
  [name, email, hashedpassword])
  
  res.status(201).json({message: 'User created'})
  }catch(error){
    console.log(error)
    res.status(500).json({error: error.message})
  }
}

const login = async (req, res) => {
  try{
    const{email , password} = req.body
    const result = await pool.query('SELECT * FROM users WHERE email = $1',
  [email])

  if(result.rows.length === 0){
    return res.status(401).json({message: "Invalid credentials"})
  }
  const user = result.rows[0]
  const ispasswordMatched = await bcrypt.compare(password , user.password) 
  if(!ispasswordMatched){
    return res.status(401).json({message: 'Invalid Credentials'})
  }
  const token = jwt.sign({id: user.id , email: user.email , role: user.role }, process.env.SECRET_KEY , {expiresIn: '1h'})
  res.status(200).json({message: 'User logged in succssfully' , token})
  }catch(error){
    res.status(500).json({error: 'Something went wrong'})
  }
}

module.exports = {signup , login}