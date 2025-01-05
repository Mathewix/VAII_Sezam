// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import admin from 'firebase-admin';
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

// const serviceAccount = {
//   type: 'service_account',
//   project_id: 'sezam-be',
//   private_key_id: '994a6b940569b0d61af31efd3aff35c3501a3a3d',
//   private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4hSnhSc8uccjh\n9oycMMvVhmANejhoWZ5XYUucALkUrFsUUFzyMjzG2x62gcjoa+3+f4JLqER86M75\nNoIzkHUc3UZKzu0ViTTwlfCFcJUZZRbeKkPMUiMR37FvzRlTkOOt5Kf+I1m/eWLV\n2icYhh+TPo2sGOV4XQwNjNvG8Cuito9uEc/rO3tuI3LUHzy8cyL0tFHyHe+yMR3a\nUsy84hKyTKNQ+qPUpv9I5StFJKlk6ILu+6AYzF0Awmqi/THI9jW2+PHEKOfOyEHj\nZwUOpzM6xALI4tBbYfHgwSsWWiuG/dYaxLyTLyvVXJ2512v2WKczhmecm8GEdfTM\n/k2DGq1lAgMBAAECggEAUPeR1Hs0T897E/hBZAofb18rB87xMIzep74YVOiWTkWB\nI81Ns7MqqyGcfP4/QAmYIbwm2vcHsn3f0EhEYscJNLS98vaQ3wnZcpaAt7Uan82V\ndsA6Bs6l9+Jd9E6dxecGmRgERUaSy6vCnE9BJ4g3E7/3n6Q/EQ1XTBzalZVuuFM/\nQw+LG4/zbMSj3S2Wlv6NJuC8t134iYXot27OCXM0bU9ZQ3RxP3U+13d7WSTh50TQ\nBELQgZs+Z+2+7yC9nyYkPph6WKxaFF8XxPYXvkc+vzL/ZHbGGbKL28Ppsq0sckcM\nll67LrN2dhwnziZ2/6rvb639jbECaT58gXQnBbNmwwKBgQDnyfPIftMuSrLD2HLW\ngMKGXGbQyYLq8GCzWVduTtgFwE+F8TMduTFuYON+K7qiXn2t1oSESzwqPXmDvuEa\nf6a8mnJts5EEiwfvVzAn7fWJFW7OgFYGEgx97FdPnQwVKFybqlCUbXequ0CuJEo4\niJRlaJO/YJR0E+Dgi3QZcJzHKwKBgQDLyz5R0Ra8k5U2OWsWVjUwMhKoJyuvrjQU\nutKX6ZMxGuwX6hxPNHTI0WkLLwRv5gMTpkIbpwB+Jw2JGJJ/wKvAn61Q3Qx/Yca4\nxOmcNNW+i5oAsk32rBZNLd+ofJhwwb2T9pUJNqEeZCe2yVrAdTtH1hJVPB3yxlvV\nGeOKNsgVrwKBgHrrk3fZIh8jiAfqSoRMxlxAtlm089Op5G5YS9B4yYDLSqDql8QE\niR1TDnHDuPcQiy/cWmxaBa8U6NMgL/pAhejxMwvQNXCmVm/r2eLjA9pN3nRuhLA1\ndCB3bJoQ2+6AeBQpTxBXuSV2pkdzgVTXwXLB8dCE5FVmkVQjQE+Zc9r/AoGAQEdP\n1cCMWlh2ZM8Bft8cEaKJje4k8lmQ5cTzbaTnn0JtmzFlUnoqJ7kdV8CxtpWm/Mig\n61XmauPoegh9FLxxr+TtZqcCLR9q7ZZ2VKW5kUs4/OVAgABRXHCOrfb2ogIJyKSq\n52gKs6pFeHrUHAYd94+G4sl+bLex+WocAdk7jNMCgYEA3QExPFiCz14Z83pb6FMw\nyswQZR9Msx+4qNWByx62sNIX7Rr214Rt45GvFLDfWfqjWQ2riL0sEIGPsWCy6w9q\nw5SO4i8tytQrTuFY5Zld4uinRkg1wVWq7KSsCmoqhaMVcuI9Ehoau/RcYAUFvtR5\nyWIAUidpPMQuLpPhcw4eWWc=\n-----END PRIVATE KEY-----\n',
//   client_email: 'firebase-adminsdk-7wpl0@sezam-be.iam.gserviceaccount.com',
//   client_id: '101301838818730405821',
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7wpl0%40sezam-be.iam.gserviceaccount.com',
//   universe_domain: 'googleapis.com'
// }

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });



export const SezamDb = {
  users: {
    async get() {
      try {
        let nextPageToken;
        let allUsers = [];

        do {
          const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
          allUsers = allUsers.concat(listUsersResult.users);
          nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        console.log('Successfully fetched all users:', allUsers);

        return allUsers;
      } catch (error) {
        console.error('Error listing users:', error);
      }
    }
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
}
