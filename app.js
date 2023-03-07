const express = require('express')
const { Sequelize } = require('Sequelize')
const bodyParser= require('body-parser');
const Tasks = require('./models/Tasks');
const ejs = require('ejs');
const flash = require('connect-flash');
const session = require('express-session')
const app = express();
require('dotenv').config();

app.use(session({
    secret: "this_is_so_secret!",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())
app.use((req, res,next)=>{
  res.locals.error_msg = req.flash("error_msg");
  next()
})

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const sequelize = new Sequelize('railway', 'root', process.env.PASSWORD, {
    host: process.env.HOST,
    dialect:'mysql',
    port: 5780 
});

try {
    sequelize.authenticate();
    console.log('Mysql is running.');
  } catch (error) {
   console.error('Error:', error);
}

app.get('/', (req, res)=> {

     Tasks.findAll().then((tasks)=> {
        res.render('index', {tarefas: tasks})
    }).catch((err)=> {
        console.log(err)
    })
    
});

app.post('/enviar', (req, res)=> {

    let nome = req.body.title;
    let conteudo = req.body.content;

    Tasks.create({
        title: nome,
        content: conteudo
    })

    res.redirect('/')

});

app.post('/delete', (req, res)=> {
    Tasks.destroy({where: {id: req.body.id}})
    res.redirect('/')
})

app.listen(8080, ()=> {
    console.log(`Server running 🚀`);
})