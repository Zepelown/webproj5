// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

import firebaseConfig from "./firebaseConfig.json" assert { type: "json" };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const $logIn = document.querySelector(".GoogleLogIn");
const $logOut = document.querySelector(".GoogleLogOut");

$logIn.addEventListener("click", () => {
  console.log("test?");
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("로그인 완료!!");
      var user = result.user;
      console.log(user);
      localStorage.setItem("nickName", user.displayName);
    })
    .catch((err) => {
      console.log("로그인 실패!");
    });
});

$logOut.addEventListener("click", () => {
  signOut(getAuth(app))
    .then(() => {
      console.log("로그아웃 완료!");
      location.reload();
    })
    .catch((err) => {
      console.log("로그아웃 실패!");
    });
});
