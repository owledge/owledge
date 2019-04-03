var express = require('express')
const compression = require('compression')
const morgan = require('morgan')
var mysql = require('mysql')
const path = require('path');
var bodyParser = require('body-parser')
var AppConfig = require('./enviroments/enviroment.dev.js')
var app = express()
var jwt = require('jsonwebtoken')
const basicAuth = require('express-basic-auth')
const dev = app.get('env') !== 'production'
var connection

if(!AppConfig.production) {
  connection = mysql.createConnection(AppConfig.URL)
}

if (process.env.NODE_ENV === 'production') {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
  app.disable('x-powered-by')
  app.use(compression())
  app.use(morgan('common'))

  app.use(express.static(path.resolve(__dirname, 'build')))

  app.get('/', (req, res) =>{
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

if(dev){
  app.use(morgan('dev'))
}

connection.connect((err) => {
  if (!err) { console.log('Db connection succedes.') } else { console.log('Db connection fail \n Error : ' + JSON.stringify(err, undefined, 2)) }
})

app.use(express.static(__dirname))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen((process.env.PORT || 3000), () => console.log('Port 3000'))

app.use(basicAuth({
  users: { 'admin': '123' },
  challenge: true
}))

// Post user
app.post('/api/users', (req, res) => {
  var post_body = req.body
  //var token = jwt.sign({ foo: post_body.pword }, 'shhhhh')
  connection.query("INSERT into User (uname, fname, lname, pword, gender, email, regdate, country, language) VALUES ('" + post_body.uname + "','" +
         post_body.fname + "','" + post_body.lname + "','" + post_body.pword + "','" + post_body.gender + "','" +
         post_body.email + "','" + post_body.regdate + "','" + post_body.country + "','" + post_body.language + "')", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

//Get user
app.get('/api/users/:id',(req,res)=>{
  connection.query("SELECT * FROM User WHERE user_id = ?",[req.params.id],(err,result)=>{
   if(!err) {
   res.send(result);
  }
   else
   res.send(err);
  })
});

// Put user
app.put('/api/users/:id', (req, res) => {
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
app.post('/api/users/login', (req, res) => {
  console.log(res);
  var post_body = req.body
  connection.query("SELECT * FROM User where email='" + post_body.email + "' and pword='" + post_body.pword + "'", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      //var decoded = jwt.verify(data.pword, 'shhhhh')
      res.send(data)
      console.log('welcome')
    }
  })
})


// Post card
app.post('/api/cards/:userId', (req, res) => {
  var post_body = req.body
  connection.query("INSERT into FlashCard (question, answer, creation_date, owner_id) VALUES ('" + post_body.question + "','" +
        post_body.answer + "','" + new Date().toISOString() + "','" + (+req.params.userId) + "')", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Post Dislike
app.post('/api/cards/:userId', (req, res) => {
  var post_body = req.body
  connection.query("INSERT into FlashCard (question, answer, creation_date, owner_id) VALUES ('" + post_body.question + "','" +
        post_body.answer + "','" + formatDate() + "','" + (+req.params.userId) + "')", function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Asign flashcard to user
app.put('/api/cards/:userId/assign/:flashcardId', (req, res) => {
  var post_body = req.body
  connection.query("INSERT INTO User_has_FlashCard(User_id,FlashCard_id) VALUES (?, ?)",[+req.params.userId, +req.params.flashcardId], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Get all user's flashcards
app.get('/api/cards/assigned/:id', (req, res) => {
  var post_body = req.body
  connection.query("SELECT FlashCard.*, User_has_FlashCard.has_disliked FROM FlashCard JOIN User_has_FlashCard ON FlashCard.flashcard_id = User_has_FlashCard.FlashCard_id WHERE User_has_FlashCard.User_id = ?",[req.params.id], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Get all user's owned flashcards
app.get('/api/cards/owned/:id', (req, res) => {
  var post_body = req.body
  connection.query("SELECT FlashCard.*, User_has_FlashCard.has_disliked FROM FlashCard JOIN User_has_FlashCard ON FlashCard.flashcard_id = User_has_FlashCard.FlashCard_id WHERE FlashCard.owner_id = ?",[req.params.id], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Update card card
app.put('/api/cards/update/:userId&:flashcardId', (req, res) => {
  var post_body = req.body
  connection.query('UPDATE FlashCard ' + "SET question = '" + post_body.question + "'," + "answer ='" + post_body.answer + "' WHERE owner_id = ? AND flashcard_id = ?", [req.params.userId,req.params.flashcardId], function (err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Get flascard por id
app.get('/api/flashcards/:id', (req, res) => {
  connection.query('SELECT * FROM FlashCard WHERE flashcard_id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) { res.send(rows) } else { console.log(err) }
  })
})

// Post tag
app.post('/api/tags/', (req, res) => {
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
app.put('/api/tags/:id', (req, res) => {
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
app.get('/api/tags/id/:id', (req, res) => {
  connection.query('SELECT * FROM Tag WHERE tag_id = ?', [req.params.id], (err, rows, fields) => {
    if (!err) { res.send(rows) } else { console.log('err') }
  })
})

// Get tag por nombre
app.get('/api/tags/name/:name', (req, res) => {
  connection.query('SELECT * FROM Tag WHERE tag_name = ?', [req.params.name], (err, rows, fields) => {
    if (!err) { res.send(rows) } else { console.log('err') }
  })
})


// Get all users
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM User', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log('err');
  })
})

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
