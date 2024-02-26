import firebase from 'firebase/app'
import "firebase/auth"

const firebaseConfig = {
  apiKey: 'AIzaSyCLGhY4GzLU_3QVuQq08Hy8JuqGrYw_-_k',
  authDomain: 'music-131cd.firebaseapp.com',
  projectId: 'music-131cd',
  storageBucket: 'music-131cd.appspot.com',
  messagingSenderId: '14774380498',
  appId: '1:14774380498:web:9365566b689cef285e8a0b'
}

export default firebase.initializeApp(firebaseConfig);
