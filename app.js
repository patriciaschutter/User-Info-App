// NOTE TO SELF: MAKE SURE YOU ARE ON AJAXSERVER BRANCH!!!! 


/* User Information App - AJAX Server | FULL STACK COURSE OCT'17 - PATRICIA SCHUTTER 

Starting with your previous website, create a new branch to preserve the old site. 
>> Branch created: AjaxServer. 

Hints:
- use https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf (Links to an external site.)
- you cannot send or render a response more than once per request.
- you must find a way to capture whenever the user's input changes in the search bar. This will trigger your Ajax request to your server.

PART 0:
If you're having trouble finding matching users, solve the puzzle first: 
>>>> answers in practise.js

Your site has a form on it that acts like a search bar. When someone types into the search bar, it should retrieve a list of matching users and list them by name on the same page, similar to how the search bars on airbnb.com or hipmunk.com function.

Once the user submits the search bar, it should exhibit the same behavior as the previous assignment, i.e. display a new page with the search results.
*/

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
var fs = require ('fs')

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))// 



// to get the index page with calling localhost:3000. 
app.get('/', function (req, res) {
	res.render('index')
})

// Renders page that displays a form with search bar.
app.get('/SearchByName', function(req, res){
	res.render('SearchByName',{suggestion: []})
})

// Renders a page that displays all the users.
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

// Takes in the post request from your form, then displays matching users on a new page. Suggestions should be shown on same page.
// SERVER SIDE
app.post("/suggestion", function(req, res){
	let inputFN = req.body.inputFirstn
	let inputLN = req.body.inputLastn
	console.log(`Input client firstn: ${inputFN}\nInput client lastn: ${inputLN}`)
	fs.readFile('users.json', 'utf-8', function(err, data){
		if (err){
			throw err
		}
		var users = JSON.parse(data)
		var userMatch = []
		for (var i = 0; i < users.length; i++){
			if (users[i].firstname.slice(0, inputFN.length) === inputFN && users[i].lastname.slice(0, inputLN.length ) === inputLN && inputFN.length > 0 && inputLN.length > 0 || 
				users[i].firstname.slice(0, inputFN.length) === inputFN && inputLN === '' && inputFN.length > 0 || 
				inputFN === '' && users[i].lastname.slice(0, inputLN.length) === inputLN && inputLN.length > 0){
				userMatch.push(users[i])
			}
		}
		console.log(userMatch)
		if (userMatch.length > 0){ // if there is something in there it's truthy and this 'if' will be excecuted. 
			res.json({ 
				status: 200,
				suggestion: userMatch,
				})
		}
	})
})




// Post request to display user matched on a new page 
app.post("/search", function(req, res){
console.log('searchbar responds')
	fs.readFile('users.json', 'utf-8', function(err, data){
		if (err){
			throw err
		}
		var users = JSON.parse(data)
		var userMatch = []
		for (var i = 0; i < users.length; i++){
			// if (req.body.firstname === users[i].firstname && req.body.lastname === users[i].lastname){
			if (users[i].firstname === req.body.firstname && users[i].lastname === req.body.lastname || 
				users[i].firstname === req.body.firstname && req.body.lastname === '' || 
				req.body.firstname === '' && users[i].lastname === req.body.lastname ){
				userMatch.push(users[i]) 
			}
		}
		console.log("Users matched: ", userMatch)
				if (userMatch.length > 0){ 
					res.render('result', {
							resultMatch: userMatch,
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

// Renders a page with a form with three inputs on it (first name, last name, and email) that allows you to add new users to the users.json file.
app.get("/AddUser", (req, res) => {
  res.render ("AddUser")
})

// Takes in the post request from the 'add user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).
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

app.listen(3004, ()=> {
	console.log("listening at 3004")
})