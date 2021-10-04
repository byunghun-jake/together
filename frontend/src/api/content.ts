import http from '@/api/http'
import { keysToCamel } from '@/libs/func'
import { Content, Genre } from '@/libs/interface'
import { Movie } from '@/libs/interfaces/content'
import axios from 'axios'

const http2 = axios.create({
  baseURL: 'http://localhost:3000',
})

const getContentList = async (): Promise<Movie[]> => {
  try {
    const res = await http.get(`/movies/`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const getContent = async (contentId: number): Promise<Movie> => {
  try {
    const res = await http.get(`/movies/${contentId}/`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const getGenreList = async (): Promise<Genre[]> => {
  try {
    const res = await http.get(`/movies/genre/`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  getContentList,
  getContent,
  getGenreList,
}
