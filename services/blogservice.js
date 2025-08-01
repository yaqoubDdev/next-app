import axios from "axios"
const baseurl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = async () => {
  const request = await axios.get(baseurl)
  return request.data
}



const createNewBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)

  const request = await axios.post(baseurl, newObject, config)
  return request.data
}


export default { getAllBlogs, createNewBlog, setToken }