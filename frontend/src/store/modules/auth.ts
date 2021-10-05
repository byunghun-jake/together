import * as authApi from '@/api/auth'
import { Module } from 'vuex'
import { RootState } from '@/store/index'
import { InputUser, OutputUser } from '@/libs/interfaces/auth'
import { Token } from '@/libs/interfaces/auth'

interface authModule {
  accessToken: string
  refreshToken: string
  user?: OutputUser
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
    SET_USER(state: authModule, user: OutputUser) {
      state.user = user
    },
    REMOVE_USER(state: authModule) {
      delete state.user
    },
  },
  actions: {
    async login({ commit }, params) {
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
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      commit('REMOVE_TOKEN')
      commit('REMOVE_USER')
    },
    async register({ commit }, submitData) {
      try {
        const data = await authApi.register(submitData)
        alert('auth modules: register success')
        // 바로 로그인
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
      } catch (error: any) {
        const errorKeys = Object.keys(error.response.data)
        // 에러가 여러 개일 경우, 맨 앞의 에러 하나만 띄우도록 한다.
        throw new Error(error.response.data[errorKeys[0]])
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
    async resetPasswordConfirm(context, submitData) {
      try {
        const response = await authApi.resetPasswordConfirm(submitData)
        if (response.status === 200) {
          alert(response.data.detail)
        }
        return response
      } catch (error: any) {
        alert(error.response.data)
      }
    },
    // TODO: 임시
    async getUserData(context, userId: string | number) {
      try {
        console.log(userId)
        const user = await authApi.getUserData(+userId)
        return user
      } catch (error) {
        throw new Error('유저 데이터를 가져오던 중 문제가 생겼습니다')
      }
    },
    async updateUserData(_, data: InputUser): Promise<OutputUser> {
      try {
        return await authApi.putUserData(data)
      } catch (error: any) {
        throw new Error(error)
      }
    },
    async oauthLogin({ commit }, params) {
      try {
        const data = await authApi.oauthLogin(params.platform, params.code)
        alert(`auth modules: ${params.platform} login success`)
        commit('SET_TOKEN', {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
        commit('SET_USER', data.user)
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        // 임시
        localStorage.setItem('user', JSON.stringify(data.user))
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
      return state.user?.id
    },
    getToken(state) {
      return state.accessToken
    },
    getUserNickName(state) {
      return state.user?.nickName
    },
  },
}
