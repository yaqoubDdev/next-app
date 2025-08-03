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
  const [isLiking, setIsLiking] = useState(false)

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
    setIsLiking(true)
    try {
      const res = await blogservice.likeBlog(id)
      setLikes(res.blogLikesCount)
  
      console.log(res)
      setHasLiked(!hasLiked)
    } catch (error) {
      
    }finally {
      setIsLiking(false)
    }
  }

  if(showDetails){
    return (
      <div className='p-[5] w-[300] border-2 rounded-sm shadow-sm'>
        <div className='flex justify-between text-gray-500 hover:text-gray-700 '>
          <span className="underline cursor-pointer">{blog.user.username}</span>
          <Button onClick={toggleShowDetails} variant='secondary' size='sm'>hide</Button>
        </div>
        <div className='flex flex-col gap-[5]'>
          <h3 className="uppercase">{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
        <div className="flex items-center">
          <span>likes: {likes}</span>
        </div>
        <div className="grid w-full gap-3 my-3 grid-cols-2">
          <Button 
            disabled={isLiking}
            onClick={() => handleLike(blog.id)} 
          >
            {hasLiked ? 'unlike' : 'like'}
          </Button>
          <Button onClick={() => handleDelete(blog.id)} variant='destructive'>delete</Button>
        </div>
      </div>
    ) 
  }

  return (
    <div className='p-[5] w-[300] border-2 rounded-sm shadow-sm'>
      <div className='flex justify-between text-gray-500 hover:text-gray-700'>
        <span className="underline cursor-pointer">{blog.user.username}</span>
        <Button onClick={toggleShowDetails} size='sm'>view</Button>
      </div>
      <div className={styles.infoContainer}>
        <h3>{blog.title}</h3>
      </div>
      <div className="flex items-center">
        <span className="">likes: {likes}</span>
      </div>
    </div>
  )
} 

export default Blog