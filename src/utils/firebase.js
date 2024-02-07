// files not related to React will be put un the utils folder
import firebase from "firebase/compat/app";  // firebase version 9 need to use .../compat/app

// below firebaseConfig from firebase settings/general/...
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJPuFruex_2YSNJXQIqxWeGC293nlcpgk",
    authDomain: "kai-social-platform.firebaseapp.com",
    projectId: "kai-social-platform",
    storageBucket: "kai-social-platform.appspot.com",
    messagingSenderId: "839649877323",
    appId: "1:839649877323:web:e96b1cdf814b5373551cce",
    measurementId: "G-50E1BC9RNL"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// export firebase, so that fairebase can be called and used in React
export default firebase;