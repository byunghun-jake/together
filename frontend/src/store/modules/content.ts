import { Movie } from '@/libs/interfaces/content'
import { Content, Genre } from '@/libs/interface'
import axios from 'axios'
import { Module } from 'vuex'
import { RootState } from '@/store/index'
import contentAxios from '@/api/content'

interface ProfileState {
  data: string
}

export const content: Module<ProfileState, RootState> = {
  namespaced: true,
  state: {
    data: '',
  },
  mutations: {},
  actions: {
    getRecommendContent: async (): Promise<Movie[]> => {
      try {
        return await contentAxios.getContentList()
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
    getContent: async (_, contentId: number | string): Promise<Movie> => {
      try {
        return await contentAxios.getContent(+contentId)
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
    getGenreList: async (): Promise<Genre[]> => {
      try {
        return contentAxios.getGenreList()
      } catch (error: any) {
        throw new Error(error.response)
      }
    },
  },
  getters: {},
}
