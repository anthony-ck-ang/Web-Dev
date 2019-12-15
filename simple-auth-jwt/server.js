require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
    username: 'ant',
    title: 'Post 1'
  },
  {
    username: 'xav',
    title: 'Post 2'
  }
]

//GET posts
app.get('/posts', authenticateToken, (req, res) => {
  //Filter logic: return filtered post based on username pass on from req obj
  //only post that user has access to (based on username)
  res.json(posts.filter(post => post.username === req.user.name))
})

//Middleware function to auth token
function authenticateToken(req, res, next) {
  //Get token from header -> Bearer <TOKEN>
  const authHeader = req.headers['authorization']
  //if authHeader is true -> return authHeader
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  //Verify token with secret
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403) //invalid token
    req.user = user //decode, extract and attach the user to req
    next()
  })
}

app.listen(3000, () => {console.log("Listening on port 3000")})