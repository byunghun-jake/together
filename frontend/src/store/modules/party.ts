import { Module } from 'vuex'
import { RootState } from '@/store/index'
import axios from 'axios'

const APIAxios = axios.create({
  baseURL: 'http://localhost:3000',
})

interface PartyModule {
  data: string
}

export const party: Module<PartyModule, RootState> = {
  namespaced: true,
  state: {
    data: '',
  },
  mutations: {},
  actions: {
    getAllParties() {},
  },
  getters: {},
}
