'use strict'

const port = 3000;
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const passport = require('passport-local');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('./views/index.ejs', {msg: 'mensaje desde node'});
})

app.get('/login', async (req, res)=>{
    res.render('./views/login.ejs');
   
})

app.get('/register', (req, res)=>{
    res.render('./views/register.ejs');
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QUEqueQUE13@WALTER',
    database: 'usuarios'
})

connection.connect((err)=>{
    if(err) console.log('error:' + err);

    console.log('coneccion a la db correcta');
})

app.listen(port, (req, res)=>{
    console.log('server running in localhost:'+port);
})

app.post('/register', async (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var passwordhash = await bcrypt.hash(password, 1);
    connection.query('INSERT INTO accounts SET ?', {email:email, password:passwordhash}, async (err, succ)=>{
        if(err){console.log(err)}

        else{
            res.send('correcto')
            res.redirect('/')
            res.setHeader('Content-Type', 'text/plain');
        }
        })
});

app.post('/login', async (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var passhash =  await bcrypt.hash(password, 8)
    if(email, password){
        connection.query('SELECT * FROM accounts WHERE email = ?' [email], async (err, results)=>{
                if(results.length == 0 || !(await bcrypt.compare(pass, results[0].password))){
                    res.send('usuario o password incorrectas')
                }

                else{
                    res.send('login correcto')
                }
        })
    }
})