// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import admin from 'firebase-admin'
// import { getDatabase } from 'firebase/database'
//import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration

import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  where,
  getDocs,
  query,
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
  users: {
    async get() {
      try {
        let nextPageToken
        let allUsers = []

        do {
          const listUsersResult = await admin
            .auth()
            .listUsers(1000, nextPageToken)
          allUsers = allUsers.concat(listUsersResult.users)
          nextPageToken = listUsersResult.pageToken
        } while (nextPageToken)

        console.log('Successfully fetched all users:', allUsers)

        return allUsers
      } catch (error) {
        console.error('Error listing users:', error)
      }
    },
  },
  userRoles: {
    async setRole(uid, role) {
      const rolesRef = doc(collection(db, 'user roles'), uid)
      await setDoc(rolesRef, { role })
    },
    async getRole(uid) {
      const rolesRef = doc(collection(db, 'user roles'), uid)
      const docSnap = await getDoc(rolesRef)
      if (docSnap.exists()) {
        return docSnap.data().role
      } else {
        return null
      }
    },
  },
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

  contestants: {
    async get() {
      console.log('Fetching contestants')
      const contestantsRef = collection(db, 'Contestants')
      console.log('Contestants ref', contestantsRef)

      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          contestantsRef,
          snapshot => {
            const contestants = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }))
            resolve(contestants)
            unsubscribe()
          },
          error => {
            reject(error)
          },
        )
      })
    },

    async add(contestant) {
      const contestantsRef = collection(db, 'Contestants')

      const duplicateQuery = query(
        contestantsRef,
        where('Email', '==', contestant.Email),
        where('Name', '==', contestant.Name),
        where('Surname', '==', contestant.Surname),
      );
      const querySnapshot = await getDocs(duplicateQuery);

      if (!querySnapshot.empty) {
        throw new Error('Contestant with same email, name and surname already exists');
      }

      await addDoc(contestantsRef, contestant)
    }
  },

  results: {
    async get() {
      const resultsRef = collection(db, 'results')

      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
          resultsRef,
          //query(resultsRef, where('year', '==', year), where('set', '==', set)), // Filter by year and set
          snapshot => {
            const results = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }))
            resolve(results)
            unsubscribe()
          },
          error => {
            reject(error)
          },
        )
      })
    },

    async add(result) {
      const resultsRef = collection(db, 'results');
    
      // Define the query to check for duplicates
      const duplicateQuery = query(
        resultsRef,
        where('year', '==', result.year),
        where('set', '==', result.set),
        where('contestant', '==', result.contestant)
      );
      const querySnapshot = await getDocs(duplicateQuery);

      if (!querySnapshot.empty) {
        throw new Error('Result with the same year, set, and contestant already exists');
      }

      await addDoc(resultsRef, result);
    },
  },
}
