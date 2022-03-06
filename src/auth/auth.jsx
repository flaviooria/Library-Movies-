import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { getDatabase, ref, set } from 'firebase/database';

const oAuthServices = {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  getDatabase,
  ref,
  set,
};

const _firebaseConfig = {
  apiKey: 'AIzaSyBYHFKfqmPSsYK5_faV0CFXpZ8rsxxLoto',
  authDomain: 'playlist-creator-46da6.firebaseapp.com',
  projectId: 'playlist-creator-46da6',
  storageBucket: 'playlist-creator-46da6.appspot.com',
  messagingSenderId: '284538167302',
  appId: '1:284538167302:web:d082e7c418686a0fefe387',
  databaseURL:
    'https://playlist-creator-46da6-default-rtdb.europe-west1.firebasedatabase.app/',
};

class AppAuth {
  static getInstance = () => initializeApp(_firebaseConfig);

  static services = () => oAuthServices;
}

export default AppAuth;
