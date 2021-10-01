import { AxiosResponse } from 'axios'
import * as authApi from '@/api/auth'
import { Module } from 'vuex'
import { RootState } from '@/store/index'

interface User {
  pk: number
  email: string
  nickname: string
  username: string
  phone_number: string
}

interface Token {
  accessToken: string
  refreshToken: string
}
interface authModule {
  accessToken: string
  refreshToken: string
  user?: User
}

interface loginResponseData {
  access_token: string
  refresh_token: string
  user: User
}

export const auth: Module<authModule, RootState> = {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
  },
  mutations: {
    SET_TOKEN(state: authModule, { accessToken, refreshToken }: Token) {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    REMOVE_TOKEN(state: authModule) {
      state.accessToken = ''
      state.refreshToken = ''
    },
    SET_USER(state: authModule, user: User) {
      state.user = user
    },
    REMOVE_USER(state: authModule) {
      delete state.user
    },
  },
  actions: {
    async login({ commit }, params) {
      try {
        const response: AxiosResponse<loginResponseData> = await authApi.login(
          params.email,
          params.password
        )
        if (response.status === 200) {
          alert('auth modules: login success')
          commit('SET_TOKEN', {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          })
          commit('SET_USER', response.data.user)
          localStorage.setItem('accessToken', response.data.access_token)
          localStorage.setItem('refreshToken', response.data.refresh_token)
          // 임시
          localStorage.setItem('user', JSON.stringify(response.data.user))
          // 임시
        }
        return response
      } catch (err: any) {
        const errorKeys = Object.keys(err.response.data)
        // 에러가 여러 개일 경우, 맨 앞의 에러 하나만 띄우도록 한다.
        alert(err.response.data[errorKeys[0]])
      }
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      commit('REMOVE_TOKEN')
      commit('REMOVE_USER')
    },
    async register(context, params) {
      try {
        const response = await authApi.register(
          params.name,
          params.email,
          params.password,
          params.passwordConfirm,
          params.phoneNumber,
          params.nickName
        )
        alert('auth modules: register success')
        return response
      } catch (error: any) {
        const errorKeys = Object.keys(error.response.data)
        // 에러가 여러 개일 경우, 맨 앞의 에러 하나만 띄우도록 한다.
        alert(error.response.data[errorKeys[0]])
      }
    },
    async resetPassword(context, params) {
      try {
        const response = await authApi.resetPassword(params.email)
        if (response.status === 200) {
          alert(response.data.detail)
        }
        return response
      } catch (error: any) {
        alert(error.response.data)
      }
    },
    async resetPasswordConfirm(context, params) {
      try {
        const response = await authApi.resetPasswordConfirm(
          params.uid,
          params.token,
          params.password,
          params.passwordConfirm
        )
        if (response.status === 200) {
          alert(response.data.detail)
        }
        return response
      } catch (error: any) {
        alert(error.response.data)
      }
    },
  },
  getters: {
    isLogin(state) {
      return state.accessToken !== ''
    },
    getUserPK(state) {
      return state.user?.pk
    },
  },
}
