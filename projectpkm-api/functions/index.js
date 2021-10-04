const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();

const serviceAccount = require('./permission.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://projectpuskesmas.firebaseio.com"
})

const db = admin.firestore();

app.use(cors({ origin: true }));

// User
// Create User
app.post('/api/users/create', (req,res) => {
    (async () => {
        try {
            await db.collection('Auth').doc(req.body.userId)
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
// End Create User

// Get All User
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

// End Get All User

// Get User By Id
app.get('/api/users/read/search/id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Auth').doc(req.body.userId);
            let user = await document.get();
            let response = user.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
// End Get User By Id


//Get User By Username
app.get('/api/users/read/search/name', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Auth').where("Name", "==", req.body.name);
            let searchUser = await query.get()
            let response = [];
            if (searchUser.empty) {
                return res.status(200).send('No matching Users');
              }  
              searchUser.forEach(doc => {
                response.push(doc.id, '=>', doc.data());
              });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
});
//End Get User By Username

// Update Users
app.put('/api/users/update', (req, res) => {
    (async() => {
            try {
                const userUpdate = db.collection('Auth').doc(req.body.userId);
                await userUpdate.update({
                    Name: req.body.name,
                    NIP:  req.body.nip,
                    Address:  req.body.address,
                    Position:  req.body.position,
                    PhoneNumber:  req.body.phoneNumber,
                    Password:  req.body.password
                })
                return res.status(200).send('User Data Has Been Changed');
            }
            catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
    })();
});
// End Update Users

// Delete Users
app.delete('/api/users/delete', (req, res) => {
    (async () => {
        try {
            const usersDelete = db.collection("Auth").doc(req.body.userId);
            await usersDelete.delete();
            return res.status(200).send('User Has Been Deleted !');
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
// End Delete Users
// End User
exports.app = functions.https.onRequest(app);