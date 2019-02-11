const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');

const jsonParson = bodyParser.json();

const mongoose = require('mongoose');


const { PORT, DATABASE_URL } = require('./config');
const { Inventory } = require('./models/inventory');
const { User } = require('./models/user')
const jwt = require('jsonwebtoken');


const { localPassportMiddleware, jwtPassportMiddleware } = require('./users/auth-strategies');
const { JWT_SECRET, JWT_EXPIRY } = require('./config.js');

const app = express();
app.use(express.json());

const router = express.Router();


let user;

// function createJwtToken(user) {
//     return jwt.sign({ user }, JWT_SECRET, {
//         subject: user.username,
//         expiresIn: JWT_EXPIRY,
//         algorithm: 'HS256'
//     });
// }

// router.post('/api/auth/login', localPassportMiddleware, (request, response) => {
//     const user = request.user.serialize();
//     const jwtToken = createJwtToken(user);
//     response.json({ jwtToken, user });
// });

// router.post('/api/auth/login/refresh', jwtPassportMiddleware, (request, response) => {
//     const user = request.user;
//     const jwtToken = createJwtToken(user);
//     response.json({ jwtToken, user });
// });


router.get('/api/inventory', function(req, res) {
    Inventory
        .find()
        .then(inventory => {
            res.json({
                inventory: inventory.map(
                    (inventory) => inventory.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});

router.get('/api/inventory/:id', function(req, res) {
    Inventory
        .findById(req.params.id)
        .then(inventory => res.json(inventory.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something not working'})
        });
});


router.post('/api/inventory', function(req, res) {
    const requiredFields = ['item', 'description', 'location', 'category', 'decision']

    for ( let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        console.log(req.body)
        if(!(field in req.body)) {
            console.log('req body is', req.body)
            const message = `Missing \`${field}\` in request body....`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Inventory
        .create({
            item: req.body.item,
            description: req.body.description,
            location: req.body.location,
            category: req.body.category,
            decision: req.body.decision,
        })
        .then(scores => res.status(201).json(scores.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something not right'})
        });
});

router.put('/api/invntory/:id', function(req, res) {
    if(req.params.id  === req.body.id) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }
    const updated = {};
    const updateableFields = ['item', 'description', 'location', 'category', 'decision'];
    updateableFields.forEach(field => {
        if (field in req.body){
            updated[field] = req.body[field];
        }
    });
    Inventory
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedInventory => res.status(203).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }))
});

router.delete('/api/inventory/:id', function(req, res) {
    Predictions
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted inventory with id \`${req.params.id}\``);
            res.status(204).end();
        });
});

router.use('*' , function(req, res) {
    res.status(404).json({ message: 'Not found' });
});



module.exports = router;