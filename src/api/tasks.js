// import fetch from 'whatwg-fetch'

export async function getTasksData() {
  try {
    const response = await fetch('/api/tasks.json')
    return await response.json()
  } catch (e) {
    console.log('error', e)
    return null
  }
}
