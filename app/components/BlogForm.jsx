'use client'
import { useState } from "react"

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
          <input
          type="text"
          value={blog.title}
          onChange={({ target }) => setBlog( b => ({...b, title: target.value}))}
        />
      </div>
      <div>
        content
          <input
          type="text"
          value={blog.content}
          onChange={({ target }) => setBlog( b => ({...b, content: target.value}))}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
