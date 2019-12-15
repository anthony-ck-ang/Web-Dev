require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

let simplecrypt = require("simplecrypt");
const sc = simplecrypt()


app.use(express.json())

// Refresh token will normally be saved in a persistent cache (redis) or db
let refreshTokens = []

//temp storage, use a cache or db instead to persist
const users = []

//just to test to retrieve list of users
app.get('/getusers', (req, res) => {
  res.json(users)
})


// REFRESH TOKENS
app.post('/token', (req, res) => {
  //extract refresh token
  const refreshToken = req.body.token

  // Refresh token does not exist
  if (refreshToken == null) return res.sendStatus(401)

  // Refresh token is not included in the list of valid refresh tokens (was removed in logout)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  // Using refresh token to 'create' / 'renew' an access token for a user
  // Verify and decode the refresh token
  // Get the user.name (data)
  // Generate a new access token for user with it's name and return it
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

// LOGOUT
// Delete a refresh token to ensure it will not be stolen to be used to 'renew' an access token
// Removes/ filter away the existing refresh token and replace the existing list with only valid refresh tokens
app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

// LOGIN + generate access && refresh token
app.post('/login', async (req, res) => {
  // Authenticate User ...
  const user = users.find( u => u.username === req.body.username)
  console.log(user)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  
  try {
    
    if(req.body.password === await sc.decrypt(user.password)){
      
    const username = req.body.username

    //Create user obj with username from login form
    const user2 = { name: username }
  
    //Generate access token with user info (encode with ACCESS_TOKEN_SECRET)
    const accessToken = generateAccessToken(user2)
  
    //Generate refresh token with user info (encode with REFRESH_TOKEN_SECRET)
    const refreshToken = jwt.sign(user2, process.env.REFRESH_TOKEN_SECRET)
    //Push tokens to [] or cache/db
    refreshTokens.push(refreshToken)
  
    //Return tokens (access + refresh) as json res
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  
    }else{
      res.send('Not Allowed')
    }
  } catch{
    res.status(500).send()
  }
})

// Generate access token with expiration
// Ensures that stolen token cannot be used indefinitely
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1000s' })
}


// Users login through form
// Encrypt the password 
// Create user with form data
// Save in storage
app.post('/newuser', async (req, res) => {
  try {
    const encryptedPassword = await sc.encrypt(req.body.password)

    const user = { username: req.body.username, password: encryptedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})



app.listen(4000, () => {console.log("Listening on port 4000")})