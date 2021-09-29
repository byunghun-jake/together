import { Module } from 'vuex'
import { RootState } from '@/store/index'
import axios from 'axios'
import { Party } from '@/libs/interface'

const http = axios.create({
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
    getAllParties: async (): Promise<Party[] | undefined> => {
      try {
        const res = await http.get('/parties')
        return res.data
      } catch (error) {
        console.log(error)
        // Code에 따라 에러 핸들링
      }
    },
    getParty: async (
      context,
      partyId: number | string
    ): Promise<Party | undefined> => {
      try {
        const res = await http.get(`/parties/${partyId}`)
        return res.data
      } catch (error) {
        console.log(error)
      }
    },
    async postParty(context, data) {
      try {
        console.log(data)
        const res = await http.post(`/parties`, data)
        console.log(res)
      } catch (error: any) {
        console.log(error.response)
      }
    },
  },
  getters: {},
}
