const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
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

// get all user
app.get('/api/users/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Auth');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    Name: doc.data().Name,
                    NIP:  doc.data().NIP,
                    Address:  doc.data().Address,
                    Position:  doc.data().Position,
                    PhoneNumber:  doc.data().PhoneNumber,
                    Password:  doc.data().Password
                };
                response.push(selectedItem);
            }
            });
                return res.status(200).send(response);
            } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// end get all user

// get user by id
app.get('/api/users/read/:userId', (req, res) => {
    (async () => {
        try {
            const document = db.collection('items').doc(req.body.user_id);
            let user = await document.get();
            let response = user.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
// end get user by id
exports.app = functions.https.onRequest(app);