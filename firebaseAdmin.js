const firebaseAdmin = require("firebase-admin");
const serviceKey = require("./firebase-admin-servicekey.json");
const functions = require("firebase-functions");

const db = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceKey),
  databaseURL: "https://safety-champion-b1715.firebaseio.com",
});

module.exports = {
  db,
};
