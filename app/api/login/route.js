import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'

export async function POST(request , context){
  await connectToDatabase()

  try {
    const { username, password } = await request.json()

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false 
      : await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
      return NextResponse.json({ error: 'invalid username or password' }, { status: 401 })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      { expiresIn: 60*60}
    )

    return NextResponse.json({token, username: user.username, name: user.name})

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

}