const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const PORT = 8080
const app = express();

app.use(cors());
app.options('*', cors());
app.use( bodyParser.json() );     
app.use(bodyParser.urlencoded({
  extended: true
})); 

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodesql'

});

// connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected')
})

// create db
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE nodesql'
//     db.query(sql, (err, result) => {
//         if(err) {
//             throw err;
//         }
//         console.log(result);
//         res.send('Database created')
//     });
// });

// // create table
// app.get('/createposttable', (req, res) => {
//     let sql = 'CREATE TABLE person(id int AUTO_INCREMENT, name VARCHAR(255), surname VARCHAR(255), age INT, gender VARCHAR(1), PRIMARY KEY(id))'
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result)
//         res.send('Post table created')
//     })
// });

// insert data
app.post('/person/create', (req, res) => {
    let post = {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        gender: req.body.gender
    }
    let sql = 'INSERT INTO person SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.redirect('http://localhost:8000')
    })
});

// get persons
app.get('/persons', (req, res) => {
    let sql = 'SELECT * FROM person'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(result)
    })
})

// get single persons
app.get('/persons/:id', (req, res) => {
    let sql = `SELECT * FROM person WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('posts fetched')
    })
})

app.listen(PORT, () => {
    console.log(`express.js running on port ${PORT}`)
})