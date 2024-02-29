import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCLGhY4GzLU_3QVuQq08Hy8JuqGrYw_-_k',
  authDomain: 'music-131cd.firebaseapp.com',
  projectId: 'music-131cd',
  storageBucket: 'music-131cd.appspot.com',
  messagingSenderId: '14774380498',
  appId: '1:14774380498:web:9365566b689cef285e8a0b'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

const usersCollection = db.collection('users')

export {
    auth,
    db,
    usersCollection,
    storage

}