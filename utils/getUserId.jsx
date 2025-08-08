import {jwtDecode} from 'jwt-decode'

export function getUserIdFromToken(token) {
  const userJSON = localStorage.getItem('loggedBlogappUser')
  if (!userJSON) return null

  let user
  try {
    user = JSON.parse(userJSON)
  } catch {
    return null
  }

  if (!user || !user.token) return null

  try {
    const decoded = jwtDecode(user.token)
    return decoded.id
  } catch {
    return null
  }
}
