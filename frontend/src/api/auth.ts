import http from '@/api/http'
import { keysToCamel } from '@/libs/func'
import { OutputUser, InputUser } from '@/libs/interfaces/auth'
import axios, { AxiosResponse } from 'axios'

interface AuthResponseData {
  accessToken: string
  refreshToken: string
  user: OutputUser
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponseData> => {
  try {
    const res = await http.post('account/login/', {
      email,
      password,
    })
    return keysToCamel(res.data)
  } catch (error) {
    throw new Error('로그인 실패')
  }
}

export const oauthLogin = async (
  platform: string,
  code: string
): Promise<AuthResponseData> => {
  const params = new URLSearchParams()
  params.append('code', code)
  const res = await http.post(`account/${platform}/callback/`, params)
  return keysToCamel(res.data)
}

export const register = async (submitData: {
  username: string
  email: string
  password1: string
  password2: string
  phone_number: string
  nick_name: string
}): Promise<AuthResponseData> => {
  const res = await http.post('account/register/', submitData)
  return keysToCamel(res.data)
}

export function resetPassword(email: string): Promise<AxiosResponse> {
  return http.post('account/password/reset/', { email: email })
}

export function resetPasswordConfirm(submitData: {
  uid: string
  token: string
  password1: string
  password2: string
}): Promise<AxiosResponse> {
  return http.post('account/password/reset/confirm/', submitData)
}

export const getUserData = async (userId: number): Promise<OutputUser> => {
  try {
    // const res: AxiosResponse<InputUser> = await http.get(`account/${userId}/`)
    const res: AxiosResponse<InputUser[]> = await http.get(`account/me/`)
    return keysToCamel(res.data[0])
  } catch (error) {
    throw new Error('에러 발생')
  }
}

export const putUserData = async (data: InputUser): Promise<OutputUser> => {
  try {
    const res: AxiosResponse<InputUser[]> = await http.patch(
      `account/me/`,
      data
    )
    return keysToCamel(res.data[0])
  } catch (error) {
    throw new Error('에러 발생')
  }
}
