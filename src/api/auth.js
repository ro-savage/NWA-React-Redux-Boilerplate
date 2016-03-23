export async function validateLogin(creds) {
  console.log(creds)

  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`,
  }

  try {
    const response = await fetch('http://localhost:8081/api/v1/auth', config)

    if (response.status !== 200) {
      console.log('API error: ', response)
      return Promise.reject({
        error: {
          code: response.status,
          response,
        },
        type: 'Login failed',
        message: 'Login failed. Please try again.',
      })
    }

    const data = await response.json()
    console.log('response data', data)
    data.token = data.guid
    data.email = creds.email
    data.role = 'Admin'
    return data
  } catch (error) {
    return Promise.reject({
      error,
      type: 'Login failed',
      message: 'Your login failed. Please try again or contact support',
    })
  }
}

export async function getTasksData() {
  try {
    const response = await fetch('/api/tasks.json')
    return await response.json()
  } catch (e) {
    console.log('error', e)
    return null
  }
}

export async function validateToken(token) {
  console.log(token)
  try {
    const response = await fetch('/api/token.json')

    if (response.status !== 200) {
      console.log('API error: ', response)
      return Promise.reject({
        error: {
          code: response.status,
          response,
        },
        type: 'Not authenticated',
        message: 'Please login to use this application',
      })
    }

    return await response.json()
  } catch (error) {
    console.log('validateToken catch error', error)
    return Promise.reject({
      error,
      type: 'Login failed',
      message: 'Your login failed. Please try again or contact support',
    })
  }
}
