import jwt from 'jsonwebtoken'

export function getTokenFrom(request) {
  const auth = request.headers.get('authorization') 
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

export function getUserFromToken(token){
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) throw new Error ('Token missing or invalid')
    return decodedToken
  } catch (error) {
    return null
  }
}