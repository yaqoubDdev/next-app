import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          username
          <Input
            placeholder='Username'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <Input
            placeholder='Username'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </>
  )
}

export default LoginForm