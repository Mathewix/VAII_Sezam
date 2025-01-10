import express from 'express'
import cors from 'cors'
import { SezamDb } from './sezamdb.js'

import admin from 'firebase-admin';


const app = express()
app.use(express.json())
app.use(cors())

const serviceAccount = {
  type: 'service_account',
  project_id: 'sezam-be',
  private_key_id: '994a6b940569b0d61af31efd3aff35c3501a3a3d',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4hSnhSc8uccjh\n9oycMMvVhmANejhoWZ5XYUucALkUrFsUUFzyMjzG2x62gcjoa+3+f4JLqER86M75\nNoIzkHUc3UZKzu0ViTTwlfCFcJUZZRbeKkPMUiMR37FvzRlTkOOt5Kf+I1m/eWLV\n2icYhh+TPo2sGOV4XQwNjNvG8Cuito9uEc/rO3tuI3LUHzy8cyL0tFHyHe+yMR3a\nUsy84hKyTKNQ+qPUpv9I5StFJKlk6ILu+6AYzF0Awmqi/THI9jW2+PHEKOfOyEHj\nZwUOpzM6xALI4tBbYfHgwSsWWiuG/dYaxLyTLyvVXJ2512v2WKczhmecm8GEdfTM\n/k2DGq1lAgMBAAECggEAUPeR1Hs0T897E/hBZAofb18rB87xMIzep74YVOiWTkWB\nI81Ns7MqqyGcfP4/QAmYIbwm2vcHsn3f0EhEYscJNLS98vaQ3wnZcpaAt7Uan82V\ndsA6Bs6l9+Jd9E6dxecGmRgERUaSy6vCnE9BJ4g3E7/3n6Q/EQ1XTBzalZVuuFM/\nQw+LG4/zbMSj3S2Wlv6NJuC8t134iYXot27OCXM0bU9ZQ3RxP3U+13d7WSTh50TQ\nBELQgZs+Z+2+7yC9nyYkPph6WKxaFF8XxPYXvkc+vzL/ZHbGGbKL28Ppsq0sckcM\nll67LrN2dhwnziZ2/6rvb639jbECaT58gXQnBbNmwwKBgQDnyfPIftMuSrLD2HLW\ngMKGXGbQyYLq8GCzWVduTtgFwE+F8TMduTFuYON+K7qiXn2t1oSESzwqPXmDvuEa\nf6a8mnJts5EEiwfvVzAn7fWJFW7OgFYGEgx97FdPnQwVKFybqlCUbXequ0CuJEo4\niJRlaJO/YJR0E+Dgi3QZcJzHKwKBgQDLyz5R0Ra8k5U2OWsWVjUwMhKoJyuvrjQU\nutKX6ZMxGuwX6hxPNHTI0WkLLwRv5gMTpkIbpwB+Jw2JGJJ/wKvAn61Q3Qx/Yca4\nxOmcNNW+i5oAsk32rBZNLd+ofJhwwb2T9pUJNqEeZCe2yVrAdTtH1hJVPB3yxlvV\nGeOKNsgVrwKBgHrrk3fZIh8jiAfqSoRMxlxAtlm089Op5G5YS9B4yYDLSqDql8QE\niR1TDnHDuPcQiy/cWmxaBa8U6NMgL/pAhejxMwvQNXCmVm/r2eLjA9pN3nRuhLA1\ndCB3bJoQ2+6AeBQpTxBXuSV2pkdzgVTXwXLB8dCE5FVmkVQjQE+Zc9r/AoGAQEdP\n1cCMWlh2ZM8Bft8cEaKJje4k8lmQ5cTzbaTnn0JtmzFlUnoqJ7kdV8CxtpWm/Mig\n61XmauPoegh9FLxxr+TtZqcCLR9q7ZZ2VKW5kUs4/OVAgABRXHCOrfb2ogIJyKSq\n52gKs6pFeHrUHAYd94+G4sl+bLex+WocAdk7jNMCgYEA3QExPFiCz14Z83pb6FMw\nyswQZR9Msx+4qNWByx62sNIX7Rr214Rt45GvFLDfWfqjWQ2riL0sEIGPsWCy6w9q\nw5SO4i8tytQrTuFY5Zld4uinRkg1wVWq7KSsCmoqhaMVcuI9Ehoau/RcYAUFvtR5\nyWIAUidpPMQuLpPhcw4eWWc=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-7wpl0@sezam-be.iam.gserviceaccount.com',
  client_id: '101301838818730405821',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7wpl0%40sezam-be.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Users
app.get('/users', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers()

    const users = await Promise.all(
      listUsersResult.users.map(async (user) => {
        const customClaims = (await admin.auth().getUser(user.uid)).customClaims || {}
        return {
          ...user.toJSON(),
          role: customClaims.role || "viewer", // Check if the user is an admin
        }
      })
    )
    res.json(users)
  } catch (error) {
    console.error('Error listing users:', error)
    res.status(500).send('Error listing users')
  }
})

// GET route to fetch the role of a user
app.get('/getUserRole', async (req, res) => {
  const { uid } = req.query

  try {
    const userRole = await SezamDb.userRoles.getRole(uid)
    res.status(200).json({ role: userRole })
  } catch (error) {
    console.error('Error fetching user role:', error)
    res.status(500).json({ msg: 'Failed to fetch user role', error: error.message })
  }
})

// POST route to set roles
app.post('/setRole', async (req, res) => {
  const { uid, role } = req.body

  try {
    await admin.auth().setCustomUserClaims(uid, { role })
    await SezamDb.userRoles.setRole(uid, role)
    res.status(200).json({ msg: 'User role updated successfully' })
  } catch (error) {
    console.error('Error setting user role:', error)
    res.status(500).json({ msg: 'Failed to update user role', error: error.message })
  }
})

// Instructors
// GET route to fetch the list of instructors
app.get('/instructors', async (req, res) => {
  try {
    const docs = await SezamDb.instructors.get()
    res.status(200).json(docs)
  } catch (error) {
    console.error('Error fetching instructors:', error)
    res
      .status(500)
      .json({ msg: 'Failed to fetch instructors', error: error.message })
  }
})

app.post('/createInstructor', async (req, res) => {
  const data = req.body

  // Validate input
  if (!data.name || !data.email) {
    return res.status(400).json({ msg: 'Name and email are required' })
  }

  try {
    // Use SezamDb to add the instructors
    await SezamDb.addInstructor(data)
    res
      .status(201)
      .json({ msg: 'Instructor added successfully', instructor: data })
  } catch (error) {
    console.error('Error adding instructor:', error)
    res
      .status(500)
      .json({ msg: 'Failed to add instructor', error: error.message })
  }
})

// POST route to update an instructor
app.post('/updateInstructor', async (req, res) => {
  const data = req.body

  // Validate input
  if (!data.name || !data.email || !data.id) {
    return res.status(400).json({ msg: 'Name and email are required' })
  }

  try {
    // Use SezamDb to update the instructor
    await SezamDb.updateInstructor(data)
    res
      .status(200)
      .json({ msg: 'Instructor updated successfully', instructor: data })
  } catch (error) {
    console.error('Error updating instructor:', error)
    res
      .status(500)
      .json({ msg: 'Failed to update instructor', error: error.message })
  }
})

// POST route to delete an instructor
app.post('/deleteInstructor', async (req, res) => {
  const data = req.body

  // Ensure the instructor has an ID before trying to delete
  if (!data.id) {
    return res.status(400).json({ msg: 'Instructor ID is required' })
  }

  try {
    // Use SezamDb to delete the instructor
    await SezamDb.deleteInstructor(data)
    res.status(200).json({ msg: 'Instructor deleted successfully' })
  } catch (error) {
    console.error('Error deleting instructor:', error)
    res
      .status(500)
      .json({ msg: 'Failed to delete instructor', error: error.message })
  }
})

// Contestants
// GET route to fetch the list of contestants
app.get('/contestants', async (req, res) => {
  try {
    const docs = await SezamDb.contestants.get()
    res.status(200).json(docs)
  } catch (error) {
    console.error('Error fetching contestants:', error)
    res
      .status(500)
      .json({ msg: 'Failed to fetch contestants', error: error.message })
  }
})

// Results
// GET route to fetch the list of results
app.get('/results', async (req, res) => {
  const { year, set } = req.query
  const numberYear = parseInt(year, 10);
  try {
    const docs = await SezamDb.results.get(numberYear, set)
    res.status(200).json(docs)
  } catch (error) {
    console.error('Error fetching results:', error)
    res
      .status(500)
      .json({ msg: 'Failed to fetch results', error: error.message })
  }
})

// Start the server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
