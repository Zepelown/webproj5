const firebase = require("../firebaseAdmin");
const User = require("../models/user");
const firestore = firebase.db.firestore();
const UserMarker = require("../models/userMarker");

// const newPlace = {
//   danger: true,
//   desc: "test",
//   lat: "35.136121",
//   lng: "129.101008",
//   placename: "test",
// };

const addUserMarker = async (req, res, next) => {
  try {
    const data = req.body;
    const id = data.placename;
    console.log(data);
    const result = await firestore
      .collection("reviews")
      .doc(data.placename)
      .set(data);
    res.send("Record saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUserMarker = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection("reviews").get();
    const data = snapshot;
    const userMarkerArray = [];
    if (data.empty) {
      res.status(404).send("No User Record found");
    } else {
      snapshot.forEach((doc) => {
        const user_marker_data = new UserMarker(
          doc.data().placename,
          doc.data().desc,
          doc.data().danger,
          doc.data().lat,
          doc.data().lng
        );
        userMarkerArray.push(user_marker_data);
      });
      res.send(userMarkerArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    const id = data.name;
    console.log(data);
    const user = await firestore.collection("user").doc(id).set(data);
    res.send("Record saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const snapshot = await firestore.collection("user").get();
    const data = snapshot;
    const usersArray = [];
    if (data.empty) {
      res.status(404).send("No User Record found");
    } else {
      snapshot.forEach((doc) => {
        const user_data = new User(doc.data().name, doc.data().age);
        usersArray.push(user_data);
      });
    }
    res.send(usersArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const newUserData = req.body;
    const userID = req.params.id;
    const userSnapshot = await firestore.collection("user").doc(userID);
    const userData = await userSnapshot.get();

    if (!userData.exists) {
      res.status(404).send("User with given ID not found");
    } else {
      userSnapshot.update(newUserData);
      res.send(`Update Successfully\n
      Updated User ID : ${userID}\n
      new User Data : {
        name : ${req.body.name},
        age : ${req.body.age}
      }
      `);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const signIn = async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
    phone: req.body.phone,
    name: req.body.name,
    photoURL: req.body.photo,
  };

  firebase.auth
    .createUser({
      email: newUser.email,
      emailVerified: false,
      phoneNumber: newUser.phone,
      password: newUser.password,
      displayName: newUser.name,
      photoURL: newUser.photoURL,
      disabled: false,
    })
    .then((data) => {
      return res
        .status(201)
        .json({ message: `user ${data.uid} signed up successfully` });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

const login = async (req, res, next) => {
  firebase.app
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((result) => {
      const credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log("로그인 완료!");
    })
    .catch((err) => {
      console.log("실패!");
    });
};

module.exports = {
  addUser,
  getAllUser,
  updateUser,
  login,
  signIn,
  addUserMarker,
  getAllUserMarker,
};
