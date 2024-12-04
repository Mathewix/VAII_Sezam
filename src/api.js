import axios from 'axios'

const url = 'http://localhost:5000'

export const getInstructors = async () => {
  try {
    const result = await axios.get(url)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/create', instructor)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/update', instructor)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/delete', instructor)
    console.log('THE RESULT: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}
