var express = require('express')
var bodyParser = require('body-parser')
const { Pool } = require('pg')

const pool = new Pool({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: process.env.POSTGRES_PASSWORD,
    port: 3211,
    tag: 'demo'
})

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    const search = req.params.q
    if (search != "") {
        queryDatabase(search);
    }

    const secondSearch = search
    if (secondSearch != "") {
        queryDatabase(secondSearch);
    }
})

// create a function to handle GET requests to /users 

app.get('/users', function (req, res) {
    const userSearch = req.params.q
    if (userSearch != "") {
        queryDatabase(userSearch);
    }
})

function queryDatabase(mainString) {
    var squery = "SELECT * FROM users WHERE name = \"" + mainString + "\""
    pool.query(squery, (err, res) => {
        console.log(err, res)
        pool.end()
    })
}

app.get('/testing', function (req, res) {
        queryDatabase(userSearch);
})

app.post('/users', function (req, res) {
    const userSearch = req.params.q
    if (userSearch != "") {
        queryDatabase(userSearch);
    }
})

app.listen(8000, function () {
    console.log("Server running");
});

let iban = "DE012345678910112345"
