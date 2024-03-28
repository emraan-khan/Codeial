const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
const port = 8000;
// ejs layout for rendering
const  expressLayouts = require('express-ejs-layouts');
// dbb
const db = require('./config/mongoose')
// things used for session cookies
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy')

// const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts)

// setting styles in head and script in bottom
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router 

// ejs layouts

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views')

// mongo store is used to store session cookie into the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'numnumlunglung',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    // store: new MongoStore({
    //     mongooseConnection: db,
    //     autoRemove: 'disabled'
    // },
    // function(err){
    //     console.log(err || 'connect-mongo setup ok')
    // })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use('/', require('./routes/'))


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})