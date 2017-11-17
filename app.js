/* User Information App - Web Server | FULL STACK COURSE OCT'17 - PATRICIA SCHUTTER 

Create a Node.js application that is the beginning of a user management system. Your users are all saved in a "users.json" file, and you can currently do the following:
- search for users
- add new users to your users file.
- get your starter file here: users.json

PART 0
Create one route:
- route 1: renders a page that displays all your users.
*/

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
var fs = require ('fs')
// var jsonfilereader = require('./json-file-reader.js')

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))// 

app.listen(3000, ()=> {
	console.log("listening")
})

// to get the index page with calling localhost:3000. 
app.get('/', function (req, res) {
	res.render('index')
})

// ROUTE 1: renders a page that displays all your users
app.get('/AllUsers', function(req,res){
		fs.readFile('users.json', 'utf-8', function(err, data) {
			if (err) {
				throw err
			} 
			var users = JSON.parse(data)
			res.render('AllUsers', {
						usersArray: users,				
			})
		})
})

/* PART 1
Create two more routes:
*/

// ROUTE 2: renders a page that displays a form which is your search bar.
app.get('/SearchByName', function(req, res){
	res.render('SearchByName')
})

// ROUTE 3: takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.
app.post("/searchbar", function(req, res){
	console.log('searchbar responds')
	fs.readFile('users.json', 'utf-8', function(err, data){
		if (err){
			throw err
		}
		var users = JSON.parse(data)
		var userMatch = {}
		for (var i = 0; i < users.length; i++){
			// if (req.body.firstname === users[i].firstname && req.body.lastname === users[i].lastname){
			if (users[i].firstname === req.body.firstname && users[i].lastname === req.body.lastname || 
				users[i].firstname === req.body.firstname && req.body.lastname === '' || 
				req.body.firstname === '' && users[i].lastname === req.body.lastname ){
				userMatch = { firstname: users[i].firstname, lastname: users[i].lastname, email: users[i].email}
			}
		}
		console.log("Users matched: ", userMatch.firstname, userMatch.lastname, userMatch.email)
				if (userMatch.firstname){ // if there is something in there it's truthy and this 'if' will be excecuted. 
					res.render('result', {
							FirstName: userMatch.firstname,
							LastName: userMatch.lastname,
							Email: userMatch.email,
						})
		} else {
				res.render('failed')
				console.log('User not found')
		}
	})
})

app.get('/failed', function(req, res){
	res.render('failed')
})

app.get('/result', function(req, res){
	res.render('result')
})

/*
PART 2
Create two more routes:


*/

// ROUTE 4: renders a page with a form with three inputs on it (first name, last name, and email) that allows you to add new users to the users.json file.
app.get("/AddUser", (req, res) => {
  res.render ("AddUser")
})

// ROUTE 5: takes in the post request from the 'add user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).
app.post("/addUser", function(req, res) {
  fs.readFile('users.json', function(err,data) {
	if (err) {
	  throw err
	}
	var users = JSON.parse(data)
	var newUser = req.body
	if (newUser.firstname === ""){
		newUser.firstname = 'Not filled in'
	}
	if (newUser.lastname === ""){
		newUser.lastname = 'Not filled in'
	}
	if (newUser.email === ""){
		newUser.email = 'Not filled in'
	}

	users.push(newUser)
	var newJSON = JSON.stringify(users)
	fs.writeFile('users.json', newJSON, function(err,data) {
	  if (err) {
		throw error
	  }
	  else(res.redirect('/AllUsers'))
	})

  })
})