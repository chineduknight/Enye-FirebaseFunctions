const express = require('express');
const cors = require('cors');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid/v5');

admin.initializeApp();

const database = admin.database();
const app = express();
app.use(cors());

// POST / method
app.post('/', async (req, res) => {
  const entry = req.body;
  console.log(entry);

  try {
    await database.ref('/entries').push(entry);
    return res.status(200).send(entry);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Oh no! Error: ' + error);
  }
});

// GET / method
app.get('/', (req, res) => {
  return database.ref('/entries').on(
    'value',
    snapshot => {
      return res.status(200).send(snapshot.val());
    },
    error => {
      console.error(error);
      return res.status(500).send('Oh no! Error: ' + error);
    }
  );
});

exports.entries = functions.https.onRequest(app);

exports.userData = functions.database
  .ref('/entries/{id}')
  .onCreate(snapshot => {
    const userVal = snapshot.val();
    return snapshot.ref.update({
      id: uuid(userVal.firstName + new Date(Date.now()), uuid.URL)
    });
  });
