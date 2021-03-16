const express = require('express');
const ejs = require('ejs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./projects.db', err => {
    if(err) {
        console.log(err.message)
    }
    console.log('connected to projects database')
})

// Adding project to database
/*
db.run('CREATE TABLE projects(id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL, badges TEXT, links TEXT)')

db.run('INSERT into projects(id, name, description,icon, badges, links)values(1,"Chat App","Small chat app with dedicated servers.","https://i.imgur.com/d9b1CI9.png","html,javascript,css,nodejs","https://github.com/OmerSabic/ChatAppClient,https://github.com/OmerSabic/ChatAppServer")', function(err, row) {
    if(err) {
        console.log(err.message)
    }
    console.log('entry added to table')
    db.close()
})

*/

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get(['/', '/index', '/home'], (req, res) => {
    db.all('SELECT * FROM projects', (err, data) => {
        if(err) {
            console.log(err.message)
        }
        res.render('index', {data:JSON.stringify(data)})
    })
})
app.get('/about', (req, res) => {
    res.render('about', {title:"About"})
})

/*
db.all('SELECT * FROM projects', (err, data) => {
    if(err) {
        console.log(err.message)
    }
    data.forEach(e => {
        console.log(e)
    })
})
*/


app.get('/project/:projectName', async (req, res) => {
    db.all('SELECT * FROM projects WHERE name = "' + req.params.projectName + '"', (err, data) => {
        if(err) {
            console.log(err.message)
        }
        var det = []
        data.forEach(e => {
            det.push(e)
        })
        res.render('project', {data:JSON.stringify(det[0])})
    })
})

app.get('/main', (req, res) => {
    res.render('main')
})

app.listen(3000, () => {
    console.log('server started');
});