import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    if(!username || !password){
      alert('fill from first')
      return
    }
    handleLogin({username, password})
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
        <form onSubmit={login}>
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
          <div className='grid w-full gap-3 my-3'>
            <Button type="submit" className='w-full'>login</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

export default LoginForm