"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useUser } from "@/app/context/UserContext"
import blogservice from "@/services/blogservice"

export default function NavBar() {
  const router = useRouter()
  const { user, setUser } = useUser()

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogservice.setToken(null)
    console.log('logged out')
    router.refresh()
  }

  return (
    <nav className="w-full h-16 flex items-center justify-between px-4">
      <span className="text-2xl font-bold no-underline hover:underline">
        <Link href={'/'}>Blog App</Link>
      </span>
      {user?.name ? (
        <div>
          <span>{user.username} </span>
          <Button onClick={handleLogout}>logout</Button>
        </div>
      ) : (
        <div>
          <Button className='ml-2'>
            <Link href='/login'>Login</Link>
          </Button>
          <Button className='ml-2'>
            <Link href='/signup'>Signup</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}