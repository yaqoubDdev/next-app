'use client'
import { useEffect, useState } from "react"
import styles from '@/app/(root)/blogs.module.css'
import blogservice from "@/services/blogservice"
import { getUserIdFromToken } from "@/utils/getUserId"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

  const renderImage = () => {
    
    if(blog.imageUrl){
      return (
        <div className="w-full h-[200px]">
          <Image
            src={blog.imageUrl} 
            alt={blog.title} 
            width={300}
            height={300}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      )
    }
    return null
  }

  if(showDetails){
    return (
      <div className='max-w-sm w-full h-fit p-4 border border-gray-300 shadow-md rounded-md bg-white'>
        <div className='flex justify-between text-gray-500 hover:text-gray-700 '>
          <span className="underline cursor-pointer">{blog.user.username}</span>
          <Button onClick={toggleShowDetails} variant='secondary' size='sm'>hide</Button>
        </div>
        <div className='flex flex-col gap-2 mt-2'>
          <h3 className="uppercase font-semibold">{blog.title}</h3>
          <p className="text-gray-700">{blog.content}</p>
        </div>
        {renderImage()}
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600">likes: {likes}</span>
        </div>
        {userId && (
          <div className="grid w-full gap-3 my-3 grid-cols-2">
            <Button 
              disabled={isLiking}
              onClick={() => handleLike(blog.id)} 
            >
              {hasLiked ? 'unlike' : 'like'}
            </Button>
            {blog.user.id === userId ? (
              <Button onClick={() => handleDelete(blog.id, blog.title)} variant='destructive'>delete</Button>
            ) : null}
          </div>)}
      </div>
    ) 
  }

  return (
    <div className='max-w-sm w-full h-fit p-4 border border-gray-300 shadow-md rounded-md bg-white'>
      <div className='flex justify-between text-gray-500 hover:text-gray-700'>
        <span className="underline cursor-pointer">{blog.user.username}</span>
        <Button onClick={toggleShowDetails} size='sm'>view</Button>
      </div>
      <div className='flex flex-col gap-2 mt-2'>
        <h3 className="uppercase font-semibold">{blog.title}</h3>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-sm text-gray-600">likes: {likes}</span>
      </div>
    </div>
  )
} 

export default Blog