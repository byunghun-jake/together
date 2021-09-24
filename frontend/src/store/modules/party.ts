import { Module } from 'vuex'
import { RootState } from '@/store/index'
import axios from 'axios'
import { Party } from '@/libs/interface'

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
    getAllParties: async (): Promise<Party[] | undefined> => {
      try {
        const res = await APIAxios.get('/parties')
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
        const res = await APIAxios.get(`/parties/${partyId}`)
        return res.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {},
}
