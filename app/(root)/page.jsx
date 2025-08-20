'use client'
import { useState, useEffect, useRef } from "react"
import blogservice from "@/services/blogservice"
import loginservice from "@/services/login"
import styles from './blogs.module.css'
import Togglable from "../components/Toggable"
import LoginForm from "../components/LoginForm"
import BlogForm from "../components/BlogForm"
import Blog from '../components/Blog'
import { Button } from "@/components/ui/button"
import auth from "@/services/auth"
import Link from "next/link"

// export const metadata = {
//   title: 'Blogs',
//   description: 'Blog application built with Next.js',
// }

// export const revalidate = 100 // to prevent caching of the page

const Notification = ({message}) => {
  if (message === null) return null
  return (
    <div className={styles.message}>
      {message}
    </div>
  )
}
const ErrorNotification = ({message}) => {
  if (message === null) return null
  return (
    <div className={styles.error}>
      {message}
    </div>
  )
}






const page = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [erorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    async function checkUserToken() {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON)
        try {
          const res = await  auth.checkUser(user.token)
          console.log(res)

          user.id = res.user.id
          user.username = res.user.username
          user.name = res.user.name
          setUser(user)
          blogservice.setToken(user.token)
          handleNoti(`logged in user: ${user.name}`)
        } catch (error) {
          console.log(error)
          if(error.status === 401){
            handleLogout()
          }
        }
      } else {
        handleNoti('welcome, login or signup to use app')
      }
    }

    checkUserToken()
  }, [])

  

  useEffect(() => {
    async function getBlogs(){
      try {
        const data = await blogservice.getAllBlogs()
        setBlogs(data) 
      } catch (error) {
        console.log(error)
      }
    }
    getBlogs()
  }, [])

  const handleNoti = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const handleErrNoti = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (credendials) => {
    try {
      const user = await loginservice.login(credendials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogservice.setToken(user.token)
      setUser(user)
      handleNoti('login succesful')
    } catch (exception) {
      console.log(exception)
      handleErrNoti('wrong username or password')
    }

  }

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    let savedBlog = null
    try {
      savedBlog = await blogservice.createNewBlog(blog)
      console.dir(savedBlog)
    } catch (error) {
      handleErrNoti(error.response.data)
    }
    if (!savedBlog) {
      handleErrNoti('blog not created')
      return
    }

    setBlogs(b => [...b, savedBlog])
    handleNoti(`created blog: ${savedBlog.title}`)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogservice.setToken(null)
  }

  const handleDeleteBlog = async (id, title) => {
    try {
      const res = await blogservice.deleteBlog(id)
      
      if(res.status === 201){
        setBlogs(blogs.filter(blog => blog.id !== id))
        handleNoti(`deleted blog: ${title}`)
      }
    } catch (error) {
      handleErrNoti('token invalid or expired')
    }
  }


  const loginForm = () => {

    return (

        <Togglable buttonLabel='login' >
            <LoginForm
              handleLogin={handleLogin}
              handleErrNoti={handleErrNoti}
            />
        </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm 
          createBlog={handleCreateBlog}
          handleErrNoti={handleErrNoti}
        />
      </Togglable>
    )
  }

  const reverseIndexBlogs = [...blogs].reverse()

  return (
    <div>
      <ErrorNotification message={erorMessage} />
      <Notification message={notification} />
      {user === null ?
        <div>
          <Button className='mb-2 mt-2'><Link href='/signup'>Signup</Link></Button>
          {loginForm()}
        </div> : 
        <div>
          <span>{user.name} logged in</span><Button onClick={handleLogout}>logout</Button>
          {blogForm()}
        </div>
      }
      
      
      <h2>Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reverseIndexBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDeleteBlog} />
        ))}
        
      </div>
      
    </div>
  )
}

export default page
