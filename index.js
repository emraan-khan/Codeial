const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
const port = 8000;
const cors = require('cors');
const logger = require('morgan')
const socketIO = require('socket.io');

const env = require('./config/environment')

// ejs layout for rendering
const  expressLayouts = require('express-ejs-layouts');
// dbb
const db = require('./config/mongoose')
// things used for session cookies
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy')

// google authentication
const passportGoogle = require('./config/passport-google-oath2-strategy')

// passport jwt file importing
const passportJWT = require('./config/passportJWT-strategy');
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
const flash= require('connect-flash')
const customMware = require('./config/middleware');
const { asset_path } = require('./config/environment');

// setting up chat server with socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5000);
console.log('chat Server is listeing on port number : 5000');

// const io = socketIO(chatServer, {
//     cors: {
//       origin: "*",
//     //   methods: ["GET", "POST"]
//     }
//   });
const io = require('socket.io')(chatServer, {cors: {origin: "*"}});
// Enable CORS for Socket.IO
// io.origins('*:*');
const path = require('path');

// we are providing the middleware for loging the data into development mode 
// app.use(logger(env.morgan.mode, env.morgan.options))

app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(cors());

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path))

// making the upload path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(expressLayouts)

// setting styles in head and script in bottom
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views')

// mongo store is used to store session cookie into the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*24*36000)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err.message || 'connect-mongo setup ok')
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes/'))


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})