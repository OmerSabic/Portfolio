const express = require('express');
const ejs = require('ejs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./projects.db', err => {
    if(err) {
        console.log(err.message)
    }
    console.log('connected to projects database')
})

db.all('SELECT * FROM projects', (err, data) => {
    if(err) {
        console.log(err.message)
    }
    data.forEach(e => {
        console.log(e)
    })
})

/*  Adding project to database

db.run('INSERT into projects(id, name, description, badges, links)values(1,"Chat App","Small chat app with dedicated servers.","html,javascript,css,node.js","https://github.com/OmerSabic/ChatAppClient,https://github.com/OmerSabic/ChatAppServer")', function(err, row) {
    if(err) {
        console.log(err.message)
    }
    console.log('entry added to table')
    db.close()
})
*/
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