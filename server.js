const express = require('express');
let favicon = require('serve-favicon');
const path = require('path');
let fs = require('fs');
const { nextTick } = require('process');
const port = 3000;

const app = express();
const router = express.Router();

let questions = JSON.parse(fs.readFileSync('./quizzes.json', 'utf8'));

app.use(express.static('static')) // use static files

app.use(express.urlencoded());
app.use(express.json());      // if needed\
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

// get random quiz from quizzes.json
app.get("/quiz", function (req, res) {
    var randomKey = Math.floor(Math.random()*questions.length); 
    res.json(questions[randomKey]); 
    });

app.get('/home/:id', function(req, res) {
    console.log('send correct answer for quiz id :',req.params.id,' correct answer number: ',questions[req.params.id]['correct']);
    res.json(questions[req.params.id]['correct']);
     });

app.get("/home", function (req, res) {
    return res.sendFile(__dirname + '/index.html');
});

app.post('/home', function(req, res){
    return res.sendFile(__dirname + '/index.html');
  });

app.listen(port, () => console.log('Server started at http://localhost:' + port));


