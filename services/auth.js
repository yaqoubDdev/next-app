import axios from "axios"
import { set } from "mongoose"
const baseurl = '/api/user'

const setToken = newToken => {
  const token = `Bearer ${newToken}`
  return token
}

const checkUser = async (inToken) => {
  const token = setToken(inToken)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseurl}`, {}, config)
  return response.data
}

export default { checkUser }