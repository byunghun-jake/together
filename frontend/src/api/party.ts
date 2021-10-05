import http from '@/api/http'

import { keysToCamel, keys_to_snake } from '@/libs/func'
import { SubmitFormData } from '@/libs/interface'
import { Party } from '@/libs/interfaces/party'

const getParties = async (): Promise<Party[]> => {
  try {
    const res = await http.get('/party/')
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error.response)
  }
}

const getParty = async (partyId: number): Promise<Party> => {
  try {
    const res = await http.get(`/party/${partyId}/`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const postParty = async (data: SubmitFormData): Promise<Party> => {
  try {
    const res = await http.post(`/party/`, keys_to_snake(data))
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

const getProviders = async (): Promise<Party> => {
  try {
    const res = await http.get(`/party/providers/`)
    return keysToCamel(res.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default {
  getParties,
  getParty,
  postParty,
  getProviders,
}
