// import http from '@/api/http'

import { keysToCamel, keys_to_snake } from '@/libs/func'
import { Party, SubmitFormData } from '@/libs/interface'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
})

const getParties = async (): Promise<Party[]> => {
  try {
    const res = await http.get('/parties')
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error.response)
  }
}

const getParty = async (partyId: number): Promise<Party> => {
  try {
    const res = await http.get(`/parties/${partyId}`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const postParty = async (data: SubmitFormData): Promise<Party> => {
  try {
    const res = await http.post(`/parties`, keys_to_snake(data))
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  getParties,
  getParty,
  postParty,
}
