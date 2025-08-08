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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogservice.setToken(user.token)
      handleNoti(`logged in user: ${user.name}`)

    }
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
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogservice.createNewBlog(blog)
      setBlogs(b => [...b, savedBlog])
      handleNoti(`created blog: ${savedBlog.title}`)
    } catch (error) {
      handleErrNoti(error.response.data)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogservice.setToken(null)
  }

  const handleDeleteBlog = async (id) => {
    try {
      const res = await blogservice.deleteBlog(id)
      
      if(res.status === 201){
        setBlogs(blogs.filter(blog => blog.id !== id))
        handleNoti(`deleted blog: ${id}`)
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
            />
        </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm 
          createBlog={handleCreateBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <ErrorNotification message={erorMessage} />
      <Notification message={notification} />
      {user === null ?
        loginForm() : 
        <div>
          <span>{user.name} logged in</span><Button onClick={handleLogout}>logout</Button>
          {blogForm()}
        </div>
      }
      
      
      <h2>Blogs</h2>
      <div className=" w-full flex gap-5 flex-wrap justify-around">
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDeleteBlog} />
        ))}
        
      </div>
      
    </div>
  )
}

export default page
