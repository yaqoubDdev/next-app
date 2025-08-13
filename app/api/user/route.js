import connectToDatabase from "@/lib/mongoose"
import Blog from "@/models/Blog"
import User from "@/models/User"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server"

// Extract Bearer token from Authorization header
function getTokenFrom(request) {
  const auth = request.headers.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}


// for checking if user token is still valid
export async function POST(request) {
  await connectToDatabase()
  const token = getTokenFrom(request)

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return NextResponse.json({ error: 'Token invalid or expired' }, { status: 401 })
  }

  if (!decodedToken.id) {
    return NextResponse.json({ error: 'Token missing or invalid' }, { status: 401 })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }
  return NextResponse.json({ user: { id: user._id, username: user.username, name: user.name } })    
}
