// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
// import { getDatabase } from 'firebase/database'
//import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration

import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVmb5OTgZ6OrVmBZwktclYCRYYe_tLS70',
  authDomain: 'sezam-be.firebaseapp.com',
  projectId: 'sezam-be',
  storageBucket: 'sezam-be.firebasestorage.app',
  messagingSenderId: '479359667152',
  appId: '1:479359667152:web:0a421ffd362d883ac947d5',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const SezamDb = {
  instructors: {
    async get() {
      const instructorsRef = collection(db, 'Instructors')

      // Wrap the `onSnapshot` with a Promise
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          instructorsRef,
          snapshot => {
            const instructors = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }))
            resolve(instructors) // Resolve the array of instructors
            unsubscribe() // Clean up the listener
          },
          error => {
            reject(error) // Reject in case of an error
          },
        )
      })
    },
  },

  // Add instructor
  async addInstructor(instructor) {
    const instructorsRef = collection(db, 'Instructors')
    await addDoc(instructorsRef, instructor)
  },

  // Update instructor
  async updateInstructor(instructor) {
    const docRef = doc(db, 'Instructors', instructor.id)
    await setDoc(docRef, {
      name: instructor.name,
      role: instructor.role,
      description: instructor.description,
      email: instructor.email,
    })
  },

  // Delete instructor
  async deleteInstructor(instructor) {
    const docRef = doc(db, 'Instructors', instructor.id)
    await deleteDoc(docRef)
  },
}
