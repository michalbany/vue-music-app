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

// enable offline database
db.enablePersistence().catch((error) => {
  console.log('Firebase persistence error ${error.code}')
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export {
    auth,
    db,
    usersCollection,
    songsCollection,
    commentsCollection,
    storage

}