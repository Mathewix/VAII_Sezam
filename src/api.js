import axios from 'axios'

const url = 'http://localhost:5000'

// Users
export const getUsers = async () => {
  try {
    const result = await axios.get(url + '/users')
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const setRole = async (user, role) => {
  try {
    await axios.post(url + '/setRole', {
      uid: user.uid,
      role: role, // Selected role
    })
    alert(`User role updated to ${user.role}`)
  } catch (error) {
    console.error('Error updating role:', error)
    alert('Failed to update role!')
  }
}

// Instructors
export const getInstructors = async () => {
  try {
    const result = await axios.get(url + '/instructors')
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/createInstructor', instructor)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/updateInstructor', instructor)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/deleteInstructor', instructor)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}


