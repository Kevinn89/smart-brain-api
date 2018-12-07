const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const app = express();
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

app.use(bodyParser.json());
app.use(cors());


const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:true
    }
  });

app.post('/signin',(req,res) => {signin.handleSignin(req,res ,db ,bcrypt)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageUrl',(req,res) => {image.handleImageCall(req,res)})

app.post('/register',(req,res) => {register.handleRegistration(req,res ,db ,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`);
});

