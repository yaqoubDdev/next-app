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

  const request = await axios.post(baseurl, newObject, config)
  return request.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseurl}/${id}`, config)
  console.log(request)
  return request
}

const likeBlog = async id => {
  const config = {
    headers: { Authorization: token}
  }

  const request = await axios.put(`${baseurl}/${id}/like`, '', config)
  return request.data
}


export default { getAllBlogs, createNewBlog, deleteBlog, setToken, likeBlog }