const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const { createUser } = require('../controller/user');
const { customAlphabet } = require("nanoid");

const app = express();

const serviceAccount = require('./permission.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://projectpuskesmas.firebaseio.com"
})

const db = admin.firestore();

app.use(cors({ origin: true }));
// create user
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',20);

const postId = nanoid();

app.post('/api/users/create', (req,res) => {
    (async () => {
        try {
            await db.collection('Auth').doc(postId)
                .create({
                    Name: req.body.name,
                    NIP: req.body.nip,
                    Address: req.body.address,
                    Position: req.body.position,
                    PhoneNumber: req.body.phoneNumber,
                    Password: req.body.password
                });
            return res.status(200).send('Create Success')
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
// end create user
exports.app = functions.https.onRequest(app);