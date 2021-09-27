import * as authApi from '@/api/auth'
import { Module } from 'vuex'
import { RootState } from '@/store/index'

interface authModule {
  token: string
}

export const auth: Module<authModule, RootState> = {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state: authModule, token: string): void {
      state.token = token
      console.log('login mutation success')
    },
  },
  actions: {
    async login(context, params) {
      try {
        const response = await authApi.login(params.userEmail, params.password)
        if (response.status === 200) {
          context.commit('setToken', response.data.access_token)
          return response
        }
      } catch (err: any) {
        const errorKeys = Object.keys(err.response.data)
        // 에러가 여러 개일 경우, 맨 앞의 에러 하나만 띄우도록 한다.
        alert(err.response.data[errorKeys[0]])
      }
    },
    async register(context, params) {
      try {
        const res = await authApi.register(
          params.name,
          params.userEmail,
          params.password,
          params.passwordConfirm,
          params.phoneNumber,
          params.nickName
        )
        return res
      } catch (err: any) {
        const errorKeys = Object.keys(err.response.data)
        // 에러가 여러 개일 경우, 맨 앞의 에러 하나만 띄우도록 한다.
        alert(err.response.data[errorKeys[0]])
      }
    },
  },
  getters: {},
}
