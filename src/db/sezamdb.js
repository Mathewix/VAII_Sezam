import { db } from '@/main'
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'

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
  async addInstructor() {
    const instructorsRef = collection(db, 'Instructors')
    await addDoc(instructorsRef, {
      name: 'hahu',
      role: 'mojo',
      description: 'je mojo',
    })
    //newInstructor.value = { name: '', email: '' } // Reset form
  },

  // Update instructor
  async updateInstructor() {
    const docRef = doc(db, 'Instructors', 'GfJmxrrRWMqWwGTAOoJa')
    await setDoc(docRef, { name: 'Mojmir' })
  },

  // Delete instructor
  async deleteInstructor() {
    const docRef = doc(db, 'Instructors', 'GfJmxrrRWMqWwGTAOoJa')
    await deleteDoc(docRef)
  },
}
