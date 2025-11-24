'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import auth from '@/services/auth'
import blogservice from '@/services/blogservice'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const u = JSON.parse(loggedUserJSON)
      ;(async () => {
        try {
          const res = await auth.checkUser(u.token)
          u.id = res.user.id
          u.username = res.user.username
          u.name = res.user.name
          setUser(u)
          blogservice.setToken(u.token)
        } catch (error) {
          console.log(error)
          if (error?.status === 401) {
            localStorage.removeItem('loggedBlogappUser')
            setUser(null)
          }
        }
      })()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export default UserContext
