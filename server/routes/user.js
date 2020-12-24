const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const _ = require('underscore');

const app = express();

const salt = bcrypt.genSaltSync(10); // 10-step encryption

// ALL REGISTER
app.get('/user', (req, res) => {

    const since = req.query.since || 0;

    const limit = req.query.limit || 10;

    User.find( { status: true }, 'name email google status role img')
        .skip(Number(since))
        .limit(Number(limit))
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.count({ status: true }, ( err, counter ) => { // Number of records
                res.json({
                    counter,
                    ok: true,
                    users,
                })
            })

            

        })

})

// Insert Register
app.post('/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        role: body.role,
    })

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        // userDB.password = null;
        res.json({
            ok: true,
            user: userDB
        })
    })

})

// Update Register
app.put('/user/:id', (req, res) => {

    let id = req.params.id; // ID user

    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']); // field filter for update

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userBD
        });

    })

})

// Logical Delete
app.delete('/user/delete/:id', (req, res) => {

    const id = req.params.id;

    User.findByIdAndUpdate(id, { status: false }, {new: true}, (err, userDelete) => {

        if( err ){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        if( userDelete.status === false ){
            return res.status(400).json({
                ok:false,
                err: {
                    message:'User not Found'
                }
            })
        }

        res.json({
            ok:true,
            user: userDelete
        })

    })

})


// Remove Register
app.delete('/user/:id', (req, res) => {
    
    const id = req.params.id

    User.findByIdAndRemove( id , (err, userDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if( !userDelete ){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'User not found'
                }
            })
        }

        res.json({
            ok: true,
            user: userDelete
        })

    })


})

module.exports = app;