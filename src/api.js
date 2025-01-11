import axios from 'axios'

const url = 'http://localhost:5000'

// Users
export const getUsers = async () => {
  try {
    const result = await axios.get(url + '/users')
    console.log('Users: ', result)
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
    console.log('User role: ', result);
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
    console.log('Instructors: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/createInstructor', instructor)
    console.log('Added instructor: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/updateInstructor', instructor)
    console.log('Updated instructor: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteInstructor = async instructor => {
  try {
    const result = await axios.post(url + '/deleteInstructor', instructor)
    console.log('Deleted instrucotr: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

// Contestants
export const getContestants = async () => {
  try {
    const result = await axios.get(url + '/contestants')
    console.log('Contestants: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const addContestant = async contestant => {
  try {
    const result = await axios.post(url + '/addContestant', contestant)
    console.log('Added contestant: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}

// Results
export const getResults = async () => {
  try {
    const result = await axios.get(url + '/results')
    console.log('The results: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return []
  }
}


export const addResult = async resultData => {
  try {
    const result = await axios.post(url + '/addResult', resultData)
    console.log('Added result: ', result)
    return result.data
  } catch (error) {
    console.error(error)
    return null
  }
}
