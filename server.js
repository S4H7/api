const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db=knex({
  client: 'pg',
  version: '7.6',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'happy786',
    database : 'brain'
  }
});


const app=express();

app.use(bodyParser.json());
app.use(cors());

// const database={
// 	users:[
// 		{
// 			id:'123',
// 			name:'John',
// 			email:'john@gmail.com',
// 			password:'cookies',
// 			entries:0,
// 			joined:new Date()
// 		},
// 		{
// 			id:'124',
// 			name:'Sally',
// 			email:'sally@gmail.com',
// 			password:'bananas',
// 			entries:0,
// 			joined:new Date()
// 		}
// 		],
// 		login:[
// 		{
// 			id:'987',
// 			has:'',
// 			email:'john@gmail.com'

// 		}
// 		]
// }

app.get('/',(req,res)=>{res.send(database.users);})

app.post('/signin',(req,res) => {signin.handleSignin(db,bcrypt)/*(req,res)*/}) /*Look another shortcut*/

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)}) /*injecting dependencies*/

	// database.users.push({
	// 		id:'125',
	// 		name:name,
	// 		email:email,
	// 		entries:0,
	// 		joined:new Date()})

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})


app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})


app.listen(3001,()=>{
	console.log('app is running on port 3001');
})


/*
	/	--> res = this is working
	/signin --> POST=success/fail
	/register --> POST=user
	/profile/:userId==> Get =user
	/image-->PUT --> user
	
*/

// 	bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });