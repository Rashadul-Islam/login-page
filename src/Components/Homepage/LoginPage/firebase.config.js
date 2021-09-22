
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";



initializeApp({
  apiKey: "AIzaSyDJTB6lGxrtEv_N29AQjdtfrHedO_Pe1iE",
  authDomain: "najj-technology.firebaseapp.com",
  projectId: "najj-technology",
  storageBucket: "najj-technology.appspot.com",
  messagingSenderId: "342837155670",
  appId: "1:342837155670:web:023a27a22737c6b71028f7"
});

export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const googleSIgnIn = () => {
  signInWithPopup(auth, googleProvider)
    .then(res => {
      alert("Success!!!")
    })
    .catch(err => {
      console.log(err.message);
    })
}

const fbProvider = new FacebookAuthProvider();
export const fbSIgnIn = () => {
  signInWithPopup(auth, fbProvider)
    .then(res => {
      console.log(res);
      alert("Success!!!");
    })
    .catch(err => {
      console.log(err.message);
    })
}

// export const linkedIn = () => {
//   fetch('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78etmt5iv3t8p8&scope=r_liteprofile&state=987654321&redirect_uri=http://localhost:3000/')
//     .then(res => {
//       alert("success!!!");
//     })
//     .catch(err => {
//       console.log(err.message);
//     })
// }