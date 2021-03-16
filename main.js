const express = require('express');
const path = require('path');
const ejs = require('ejs');
const firebase = require("firebase");
require("firebase/firestore");


const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get(['/', '/index', '/home'], (req, res) => {
    res.render('main', {items:[{title:"Chat App", href:"localhost:3000/project/chat", icon:"https://cdn.pixabay.com/photo/2017/09/17/22/57/computer-2760136_960_720.jpg"}], title:"Home"})
})
// {title:"Storage Drive", href:"https://drive.omersabic.ga", icon:"https://cdn.pixabay.com/photo/2017/09/17/22/57/computer-2760136_960_720.jpg"}
app.get('/about', (req, res) => {
    res.render('about', {title:"About"})
})


app.get('/project/:project', (req, res) => {
    res.render('single')
})

app.get('/main', (req, res) => {
    res.render('main')
})

app.listen(3000, () => {
    console.log('server started');
  });