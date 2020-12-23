const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./config/config')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/user', (req, res) => {
    res.json('get user');
})

app.post('/user', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            message: 'the name is required'
        })

    } else {
        res.json({ body });
    }

})

app.put('/user/:id', (req, res) => {

    let id = req.params.id;

    res.json({
        id,
    });
})

app.delete('/user', (req, res) => {
    res.json('delete');
})

app.listen( process.env.PORT , () => {
    console.log(`Server on port ${process.env.PORT}`)
})