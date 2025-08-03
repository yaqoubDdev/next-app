'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <Card className="w-full max-w-sm mt-6 mb-3">
      <CardHeader>
        <CardTitle>Create a blog</CardTitle>
        <CardDescription>Input title and content below and press create to save your blog</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={addBlog} >
          <div className="grid w-full gap-3 mb-4">
            <Label htmlFor='title'>Title</Label>
              <Input
              type="text"
              value={blog.title}
              placeholder='Title'
              id='title'
              onChange={({ target }) => setBlog( b => ({...b, title: target.value}))}
            />
          </div>
          <div className="grid w-full gap-3 mb-4">
            <Label htmlFor='content'>content</Label>
              <Textarea
              type="text"
              value={blog.content}
              placeholder='Content'
              id='content'
              onChange={({ target }) => setBlog( b => ({...b, content: target.value}))}
            />
          </div>
          <div className='grid w-full gap-3 my-3'>
            <Button type="submit">create</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">All fields are required</p>
      </CardFooter>
    </Card>
  )
}

export default BlogForm
