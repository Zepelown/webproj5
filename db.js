const firebase = require("firebase-admin");
const functions = require("firebase-functions");
const config = require("./config");
// const {
//   getAuth, // authentication 설정
//   signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
//   GoogleAuthProvider, //google login 기능
//   signInWithEmailAndPassword, // email 로그인
//   createUserWithEmailAndPassword, //email 회원가입
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
