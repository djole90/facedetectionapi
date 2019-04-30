const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const db = require('./database/db').db


const handleRegister = require('./controllers/register').handleRegister
const handleSignin = require('./controllers/signin').handleSignin
const handleProfile = require('./controllers/profile').handleProfile
const handleImage = require('./controllers/image').handleImage
const handleApiCall = require('./controllers/image').handleApiCall




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var bcrypt = require('bcryptjs');

app.get('/', (req, res) => {
    res.send('tra')
})

app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => handleProfile(req, res, db))
app.put('/image', (req, res) => handleImage(req, res, db))
app.post('/imageurl',  handleApiCall)





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('app is running on port ' + PORT)
})