const firebase = require("firebase-admin");
const functions = require("firebase-functions");
const config = require("./config");
// const {
//   getAuth, // authentication ����
//   signInWithPopup, //google �α����� �˾�â�� ���� ����
//   GoogleAuthProvider, //google login ���
//   signInWithEmailAndPassword, // email �α���
//   createUserWithEmailAndPassword, //email ȸ������
// } = require("firebase/auth");
// const {
//   addUser,
//   getAllUser,
//   updateUser,
// } = require("../controllers/userController");

const db = firebase.initializeApp(config.firebaseConfig);

// const auth = firebase.auth;

module.exports = {
  db,
};
