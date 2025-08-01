import connectToDatabase from "@/lib/mongoose"
import User from "@/models/User"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

export async function GET() {
  await connectToDatabase()

  const users = await User.find({}).populate('blogs')
  return NextResponse.json(users)
  
}

export async function POST(request){
  await connectToDatabase()
  const {username, name, password} = await request.json()

  if(!username || !password) return NextResponse.json({error: 'no username or password'})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const savedUser = await User.create({username, name, passwordHash})
  return NextResponse.json(savedUser)
}