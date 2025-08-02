'use client'
import { useEffect, useState } from "react"
import styles from '@/app/(root)/blogs.module.css'
import blogservice from "@/services/blogservice"
import { getUserIdFromToken } from "@/utils/getUserId"
import { Button } from "@/components/ui/button"

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
          <span className="underline">{blog.user.username}</span>
          <button onClick={toggleShowDetails}>hide</button>
        </div>
        <div className={styles.infoContainer}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
        <div>
          <span>likes: {likes}</span>
          <Button 
            onClick={() => handleLike(blog.id)} 
          >
            {hasLiked ? 'unlike' : 'like'}
          </Button>
        </div>
        <Button onClick={() => handleDelete(blog.id)}>delete</Button>
      </div>
    ) 
  }

  return (
    <div className={styles.blog}>
      <div className={styles.namesContainer}>
        <span>{blog.user.username}</span>
        <Button onClick={toggleShowDetails}>view</Button>
      </div>
      <div className={styles.infoContainer}>
        <h3>{blog.title}</h3>
      </div>
    </div>
  )
} 

export default Blog