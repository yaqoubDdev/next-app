'use client'
import LoginForm from "@/app/components/LoginForm"
import loginservice from "@/services/login"
import blogservice from "@/services/blogservice"
import { useUser } from '@/app/context/UserContext'
import { useRouter } from "next/navigation"


export default function  page(){
  const router = useRouter()
  const { setUser } = useUser()

  const handleLogin = async (credendials) => {
    try {
      const user = await loginservice.login(credendials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogservice.setToken(user.token)
      if (setUser) setUser(user)
      router.push('/')
    } catch (exception) {
      console.log(exception)
    }

  }

  const handleErrNoti = (msg) => {
    console.log(msg)
  }
  
  return(
    <div className="flex justify-center items-center">
      <LoginForm handleLogin={handleLogin} handleErrNoti={handleErrNoti}></LoginForm>
    </div>
  )

}