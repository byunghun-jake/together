import store from '@/store'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000',
})

http.interceptors.request.use(function (config) {
  const accessToken = store.getters['auth/getToken']
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

http.interceptors.response.use(
  (value) => {
    return value
  },
  (error) => {
    if (error?.response?.data?.code === 'token_not_valid') {
      alert('토큰이 만료되었습니다')
    }
    console.dir(error)
  }
)

export default http
