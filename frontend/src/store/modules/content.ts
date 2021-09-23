import axios from 'axios'
import { Module } from 'vuex'
import { RootState } from '@/store/index'

interface ProfileState {
  data: string
}

interface Content {
  id: number
  title: string
  posterPath: string
  simRate: number
  providers: string[]
  firstAirYear: number
  rated: string
  seasons: number
  overview: string
}

const apiAxios = axios.create({
  baseURL: 'http://localhost:3000',
})

export const content: Module<ProfileState, RootState> = {
  namespaced: true,
  state: {
    data: '',
  },
  mutations: {},
  actions: {
    getContent: async (
      context,
      contentId: number | string
    ): Promise<Content | undefined> => {
      try {
        const res = await apiAxios.get(`/contents/${contentId}`)
        return res.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Access to config, request, and response
          throw new Error(`${error.code}: ${error.message}`)
        } else {
          // Just a stock error
          throw new Error('알 수 없는 에러 발생')
        }
      }
    },
    getRecommendContent: async (): Promise<Content[] | undefined> => {
      try {
        const res = await apiAxios.get('/contents')
        return res.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Access to config, request, and response
          throw new Error(`${error.code}: ${error.message}`)
        } else {
          // Just a stock error
          throw new Error('알 수 없는 에러 발생')
        }
      }
    },
  },
  getters: {},
}
