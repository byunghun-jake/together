// import http from '@/api/http'
import { keysToCamel } from '@/libs/func'
import { Content, Genre } from '@/libs/interface'
import axios, { AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
})

const getContentList = async (): Promise<Content[]> => {
  try {
    const res = await http.get(`/contents`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const getContent = async (contentId: number): Promise<Content> => {
  try {
    const res = await http.get(`/contents/${contentId}`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const getGenreList = async (): Promise<Genre[]> => {
  try {
    const res = await http.get(`/genres`)
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
