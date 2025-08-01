import axios from "axios"
const baseurl = '/api/blogs'

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = async () => {
  const res = await axios.get(baseurl)
  console.log(res)
  return res.data
}



const createNewBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseurl, newObject, config)
  return response.data
}


export default { getAllBlogs, createNewBlog }