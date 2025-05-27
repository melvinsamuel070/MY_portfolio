// Import and initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCnfOuVWEsso0S0McNzjVYz6UPyHa_X4RU",
  authDomain: "melvin-portfolio-52b34.firebaseapp.com",
  projectId: "melvin-portfolio-52b34",
  storageBucket: "melvin-portfolio-52b34.appspot.com",
  messagingSenderId: "772682595818",
  appId: "1:772682595818:web:f2262873404b3cc25b0693",
  measurementId: "G-50K3M8K5BQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Export Firestore and Storage references for use in other scripts
const db = firebase.firestore();
const storage = firebase.storage();
