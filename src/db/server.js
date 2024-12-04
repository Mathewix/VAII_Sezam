import express from 'express'
import cors from 'cors'
import { SezamDb } from './sezamdb.js'

const app = express()
app.use(express.json())
app.use(cors())

// GET route to fetch the list of instructors
app.get('/', async (req, res) => {
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

app.post('/create', async (req, res) => {
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
app.post('/update', async (req, res) => {
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
app.post('/delete', async (req, res) => {
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

// Start the server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
