export async function validateLogin(creds) {
  console.log(creds)

  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  }

  try {
    const response = await fetch('http://private-9ad5c-macvadhorizon.apiary-mock.com/auth', config)
    return await response.json()
  } catch (error) {
    return Promise.reject({
      error,
      type: 'Login failed',
      message: 'Your login failed. Please try again or contact support',
    })
  }
}
