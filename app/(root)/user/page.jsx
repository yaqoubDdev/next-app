'use client'
import LoginForm from "@/app/components/LoginForm"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import loginservice from "@/services/login"
import blogservice from "@/services/blogservice"
import { useState } from "react"


export default function  page(){

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (credendials) => {
    e.preventDefault()
    if(!username || !password){
      alert('fill from first')
      return
    }
    try {
      const user = await loginservice.login(credendials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogservice.setToken(user.token)
    } catch (exception) {
      console.log('wrong username or password')
    }

  }
  
  return(
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account </CardTitle>
        <CardDescription>
          Enter username and password below to login to your account
        </CardDescription>
        <CardAction>Sign Up</CardAction>
      </CardHeader>
      <CardContent>
        {/* <LoginForm /> */}
        <form onSubmit={() => handleLogin({username, password})}>
          <div className="grid w-full gap-3"> 
            <Label htmlFor='username'>username</Label>
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
        </form>
      </CardContent>
      <CardFooter>
          <Button type="submit" className='w-full'>login</Button>
      </CardFooter>
    </Card>
  )

}