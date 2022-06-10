require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const handlebars = require('express-handlebars')
const mainRoutes = require('./routes/main');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";
const databaseUri = "mongodb+srv://valeria:12345@shippingdatabase.yw9v6p9.mongodb.net/?retryWrites=true&w=majority";
const sessionSecret = "kursova"


app.use(session({
    secret: sessionSecret,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: databaseUri,
        collectionName: 'sessions'
    }) 

}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));
app.use(mainRoutes);




// const hbs = exphbs.create({
//     extname: 'hbs',
//     // layoutsDir: `${__dirname}/views/layouts`,
// })

app.set('view engine', 'hbs');
app.set('views', './views');

app.engine(
    'hbs',
    handlebars.engine({ 
        defaultLayout: 'index',
        extname: 'hbs',
        layoutsDir: `${__dirname}/views/layouts`
     })
  )

const start = async () => {
    try{
        await mongoose.connect(databaseUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, ()=>{
            console.log(`Server start on ${PORT}`);
        })

    } catch (e) {
        console.log(e);
    }
}

start();