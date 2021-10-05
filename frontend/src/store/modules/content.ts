import { Content } from '@/libs/interfaces/content'
import { Genre } from '@/libs/interface'
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
    getMovieList: async (): Promise<Content[]> => {
      try {
        return await contentAxios.getMovieList()
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
    getMovie: async (_, contentId: number | string): Promise<Content> => {
      try {
        return await contentAxios.getMovie(+contentId)
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
    getMovieGenreList: async (): Promise<Genre[]> => {
      try {
        return contentAxios.getMovieGenreList()
      } catch (error: any) {
        throw new Error(error.response)
      }
    },
    getProgramList: async (): Promise<Content[]> => {
      try {
        return await contentAxios.getProgramList()
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
    getProgram: async (_, contentId: number | string): Promise<Content> => {
      try {
        return await contentAxios.getProgram(+contentId)
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
    getProgramGenreList: async (): Promise<Genre[]> => {
      try {
        return contentAxios.getProgramGenreList()
      } catch (error: any) {
        throw new Error(error.response)
      }
    },
  },
  getters: {},
}
