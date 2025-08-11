import jwt from "jsonwebtoken"
import User from "@/models/User"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"

// Extract Bearer token from Authorization header
function getTokenFrom(request) {
  const auth = request.headers.get('authorization') || request.headers.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

export async function GET(_, context){
  await connectToDatabase()
  const { params } = await context
  const blog = await Blog.findById(params.id)
  return NextResponse.json(blog)
}

export async function DELETE(request, context){
  await connectToDatabase()
  const { params } = await context
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

  const userid = decodedToken.id
  const blog = await Blog.findById(params.id)

  if(!blog){
    return NextResponse.json({error: 'Blog not found'}, {status: 404})
  }

  if( blog.user.toString() === userid.toString()){
    await Blog.findByIdAndDelete(params.id)
    return NextResponse.json({message: `deleted blog ${params.id}`},  {status: 201})
  }

  return NextResponse.json({error: 'unauthorized id'}, {status: 401})



}