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

export const setRole = async (uid, role) => {
  try {
    await axios.post(url + '/setRole', {
      uid: uid,
      role: role, // Selected role
    });
    console.log(`User role updated to ${role}`);
  } catch (error) {
    console.error('Error updating role:', error);
    alert('Failed to update role!');
  }
};

export const getUserRole = async uid => {
  try {
    const result = await axios.get(url + '/getUserRole', {
      params: {
        uid: uid,
      },
    });
    console.log('THE RESULT: ', result);
    return result.data.role;
  } catch (error) {
    console.error(error);
    return null;
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


