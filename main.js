const express = require('express');
const ejs = require('ejs');


const projects = [
    {
        name: "Portfolio",
        description: "You are looking at it right now! A small website I made mainly to paractice css and learn more about databases. I use it to store projects I want to show off to others. ",
        icon: "https://i.imgur.com/d9b1CI9.png",
        badges: ["html", "js", "css", "nodejs"],
        links: ["https://github.com/OmerSabic/Portfolio"]
    },
    {
        name: "Pterodactyl Discord Bot",
        description: "Disocord bot used to manage minecraft servers that are using the Pterodactyl Panel. You can turn the server on or off, get RAM, CPU or Disk usage and get server IP and version. ",
        icon: "https://i.imgur.com/lrftl9O.png",
        badges: "python",
        links: ["https://github.com/OmerSabic/Pterodactyl-Discord-Bot"]
    }
]

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get(['/', '/index', '/home'], (req, res) => {
    res.render('index', { data: JSON.stringify(projects) })
})
app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

app.get('/project/:projectName', async (req, res) => {
    projects.forEach(project => {
        if(project.name == req.params.projectName) {
            return res.render('project', { data: JSON.stringify(det[0]) })
        }
    })

    return res.send("404 not found")
})

app.get('/main', (req, res) => {
    res.render('main')
})

app.listen(3000, () => {
    console.log('server started');
});