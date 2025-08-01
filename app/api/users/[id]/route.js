import connectToDatabase from "@/lib/mongoose"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET(_, context) {
  const { params } = await context
  await connectToDatabase()
  
  const user = await User.findById(params.id).populate('blogs')
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(request, context) {
  const { params } = await context
  await connectToDatabase()
  
  const updates = await request.json()
  const updatedUser = await User.findByIdAndUpdate(params.id, updates, { new: true })
  if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 })
  return NextResponse.json(updatedUser)
}

export async function DELETE(_, context) {
  const { params } = await context
  await connectToDatabase()
  
  const deletedUser = await User.findByIdAndDelete(params.id)
  if (!deletedUser) return NextResponse.json({ error: "User not found" }, { status: 404 })
  return NextResponse.json({ message: "User deleted" })
}
