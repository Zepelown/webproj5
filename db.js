const firebaseAdmin = require("firebase-admin");
const serviceKey = require("./firebase-admin-servicekey.json");
const functions = require("firebase-functions");
const config = require("./config");
const {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} = require("firebase-admin/auth");
const { applicationDefault } = require("firebase-admin/app");
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

// const db = app.initializeApp(config.firebaseConfig);

// module.exports = {
//   db,
// };

const db = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceKey),
  databaseURL: "https://safety-champion-b1715.firebaseio.com",
});

const auth = getAuth(db);
module.exports = {
  db,
  auth,
};
