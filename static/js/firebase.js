// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth, // authentication ����
  signInWithPopup, //google �α����� �˾�â�� ���� ����
  GoogleAuthProvider, //google login ���
  signInWithEmailAndPassword, // email �α���
  createUserWithEmailAndPassword, //email ȸ������
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

import firebaseConfig from "./firebaseConfig.json" assert { type: "json" };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const $gmail = document.querySelector(".GoogleBtn");

$gmail.addEventListener("click", () => {
  console.log("test?");
  signInWithPopup(auth, provider).then((result) => {
    console.log("로그인 완료!!");
  });
});
