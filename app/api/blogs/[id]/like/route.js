import { getTokenFrom, getUserFromToken } from "@/utils/utils"
import User from "@/models/User"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"

export async function PUT(request, { params }){
  await connectToDatabase()
  const token = getTokenFrom(request)
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  const decoded = getUserFromToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Token invalid or expired' }, { status: 401 })
  }

  const userId = decoded.id
  const blogId = params.id

  const blog = await Blog.findById(blogId)
  const user = await User.findById(userId)

  if(!blog || !user){
    return NextResponse.json({error: 'Blog or User not found'}, {status: 404})
  }
  
  const hasLiked = blog.likes.includes(userId)
  if (hasLiked) {
    blog.likes.pull(userId)
    user.likedBlogs.pull(blogId)
  } else {
    blog.likes.push(userId)
    user.likedBlogs.push(blogId)
  }

  await blog.save()
  await user.save()

  return NextResponse.json({ liked: !hasLiked, blogLikesCount: blog.likes.length })
}