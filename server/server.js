require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Json 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Router
app.use( require('./routes/user') )

// connection with database
mongoose.connect( process.env.URLDB, 
        { useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true },
        (err, res) => {
    if (err) throw err;
    console.log('Connect db is ok');
});

// port on server
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
})