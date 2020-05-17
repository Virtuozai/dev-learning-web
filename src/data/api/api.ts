import axios from 'axios'

const API_BASE_URL = 'https://localhost:5000/api/'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default api
