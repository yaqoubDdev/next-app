'use client'
import { useState } from "react"
import styles from '@/app/(root)/blogs.module.css'

const Blog = ({blog, handleDelete}) => {
  const [showDetails, setShowDetails] = useState(true)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  if(showDetails){
    return (
      <div className={styles.blog}>
        <div className={styles.namesContainer}>
          <span>{blog.user.username}</span>
          <button onClick={toggleShowDetails}>hide</button>
        </div>
        <div className={styles.infoContainer}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
        <div>
          <span>likes: {blog.likes.length}</span>
          <button className={styles.likeButton}>like</button>
        </div>
        <button onClick={() => handleDelete(blog.id)}>delete</button>
      </div>
    ) 
  }

  return (
    <div className={styles.blog}>
      <div className={styles.namesContainer}>
        <span>{blog.user.username}</span>
        <button onClick={toggleShowDetails}>view</button>
      </div>
      <div className={styles.infoContainer}>
        <h3>{blog.title}</h3>
      </div>
    </div>
  )
} 

export default Blog