'use client'
import { useState, useEffect } from "react"
import blogservice from "@/services/blogservice"
import styles from './blogs.module.css'

const page = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function getBlogs(){
      const data = await blogservice.getAllBlogs()
      console.log(data)
      setBlogs(data)
    }

    getBlogs()
  }, [])

  return (
    <div>

      <div>
        {blogs.map(blog => (
          <div key={blog.id} className={styles.blog}>
            <div className={styles.namesContainer}>
              <span>{blog.user.name}</span>
              <span>{blog.user.username}</span>
            </div>
            <div className={styles.infoContainer}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
            </div>
          </div>
        ))}
        
      </div>
      
    </div>
  )
}

export default page
