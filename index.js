const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
// ejs layout for rendering
const  expressLayouts = require('express-ejs-layouts');
// dbb
const db = require('./config/mongoose')

const port = 8000;

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts)

// setting styles in head and script in bottom
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router 
app.use('/', require('./routes/'))

// ejs layouts
app.use('/', require('./routes'))

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views')

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})