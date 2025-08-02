'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({title: '', content: ''})

  const addBlog = (e) => {
    e.preventDefault()
    if (!blog.title || !blog.content){
      alert('fill title and/or content')
      return
    }

    createBlog(blog)
    setBlog({title: '', content: ''})

  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
          <Input
          type="text"
          value={blog.title}
          placeholder='Title'
          onChange={({ target }) => setBlog( b => ({...b, title: target.value}))}
        />
      </div>
      <div>
        content
          <Input
          type="text"
          value={blog.content}
          placeholder='Content'
          onChange={({ target }) => setBlog( b => ({...b, content: target.value}))}
        />
      </div>
      <Button type="submit">create</Button>
    </form>
  )
}

export default BlogForm
