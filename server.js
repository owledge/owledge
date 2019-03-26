var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var app = express()
var jwt = require('jsonwebtoken')
const basicAuth = require('express-basic-auth')

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  var connection = mysql.createConnection({
    host: 'q57yawiwmnaw13d2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'gw7y2z8truum5ibn',
    password: 'yrwq4ilwo2wacg6s',
    database: 'y56jusgc306i54ry'
  })
}

connection.connect((err) => {
  if (!err) { console.log('Db connection succedes.') } else { console.log('Db connection fail \n Error : ' + JSON.stringify(err, undefined, 2)) }
})

app.use(express.static(__dirname))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(3000, () => console.log('Port 3000'))

app.use(basicAuth({
  users: { 'admin': '123' }
  // challenge: true
}))

// Post user
app.post('/api/users', (req, res) => {
  var post_body = req.body
  var token = jwt.sign({ foo: post_body.pword }, 'shhhhh')
  connection.query("INSERT into User (uname, fname, lname, pword, gender, email, regdate, country, language) VALUES ('" + post_body.uname + "','" +
         post_body.fname + "','" + post_body.lname + "','" + token + "','" + post_body.gender + "','" +
         post_body.email + "','" + post_body.regdate + "','" + post_body.country + "','" + post_body.language + "')", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Put user
app.put('/api/user/:id', (req, res) => {
  var post_body = req.body
  connection.query('UPDATE User ' + "SET uname = '" + post_body.uname + "'," + "fname ='" + post_body.fname + "'," + "lname ='" + post_body.lname +
        "'," + "pword ='" + post_body.pword + "'," + "gender ='" + post_body.gender + "'," + "email ='" + post_body.email + "'," + "country ='" + post_body.country +
        "'," + "language ='" + post_body.language + "' WHERE user_id = ?", [req.params.id], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Post login
app.post('/api/user', (req, res) => {
  var post_body = req.body
  connection.query("SELECT * FROM User where email='" + post_body.email + "' and pword='" + post_body.pword + "'", function (err, data) {
    if (err) {
      res.send(err)
      throw err
    } else {
      var decoded = jwt.verify(data.pword, 'shhhhh')
      res.send(decoded)
      console.log('welcome')
    }
  })
})

// Post card
app.post('/api/card', (req, res) => {
  var post_body = req.body
  connection.query("INSERT into Flashcard (question, answer, creation_date, dislikes, share) VALUES ('" + post_body.question + "','" +
        post_body.answer + "','" + post_body.creation_date + "','" + post_body.dislikes + "','" + post_body.share + "')", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Put card
app.put('/api/card/:id', (req, res) => {
  var post_body = req.body
  connection.query('UPDATE Flashcard ' + "SET question = '" + post_body.question + "'," + "answer ='" + post_body.answer + "' WHERE user_id = ?", [req.params.id], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Get flascard por id
app.get('/api/flashcard/:id', (req, res) => {
  connection.query('SELECT * FROM Flashcard WHERE flashcard_id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) { res.send(rows) } else { console.log('err') }
  })
})

// Post tag
app.post('/api/tags', (req, res) => {
  var post_body = req.body
  connection.query("INSERT into Tag (tag_name, tag_color, tag_icon) VALUES ('" + post_body.tag_name + "','" +
        post_body.tag_color + "','" + post_body.tag_icon + "')", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Put tag
app.put('/api/tag/:id', (req, res) => {
  var post_body = req.body
  connection.query('UPDATE Tag ' + "SET tag_name = '" + post_body.tag_name + "'," + "tag_color ='" + post_body.tag_color + "'," + "tag_icon ='" +
  post_body.tag_icon + "' WHERE tag_id = ?", [req.params.id], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Get tag por id
app.get('/api/tag/id/:id', (req, res) => {
  connection.query('SELECT * FROM Tag WHERE tag_id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) { res.send(rows) } else { console.log('err') }
  })
})

// Get tag por nombre
app.get('/api/tag/name/:name', (req, res) => {
  connection.query('SELECT * FROM Tag WHERE tag_name = ?', [req.params.name], (err, rows, fields) => {
    if (!err) { res.send(rows) } else { console.log('err') }
  })
})

/*
// Get all users
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM User', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log('err');
  })
})

//Get all users
app.get('/users',(req,res)=>{
    connection.query('SELECT * FROM user',(err,rows,fields)=>{
     if(!err)
     res.send(rows);
     else
     console.log('err');
    })

});

//Get an user
app.get('/users/:id',(req,res)=>{
    connection.query('SELECT * FROM user WHERE user_id = ?',[req.params.id],(err,rows,fields)=>{
     if(!err)
     res.send(rows);
     else
     console.log('err');
    })
});

//Delete an user
app.delete('/users/:id',(req,res)=>{
    connection.query('DELETE FROM user WHERE user_id = ?',[req.params.id],(err,rows,fields)=>{
     if(!err)
     res.send('DELETED successfully');
     else
     console.log('err');
    })
}); */
