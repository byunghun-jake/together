import { AxiosResponse } from 'axios'
import * as authApi from '@/api/auth'
import { Module } from 'vuex'
import { RootState } from '@/store/index'
import { InputUser, OutputUser } from '@/libs/interface'

interface Token {
  accessToken: string
  refreshToken: string
}
interface authModule {
  accessToken: string
  refreshToken: string
  user?: InputUser
}

interface loginResponseData {
  access_token: string
  refresh_token: string
  user: InputUser
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
    SET_USER(state: authModule, user: InputUser) {
      state.user = user
    },
    REMOVE_USER(state: authModule) {
      delete state.user
    },
  },
  actions: {
    async login({ commit }, params) {
      try {
        const data = await authApi.login(params.email, params.password)
        alert('auth modules: login success')
        commit('SET_TOKEN', {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
        commit('SET_USER', data.user)
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        // 임시
        localStorage.setItem('user', JSON.stringify(data.user))
        // 임시
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
          params.nickname
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
    async getUserData(context, userId: string | number) {
      try {
        console.log(userId)
        const user = await authApi.getUserData(+userId)
        return user
      } catch (error) {
        throw new Error('유저 데이터를 가져오던 중 문제가 생겼습니다')
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
    getToken(state) {
      return state.accessToken
    },
  },
}
