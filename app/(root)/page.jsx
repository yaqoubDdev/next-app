'use client'
import { useState, useEffect } from "react"
import blogservice from "@/services/blogservice"
import loginservice from "@/services/login"
import styles from './blogs.module.css'
import Togglable from "../components/Toggable"
import LoginForm from "../components/LoginForm"
import BlogForm from "../components/BlogForm"

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

const Blog = ({blog}) => {

  return (
    <div className={styles.blog}>
      <div className={styles.namesContainer}>
        <span>{blog.user.name}</span>
        <span>{blog.user.username}</span>
      </div>
      <div className={styles.infoContainer}>
        <h3>{blog.title}</h3>
        <p>{blog.content}</p>
      </div>
    </div>
  )
} 




const page = () => {

  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState({title: '', content: ''})
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [erorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogservice.setToken(user.token)
      handleNoti(`logged in user: ${user.name}`)

    }
  }, [])

  useEffect(() => {
    async function getBlogs(){
      try {
        const data = await blogservice.getAllBlogs()
        console.log(data)
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
      const savedBlog = await blogservice.createNewBlog(blog)
      setBlogs(b => [...b, savedBlog])
      console.log(savedBlog)
      setBlog({title: '', content: ''})
      handleNoti(`created blog: ${savedBlog.title}`)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
      <Togglable buttonLabel='new blog'>
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
          <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      }
      
      
      <h2>Blogs</h2>
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
        
      </div>
      
    </div>
  )
}

export default page
