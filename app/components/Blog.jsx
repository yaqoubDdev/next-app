'use client'
import { useEffect, useState } from "react"
import styles from '@/app/(root)/blogs.module.css'
import blogservice from "@/services/blogservice"
import { getUserIdFromToken } from "@/utils/getUserId"

const Blog = ({blog, handleDelete}) => {
  const [showDetails, setShowDetails] = useState(true)
  const [likes, setLikes] = useState(blog.likes.length)
  const [hasLiked, setHasLiked] = useState(false)

  const userId = getUserIdFromToken()

  useEffect(() => {
    if(userId && blog.likes.includes(userId)){
      setHasLiked(true)
    }
    else if(!userId){
      setHasLiked(false)
    }
  } , [userId, blog.likes])

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)

  }

  const handleLike = async (id) => {
    const res = await blogservice.likeBlog(id)
    setLikes(res.blogLikesCount)
    console.log(res)
    setHasLiked(!hasLiked)
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
          <span>likes: {likes}</span>
          <button 
            onClick={() => handleLike(blog.id)} 
            className={styles.likeButton} 
            style={{ color: hasLiked ? 'black' : 'red'}}
          >
            {hasLiked ? 'unlike' : 'like'}
          </button>
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