"use client"
import { useEffect, useRef, useState } from "react"
import blogservice from "@/services/blogservice"
import { useUser } from '@/app/context/UserContext'
import styles from './blogs.module.css'
import Togglable from "../components/Toggable"
import BlogForm from "../components/BlogForm"
import Blog from '../components/Blog'



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
  const { user, setUser } = useUser()
  const [notification, setNotification] = useState(null)
  const [erorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    // Show a welcome or login message when user state changes
    if (user) {
      handleNoti(`logged in user: ${user.username}`)
    } else {
      handleNoti('welcome, login or signup to use app')
    }
  }, [user])

  

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
    handleNoti('user logged out')
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
      {user !== null && (
        blogForm()
      )}
      
      
      <h2 className="text-center text-2xl mb-2 uppercase">Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reverseIndexBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDeleteBlog} />
        ))}
        
      </div>
      
    </div>
  )
}

export default page
