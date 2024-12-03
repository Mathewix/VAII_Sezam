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
