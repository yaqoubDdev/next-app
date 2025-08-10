'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import signupServices from "@/services/signup"
import loginServices from "@/services/login"
import { useRouter } from 'next/navigation'
import styles from '@/app/(root)/blogs.module.css'

const ErrorNotification = ({message}) => {
  if (message === null) return null
  return (
    <div className={styles.error}>
      {message}
    </div>
  )
}

const SignupForm = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const signup = async (e) => {
    e.preventDefault()
    if(!name || !username || !password){
      handleErrNoti('fill from first')
      return
    }
    const user = await handleSignup({name, username, password})
    if (user) {
      const loggedUser = await loginServices.login({username, password})
      if (loggedUser.error) {
        handleErrNoti(loggedUser.error)
        return
      }
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      console.log('user logged in:', loggedUser)
      router.push('/')
    }
  }

  const handleErrNoti = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleSignup = async (user) => {
    try {
      const savedUser = await signupServices.createUser(user)
      return savedUser
    } catch (error) {
      console.error('Error signing up:', error)
      handleErrNoti('Error signing up, please try again')
    }
  }

  return(
    <>
      <ErrorNotification message={errorMessage} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup Form </CardTitle>
          <CardDescription>
            Enter name, username and password below to signup. if you already have an account, click login.
          </CardDescription>
          <CardAction>
            <Link href='/'>
              <Button variant='link'>Login</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* <LoginForm /> */}
          <form onSubmit={signup}>
            <div className="grid w-full gap-3"> 
              <Label htmlFor='name'>name</Label>
              <Input
                placeholder='Name'
                type="text"
                value={name}
                id='name'
                onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div className="grid w-full gap-3 mb-3 mt-3"> 
              <Label htmlFor='username'>username</Label>
              <CardDescription className='p-0 m-0 text-red-500'>
                Username should be unique
              </CardDescription>
              <Input
                placeholder='Username'
                type="text"
                value={username}
                id='username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="grid w-full gap-3">
              <Label htmlFor='password'>password</Label>
              <Input
                placeholder='password'
                type="password"
                value={password}
                id='password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className='grid w-full gap-3 my-3'>
              <Button type="submit" className='w-full'>signup</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </>
  )
}

export default SignupForm
