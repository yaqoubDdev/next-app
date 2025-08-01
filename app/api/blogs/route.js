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

export async function GET() {
  await connectToDatabase()
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return NextResponse.json(blogs)
}

export async function POST(request) {
  await connectToDatabase()
  const body = await request.json()
  const token = getTokenFrom(request)
  console.log(body)


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

  const { title, content, imageUrl } = body
  if (!content) {
    return NextResponse.json({ error: 'Content missing' }, { status: 400 })
  }

  const blog = new Blog({
    title,
    content,
    imageUrl,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await savedBlog.populate('user', {username: 1, name: 1, _id: 1})

  return NextResponse.json(savedBlog, { status: 201 })
}
